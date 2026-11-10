# Misi Pertanian Bandar — Phase 4 (Draft: 16:9 Integrated Game)

Continuation of the existing HTML5/Canvas game, in Bahasa Melayu Malaysia. Curriculum: RBT Tahun 5, SP 7.1.1 and 7.1.2. Artwork, map, Alya and audio interfaces are retained. All five missions are playable. No SP 7.1.3 drawing task is included.

## 16:9 game presentation

The entire desktop and landscape-tablet game player (`#gameShell`) now uses a 16:9 frame, with a 16:9 canvas on the left, scrollable activity/camera panel on the right, and action toolbar below. Alya's **existing character art is unchanged** and her brief dialogue sits inside the game at the top left. Press `Lihat lagi` to expand the complete dialogue and replay audio with `Dengar Semula`; press `Ringkaskan` to return to the compact bubble.

For smartphones and narrow screens, the **playable canvas remains 16:9**, but mission activities and camera stack below instead of shrinking long instructions into an illegible height. Rotate a phone or tablet to landscape for the roomiest play experience. The camera preview remains 4:3 and appears only in Misi 3 when selected. The complete integrated offline-friendly HTML is `Misi-Pertanian-Bandar.html`; the MediaPipe hand-tracking model still requires a secure site and network access.

**Validation:** JavaScript static parse and bundling checks passed. Real-browser 16:9 UI and mobile touch regression as well as camera and device voice compatibility are pending actual hardware verification.

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

## Phase 4 science and learning-record improvements

- **Misi 2:** All four system diagrams now have visual animated learning stages, synchronized with the `Ikuti Aliran Sistem` panel in the right-hand task rail. `Sebelum`/`Seterusnya` jump through the water/nutrient stages without skipping the learning tasks. The existing Pause/Replay and component hotspots remain.
- **Misi 3:** The wick/water-particle animation now more clearly illustrates movement from the reservoir to the medium and root without a pump.
- **Misi 4:** The broken pump is visibly labelled `PAM MATI` before repair; after correction the full flow becomes animated. The disconnected wick continues to block capillary flow until repaired.
- **Buku Misi Pertanian:** `Kad Ilmu` (unlocked notes), `Lencana & Rekod` (badges and attempts) and `Rubrik PBD` (activity assessment) are now separate views. A printable `Lembaran Respons Individu` matches the final challenges.
- **Teacher assessment:** `Rubrik PBD` follows the user's RPH Lampiran 2 checklist (five observations) and Lampiran 3 activity rubric (scores 1–3) for SP 7.1.1 and SP 7.1.2. The individual profile stores *only teacher-entered* rubric scores and comments. `Mod Kelas` displays the criteria but does not turn a class discussion into 30 fictional individual marks. Saved evaluations appear in `Laporan Pembelajaran`. These scores are NOT official DSKP `Tahap Penguasaan` and are not automatically inferred from badges.
- **F/G verification:** Old saves load with blank optional assessment fields without deleting mission progress. The curriculum scope is unchanged: the game teaches the meaning of urban agriculture and how reservoir-based systems work, not the separate SP 7.1.3 design-sketch activity. The DSKP KSSR RBT Tahun 5 (Semakan 2017) at section 7.0 confirms the SP 7.1.1 and SP 7.1.2 wording.

**Validation limits:** Static bundled-JavaScript parse and independent science/rubric logic checks passed. The browser E2E suite is provided in `tests/learning.test.cjs` and `tests/science_pbd.test.cjs` but must still be executed and inspected against a live localhost/HTTPS deployment; camera hardware and device-specific speech voices have not been verified. No Category C voice or dialogue code was altered by these changes.

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

Alya's next dialogue attempts to play automatically **after the first user interaction** (browser autoplay rules). Captions remain visible even if voice is unavailable. Students may choose a speech language and specific device/browser voice in **Tetapan → Suara Alya**, listen with **Uji Suara Alya**, and adjust speed (0.70–1.40×). The initial setting prefers **Google Bahasa Indonesia (id-ID)** when actually available, at **1.10×** speed, matching the earlier Misi Chef Cilik preference; the lesson's written language stays Malaysian Malay. Available choices are populated from the real browser voices, and unavailable selections are visibly reported rather than silently replaced. Voice selection is retained per profile and on a new game. `Dengar Semula` replays the latest line. In `Tetapan`, the user can independently control `Bacaan suara Alya secara automatik`, `Muzik latar`, overall mute and voice/music/SFX volume; preferences are saved per mode. Speaking reduces the background music level and moving to a new scene cancels the old line.

`js/audio.js` synthesizes an **original, softly looping garden melody** and distinct button, correct-action, wrong-action, badge and red `SELESAI!` stamp sound effects locally with Web Audio. No copyrighted commercial song is embedded. Audio starts only after a user gesture. A standalone HTML retains these sounds without external music files.

**Real recorded voice limitation:** `assets/audio/manifest.json` is a recording checklist, not a verified set of MP3 files. The game uses the voice and language **selected by the player** from the voices that actually exist in that browser. It does not silently substitute an unrelated language or a generic robotic voice when the selected one is missing. In particular, a Google Indonesian female voice cannot be guaranteed on every phone, tablet or computer; check the `Uji Suara Alya` control to verify. The game gives a clear status and retains readable subtitles if the voice cannot play. Actual Malaysian Malay recordings would still be required for identical voice quality across all devices. Adding reviewed `assets/audio/<id>.mp3` files is recommended for consistent final voice quality.

Individual response-sheet generation, Phase 4 art polish and professional audio remain outside this delivery. Real camera gesture tracking remains unverified because no camera was available. Browser print dispatch and print styling are tested, not a physical printer. Reference sources are the user-supplied RPH, textbook pages 64–71 and DSKP excerpt. Open answers are not automatically scored.


## Phase 3 PBD and selection card

Misi 4 stores observation events, every cause choice with its timestamp and correctness, hint use, predictions, repair success and explanation submissions. The first choice is retained in `repairLog` even after replay. Both systems must be repaired and explained before the fourth badge can be awarded.

Final challenges save individual first responses and every revision. Challenge 2 additionally records the pump and capillary explanations as separate evidence entries. `completedAt` preserves the first completion time. Cards retain optional name, selected system, the actual reason, optional student-entered components, mode and creation time. The game never invents a missing reason or components. The latest card can be reopened from the ending or Buku Misi, printed or exported as JSON; prior cards remain in the full PBD export.

In **Mod Kelas**, teachers can display any final challenge, replay its spoken instruction, show a summary and confirm that pupils answered on their own sheets. Teacher-computer entries are optional shared examples. Confirmations are labelled `class_activity` with `individualAnswersCollected: false`; the game does not manufacture 16 individual answers. A blank class card is explicitly a template. Each pupil's assessment still requires their individual sheet and the teacher's rubric.

Buku Misi contains all five award stamps, repair notes, all response versions, a readable printable learning report and the existing JSON export. The printable report includes investigation events and answer timestamps. Badges are completion records, not TP grades.


## Phase 4 — Readiness, backups, teacher PBD and Alya dialogue (latest)

**D + H, device readiness:** The `Tetapan → Periksa Peranti & Kamera` panel checks display dimensions, secure context, media-device API, browser voices and reported network connectivity. The user can explicitly press `Uji Kamera (Meminta Izin)` to test permission; the short-lived stream is stopped immediately. Misi 3 now stops the live webcam if the tab goes into the background or the browser page is exited. Local HTML works for the five lesson missions and procedural music; gesture tracking requires MediaPipe resources from the internet and a secure browser origin, with mouse/touch fallback.

**B + F, interaction and persistence:** All five missions, original badges/unlock conditions, teacher previews, and touch/camera fallback are unchanged. `Buku Misi` now lets users export their current-mode JSON, make a combined backup of both modes, and restore an exported backup only after reading a confirmation. Imported data is normalized against saved-progress rules; a malformed or over-2-MB file is rejected. A successful import writes storage before switching in-memory progress. Users should export an existing backup before replacing records.

**E + G, teacher PBD:** Manual rubric entries can include an optional pupil name and date, saved in that individual's browser profile and displayed on the print-ready report. Five observation items and the 1–3 RPH activity rubric remain **teacher-entered only**, not DSKP TP, and do not create badges. The classroom projector profile still does not claim individual assessments. **Privacy:** JSON backups can contain learner names and answers; avoid sharing them publicly.

**C, Alya voice and dialogue:** Alya keeps the same top-left visual character and the game stays 16:9. A compact caption appears on the map; `Lihat lagi` opens the **full transcript in the task rail**, never over the assembly buttons. The transcript has `Dengar Semula` and optional `Jeda Suara / Sambung Suara` controls. `Tetapan` retains user-selectable language and installed voice, with speech rate, pitch and voice-list refresh. If a browser has not yet loaded voices, the game may retry once the browser reports available voices. The spoken voice is still subject to the device/browser's actual voice inventory; no universal natural Google female voice is promised.

### Testing limits
GitHub Actions builds a complete single-file HTML and runs browser regression tests. Simulated desktop/tablet/phone layouts and PBD, backup, voice and game progression can be tested automatically. **Actual iOS/Android hardware camera pinch accuracy and speech voice quality still require physical device acceptance**; simulation cannot certify those conditions. This is a Draft PR, not a production Pages rollout.


## Latest refinements — A, B, D, E, F, G, H

- Added minor city vegetation pixel details **without touching Alya's character code**.
- Misi 3: better invalid-drop reset, concise touch feedback and active-hand continuity with MediaPipe configured for up to two detected hands. Only one hand controls the pointer at once; test physical pinch accuracy before publishing.
- Improved responsive control-grid layout on phones and short landscape screens while preserving the 16:9 game viewport.
- `Buku Misi → Panduan PdP`: a 60-minute class timeline and syllabus glossary. `Eksport PBD CSV` exports an existing manually assessed pupil record; it never awards TP automatically.
- Bad JSON saves are preserved under a recovery key when possible, with an explicit warning and the existing backup-import feature.
- Science content checked against the [KSSR RBT Tahun 5 DSKP](https://fliphtml5.com/wifkl/jtrm/DSKP_KSSR_RBT_TAHUN_5_%28SEMAKAN%29/37/) and [Buku Teks RBT Tahun 5, page 69](https://fliphtml5.com/hkvtu/otho/SK_Reka_Bentuk_dan_Teknologi_Tahun_5_KSSR/79/). SP 7.1.1 and 7.1.2 remain the sole targeted SPs.
- `QA_CHECKLIST_PHASE4.md` lists manual iPhone/iPad/Android, projector, HTTPS webcam and 60-minute lesson acceptance tasks. `tests/phase4_final_polish.test.cjs` adds browser regression for lesson/glossary, CSV, wrong drag and recovery.

**Category C voice/Dialogue and all original Alya art were intentionally left unchanged.** This is still a Draft development branch, not a merged production GitHub Pages release.
