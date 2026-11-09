# Misi Pertanian Bandar — Phase 3

Continuation of the existing HTML5/Canvas game, in Bahasa Melayu Malaysia. Curriculum: RBT Tahun 5, SP 7.1.1 and 7.1.2. Artwork, map, Alya and audio interfaces are retained. All five missions are playable. No SP 7.1.3 drawing task is included.

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
4. **Misi 4:** enter either broken system. Inspect every clue, choose a cause (wrong choices are recorded and can be retried), write a prediction, then activate the pump or lower the capillary material into the water. Explain each repair. Both repairs and explanations are required for **Penyelamat Sistem Penanaman**. The diagrams show a labelled time-lapse of gradual plant recovery, not instantaneous real-world growth.
5. **Misi Akhir:** explain urban agriculture and an example; separately explain recirculating culture and self-watering; choose any of the four systems for a small balcony and justify the choice. Confirm the choice to generate **Kad Pemilihan Sistem Penanaman**, earn **Wira Pertanian Bandar**, and reach the ending with five badges. Reasonableness and correctness are assessed by the teacher, never inferred from keywords.

Badges record activity completion, **not correctness or DSKP Tahap Penguasaan**. Teachers judge open explanations, accepting equivalent reasonable answers. First responses, revisions, unfinished drafts, hint use, stamps, inspected components and notes persist. Class mode records a shared discussion only; use individual response sheets for individual PBD.

## Saves and replay

`misi-bandar-v2` remains the storage key to preserve existing saves; each profile is upgraded to schema version 3 with five badges, repair evidence and final responses. It stores separate `kendiri` and `kelas` profiles. The former `misi-bandar-v1` save is migrated without deleting the original key. New game requires confirmation when progress exists and resets only the selected mode. Continue restores the saved scene, assembly and records. Replay preserves badges, original stamp timestamps and response history. Replaying a completed Misi 4 resets the active investigation but retains its full event log and explanations. Replaying the final mission resets its active challenge checklist but retains all earlier answers and card versions. Continue resumes an unfinished replay without resetting it. Review does not award badges. Save data is local to this browser/origin, not synchronized between devices. Export JSON from Buku Misi before clearing browser data.

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

Tests cover Misi 1–5, exploration and synthesis gates, four stations, pause/replay, two distinct system explanations, wrong drops, mouse dragging, capillary observation, five unique badges, repair prerequisites, wrong diagnoses, repair animations, final-response drafts, selection-card export, class paper workflow, print-button dispatch, final replay history, page close/reopen, replay preservation, mode isolation, reset confirmation, legacy migration, bundled HTML, mobile touch and unavailable-camera fallback. Browser runtime errors are checked. These tests do not constitute teacher assessment or real hand-tracking validation.

## Source files

- `index.html`, `style.css`: existing UI with activity and assembly surfaces.
- `js/art.js`: retained pixel artwork and original two scientific models.
- `js/content.js`: four systems and component explanations.
- `js/game.js`: existing game extended with synthesis, awards, mission flow and evidence.
- `js/progress.js`: profile defaults, validation and legacy migration.
- `js/science.js`: aquaponics and self-watering cutaways, assembly coordinates.
- `js/assembly.js`: shared mouse, touch and hand placement validation.
- `js/hands.js`: permission, MediaPipe, smoothing, calibration and cleanup.
- `js/phase3-content.js`: fault clues, causes, hints and final prompts.
- `js/phase3.js`: investigation state flow, final challenges, cards, readable report and ending.
- `js/audio.js`: browser-based automatic narration, original garden soundtrack, button/correct/error/reward/stamp effects and music ducking.
- `scripts/bundle.py`: standalone HTML generator.
- `tests/audio.test.cjs`: gesture activation, voice replay, mute, audio settings and sound effects.
- `tests/game.test.cjs`, `tests/fallback.test.cjs`, `tests/phase3.test.cjs`, `tests/responsive_camera.test.cjs`: browser journey, touch/fallback and device-layout checks.
- `assets/audio/manifest.json`: Malay narration recording checklist.

## Audio and remaining scope

### Phase 4 audio — implemented

Alya's next dialogue attempts to play automatically **after the first user interaction** (browser autoplay rules). Captions remain visible even if voice is unavailable. `Dengar Semula` replays the latest line. In `Tetapan`, the user can independently control `Bacaan suara Alya secara automatik`, `Muzik latar`, overall mute and voice/music/SFX volume; preferences are saved per mode. Speaking reduces the background music level and moving to a new scene cancels the old line.

`js/audio.js` synthesizes an **original, softly looping garden melody** and distinct button, correct-action, wrong-action, badge and red `SELESAI!` stamp sound effects locally with Web Audio. No copyrighted commercial song is embedded. Audio starts only after a user gesture. A standalone HTML retains these sounds without external music files.

**Real recorded voice limitation:** `assets/audio/manifest.json` is a recording checklist, not a verified set of MP3 files. The game tries an available device `ms-MY` voice, otherwise attempts a matching recording when available on a hosted site, then a best-effort device voice with `lang=ms-MY`. If the device lacks a Malaysian Malay female voice, the result may use a different voice/accent or be unavailable. The game gives a clear status and keeps readable subtitles, without claiming to guarantee a natural Malaysian female voice. Adding reviewed `assets/audio/<id>.mp3` files is recommended for consistent final voice quality.

Individual response-sheet generation, Phase 4 art polish and professional audio remain outside this delivery. Real camera gesture tracking remains unverified because no camera was available. Browser print dispatch and print styling are tested, not a physical printer. Reference sources are the user-supplied RPH, textbook pages 64–71 and DSKP excerpt. Open answers are not automatically scored.


## Phase 3 PBD and selection card

Misi 4 stores observation events, every cause choice with its timestamp and correctness, hint use, predictions, repair success and explanation submissions. The first choice is retained in `repairLog` even after replay. Both systems must be repaired and explained before the fourth badge can be awarded.

Final challenges save individual first responses and every revision. Challenge 2 additionally records the pump and capillary explanations as separate evidence entries. `completedAt` preserves the first completion time. Cards retain optional name, selected system, the actual reason, optional student-entered components, mode and creation time. The game never invents a missing reason or components. The latest card can be reopened from the ending or Buku Misi, printed or exported as JSON; prior cards remain in the full PBD export.

In **Mod Kelas**, teachers can display any final challenge, replay its spoken instruction, show a summary and confirm that pupils answered on their own sheets. Teacher-computer entries are optional shared examples. Confirmations are labelled `class_activity` with `individualAnswersCollected: false`; the game does not manufacture 16 individual answers. A blank class card is explicitly a template. Each pupil's assessment still requires their individual sheet and the teacher's rubric.

Buku Misi contains all five award stamps, repair notes, all response versions, a readable printable learning report and the existing JSON export. The printable report includes investigation events and answer timestamps. Badges are completion records, not TP grades.
