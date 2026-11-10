// MediaPipe runs inference locally. No frames are sent or recorded.
export class HandControl {
 constructor(video,status,onPoint){this.video=video;this.report=status;this.onPoint=onPoint;this.generation=0;this.lastStatus='';this.lastStatusAt=0;this.lastInferAt=0;this.status=(message)=>{const now=performance.now();if(message!==this.lastStatus||now-this.lastStatusAt>2400){this.lastStatus=message;this.lastStatusAt=now;this.report(message)}};this.stop();}
 async start(){this.stop();const token=this.generation;this.status('Meminta kamera…');try{
 if(!window.isSecureContext||!navigator.mediaDevices?.getUserMedia)throw Error('Gunakan HTTPS atau localhost dan pelayar yang menyokong kamera.');
 const stream=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false});if(token!==this.generation){stream.getTracks().forEach(t=>t.stop());return}this.stream=stream;this.video.srcObject=stream;await this.video.play();this.status('Memuatkan pengecaman tangan…');
 const vision=await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs');
 const files=await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm');
 const detector=await vision.HandLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'},runningMode:'VIDEO',numHands:2});
 if(token!==this.generation){detector.close();return}this.detector=detector;this.calibrate();this.loop();
 }catch(e){if(token!==this.generation)return;this.stop();this.status('Kamera tidak tersedia: '+e.message+' Gunakan Tetikus / Sentuhan atau Cuba Semula.')}}
 calibrate(){this.samples=[];this.center=null;this.smooth=null;this.trackedX=null;this.missingFrames=0;this.pinched=false;this.stable=0;this.status('Kalibrasi: letakkan tangan terbuka di tengah kamera selama seketika.');}
 loop(){if(!this.detector)return;if(document.hidden||document.querySelector('dialog[open]')){this.raf=requestAnimationFrame(()=>this.loop());return}try{if(this.video.readyState>=2&&this.video.currentTime!==this.lastTime&&performance.now()-this.lastInferAt>=50){this.lastInferAt=performance.now();this.lastTime=this.video.currentTime;const result=this.detector.detectForVideo(this.video,performance.now());const candidates=result.landmarks||[];
 let p=candidates[0];
 if(candidates.length>1&&Number.isFinite(this.trackedX)){p=candidates.reduce((best,hand)=>Math.abs((1-hand[8].x)-this.trackedX)<Math.abs((1-best[8].x)-this.trackedX)?hand:best,p)}
 if(p){this.missingFrames=0;const raw={x:1-p[8].x,y:p[8].y};this.trackedX=raw.x;const scale=Math.hypot(p[0].x-p[9].x,p[0].y-p[9].y)||.1;const ratio=Math.hypot(p[4].x-p[8].x,p[4].y-p[8].y)/scale;
 if(!this.center){if(ratio>.5)this.samples.push(raw);else this.samples=[];if(this.samples.length>=18){this.center={x:this.samples.reduce((s,p)=>s+p.x,0)/18,y:this.samples.reduce((s,p)=>s+p.y,0)/18};this.status('Sedia. Gerakkan jari telunjuk; cubit untuk ambil, buka untuk letak.')}}else{
 const point={x:Math.max(0,Math.min(1,.5+(raw.x-this.center.x)*1.6)),y:Math.max(0,Math.min(1,.5+(raw.y-this.center.y)*1.6))};this.smooth=this.smooth?{x:this.smooth.x*.65+point.x*.35,y:this.smooth.y*.65+point.y*.35}:point;
 const desired=this.pinched?ratio<.55:ratio<.32;this.stable=desired!==this.pinched?this.stable+1:0;let phase='move';if(this.stable>=3){this.pinched=desired;this.stable=0;phase=desired?'grab':'release'}this.status('Sedia. Cubit untuk ambil; buka untuk letak.');this.onPoint(this.smooth.x,this.smooth.y,phase);
 }}else{this.missingFrames++;if(this.missingFrames>=5){this.status('Tangan tidak dikesan. Tunjukkan tangan kepada kamera.');this.pinched=false;this.stable=0;this.trackedX=null;this.onPoint(0,0,'lost')}}}}catch(e){this.stop();this.status('Pengecaman terhenti. Gunakan tetikus atau cuba semula.');return}this.raf=requestAnimationFrame(()=>this.loop())}
 stop(){this.generation++;cancelAnimationFrame(this.raf);this.stream?.getTracks().forEach(t=>t.stop());this.stream=null;this.detector?.close();this.detector=null;if(this.video)this.video.srcObject=null;this.lastTime=-1;this.lastInferAt=0;}
}
