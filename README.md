# Misi Pertanian Bandar — Phase 2

Continuation of the existing HTML5/Canvas game, in Bahasa Melayu Malaysia. Curriculum: RBT Tahun 5, SP 7.1.1 and 7.1.2. Artwork, map, Alya and audio interfaces are retained. No Misi 4 gameplay, final mission or SP 7.1.3 drawing task is included.

## Run locally

Requires Python 3; Node is used for the npm shortcuts and tests.

```sh
npm start
```

Open `http://localhost:8080` on your computer. The modular game needs HTTP. The generated `Misi-Pertanian-Bandar.html` contains the game code and styles in one file; use localhost or HTTPS for camera access and reliable storage. Rebuild it after source edits:

```sh
python3 scripts/bundle.py
```

## Playable flow

1. **Misi 1:** visit Rumah Pangsa, Rumah Teres and Kebun Komuniti; inspect all six objects. Alya guides a synthesis of the definition before the personal explanation opens. Write a definition and example to finish the activity.
2. **Misi 2:** inspect all components of four systems. Play, pause and replay the scientific cutaways; compare systems. Select two distinct systems and write separate explanations. Earn **Pakar Sistem Takungan**.
3. **Misi 3:** install the water-level indicator at A, filling channel at B, and capillary material at C. Wrong placements are rejected. Mouse drag, touch drag, or select-then-tap all use the same validator. After installation, run the capillary simulation and observe at least six seconds before explaining both the component function and water movement. Earn **Pakar Makmal**.
4. The Misi 4 entrance unlocks and clearly says that its gameplay is not yet implemented.

Badges record activity completion, **not correctness or DSKP Tahap Penguasaan**. Teachers judge open explanations, accepting equivalent reasonable answers. First responses, revisions, unfinished drafts, hint use, stamps, inspected components and notes persist. Class mode records a shared discussion only; use individual response sheets for individual PBD.

## Saves and replay

`misi-bandar-v2` stores separate `kendiri` and `kelas` profiles. The former `misi-bandar-v1` save is migrated without deleting the original key. New game requires confirmation when progress exists and resets only the selected mode. Continue restores the saved scene, assembly and records. Replay preserves badges and response history. Review does not award badges. Save data is local to this browser/origin, not synchronized between devices. Export JSON from Buku Misi before clearing browser data.

## Hand control

Only the **Kawalan Tangan** button requests camera permission. Video is processed in the browser and is neither uploaded nor recorded. Stop the camera with **Tetikus / Sentuhan** or by leaving the workshop. No microphone is requested.

After initialization, hold an open hand near the camera centre for 25 detected frames. Move the index finger to steer the mirrored cursor. Pinch thumb and index finger for three stable frames to select a component, then open the pinch over a target. Position smoothing and different pinch/release thresholds reduce jitter. **Kalibrasi Semula** resets centring; **Cuba Semula Kamera** restarts loading and permission flow. Mouse/touch remains available during failure or loading.

Network dependencies, loaded only when hand control is activated:

- MediaPipe Tasks Vision **0.10.21** JS and WASM: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/`
- Google's Hand Landmarker float16 model: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`

Permit `cdn.jsdelivr.net` and `storage.googleapis.com` in restrictive networks. HTTPS or localhost and browser camera permission are required. This feature is **not fully offline**. No camera hardware was available in the development environment; the actual browser returned “Requested device not found”. Real hand tracking, pinch accuracy and physical calibration remain unverified. The model host was also blocked by the cloud network policy. The JS version URL returned HTTP 200. Fallback and touch completion were tested; no synthetic input is represented as successful real-camera testing.

## Tests

The supplied cloud environment provides Playwright and Chromium. Elsewhere install Playwright as a development test tool (`npm install --no-save playwright`) and Chromium, setting `CHROMIUM_PATH` to the browser executable if it is not `/usr/bin/chromium`.

```sh
# terminal 1
npm start
# terminal 2
npm test
```

Tests cover Misi 1–3, exploration and synthesis gates, four stations, pause/replay, two distinct system explanations, wrong drops, mouse dragging, capillary observation, three unique badges, page close/reopen, replay preservation, mode isolation, reset confirmation, legacy migration, bundled HTML, mobile touch and unavailable-camera fallback. Browser runtime errors are checked. These tests do not constitute teacher assessment or real hand-tracking validation.

## Source files

- `index.html`, `style.css`: existing UI with activity and assembly surfaces.
- `js/art.js`: retained pixel artwork and original two scientific models.
- `js/content.js`: four systems and component explanations.
- `js/game.js`: existing game extended with synthesis, awards, mission flow and evidence.
- `js/progress.js`: profile defaults, validation and legacy migration.
- `js/science.js`: aquaponics and self-watering cutaways, assembly coordinates.
- `js/assembly.js`: shared mouse, touch and hand placement validation.
- `js/hands.js`: permission, MediaPipe, smoothing, calibration and cleanup.
- `scripts/bundle.py`: standalone HTML generator.
- `tests/game.test.cjs`, `tests/fallback.test.cjs`: browser journey and touch/fallback checks.
- `assets/audio/manifest.json`: Malay narration recording checklist.

## Audio and remaining scope

Subtitles, replay narration, mute, separate volume controls and background ducking are retained. Only `ms-MY` device voices are selected. Natural Malaysian female recordings are not supplied; missing audio falls back to subtitles without blocking play. Audio IDs for the added content are included in the manifest.

Misi 4 gameplay and Misi Akhir, final system-selection card, individual printed response-sheet generation, final art polish and professional audio remain outside this delivery. Reference sources are the user-supplied RPH, textbook pages 64–71 and DSKP excerpt. Open answers are not automatically scored.
