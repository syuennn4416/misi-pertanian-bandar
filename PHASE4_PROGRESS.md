# Phase 4 progress / Kemajuan penambahbaikan

This branch continues the original Phase 3 five-mission implementation. **Do not change Alya's appearance.**
The repository's default branch was `feature/phase2-missions` at the beginning of this work. This branch is based on `feature/phase3-five-missions`.

## Completed on this branch
- **F — Progress integrity:** Completing the final challenge in Mod Kelas without the earlier missions now shows a classroom-preview message. No undeserved fifth badge, no false `completedAt`, and no false ending. The normal five-badge ending requires all five badges.
- **F — Migration:** Legacy `completedAt` and `ending` states are sanitized if fewer than five badges are present.
- **G — Content:** The definition of `Pertanian bandar` now includes the balcony, house garden, urban plots and community garden; the same shared definition is used for learning and revision.
- **D — Classroom:** Misi 2 has a teacher-led oral discussion shortcut instead of requiring 18 individual component inspections. It records a `class_activity`, not sixteen student submissions. Misi 4 has a teacher-only `Paparkan Semua Petunjuk` display.
- **B — Interaction:** Small numbered markers are added over each of the four scientific diagrams. They trigger the same explanation and inspection logic as the existing buttons. Misi 4 diagrams likewise have observation and repair markers. Existing text-button fallbacks remain available.
- **B/D — Camera preview & responsive layout:** Misi 3 now shows a 4:3 student-visible camera preview in a dedicated panel. Desktop displays the game and preview side-by-side; tablet/phone stack them without obscuring assembly targets. Camera permission is opt-in; the alternative mouse/touch mode remains active, and the camera stream stops on exit.
- **D/H — Verification:** Playwright layout/assembly/fallback simulation succeeded for 1440px desktop, 820px tablet and 390px phone using an equivalent standalone HTML loaded into the browser without a server origin. All three layouts had no horizontal overflow or page script errors. This does not verify live HTTPS hand tracking.
- **C — Alya audio and celebration:** Added automatic dialogue narration after user activation, manual Dengar Semula, preferred ms-MY device voice with transparent fallback, audio ducking while speaking, synthesized original garden melody, separate click/success/stamp tones, stronger red SELESAI! badge animation, and persistent music/auto-voice settings. The standalone build bundles the audio engine.
- **C — Verification:** JavaScript parse check and eight isolated audio-controller checks passed (user gesture, narration, voice selection, replay, mute, sounds and manual replay). Real device voice availability and MP3 recordings remain unverified.
- **A — Scenes:** `Rumah Pangsa`, `Rumah Teres` and `Kebun Komuniti` now have distinct Canvas pixel backgrounds. **Alya's character source, palette and drawing function were not modified.**
- The downloadable `Misi-Pertanian-Bandar.html` is regenerated from the modular source.

## Phase 4 layout update — integrated 16:9 player (latest)
- **D — Main ratio:** `#gameShell` is now a true 16:9 **whole desktop/tablet-landscape game frame**, containing a 16:9 Canvas, task rail and action toolbar. The page header sits outside this player.
- **D — Alya dialogue:** original Alya pixel sprite is preserved. Her dialogue is anchored **upper-left inside the game**, collapsed to a brief readable line by default to avoid obscuring scientific hotspots. `Lihat lagi` expands the full text; `Ringkaskan` collapses it again. `Dengar Semula` remains available within the expanded view; narration/captions continue automatically as before.
- **B/D — Camera placement:** Misi 3 camera remains an independent 4:3 preview in the right-hand task rail for desktop and tablet landscape; on narrow/portrait screens it moves below the 16:9 game viewport. It never covers assembly targets.
- **D — Accessibility trade-off:** A phone held in portrait cannot display the entire lesson legibly inside a fixed-height 16:9 page. On screens at/below 780px, **the play canvas remains 16:9**, while controls, long activities and camera become scrollable stacked sections. Tablet/phone landscape is recommended where possible.
- **D — UI:** Long mission activities and answer forms have a dedicated scrollable side rail on desktop; action buttons have a separate bottom rail inside the frame. The upper-left dialogue is compact by default so components around y=32% remain accessible.
- **Verification:** Consolidated `Misi-Pertanian-Bandar.html` JavaScript parsed successfully and includes the five existing missions, original Alya rendering, audio system and camera. The updated responsive test now checks 16:9 frame, mobile game viewport and expandable dialogue. **Real device layout/playwright pass not yet confirmed in this session**.

## Remaining Phase 4 backlog
- **A:** Further polish of map perspective, furniture, motion and pixel coherence; visually inspect all three new scenes at projector and phone sizes.
- **B:** Fine-tune hotspot coordinates on real devices; improve the visual teaching of aquaponics microbes and capillary movement; test real hand gesture pinch on HTTPS.
- **C:** A natural **recorded** ms-MY female voice is still pending: the existing asset manifest lists proposed files, not verified MP3 audio. Current browser voice output is best-effort and varies by device. Verify playback on desktop, iPad and Android/iOS; replace TTS with authorized recordings when available.
- **D:** Recheck phone landscape vs portrait, tablet screen rotations, classroom projector readability, small-screen title/dialogue overlap and touch hotspots at actual device DPI. The integrated 16:9 layout is implemented but still requires real hardware regression.
- **E:** Better illustrated Buku Misi, replay navigation and optional teacher assessment rubric; do not equate medals with PBD mastery.
- **F:** Full save/replay verification and regression testing after merging; preserve user data and keep a new user's state empty.
- **G:** Review terminology and accurate technical diagrams against the supplied textbook/DSKP. The new definition is an editorial clarification, not a verbatim textbook quotation.
- **H:** Real-browser end-to-end testing on desktop, mobile and tablet; manual camera tests; GitHub Pages publication.

## Verification caveat
Updated source is committed. A local JavaScript parser check passed against the equivalent edited standalone build. Local browser navigation to localhost was blocked, but Playwright loaded an equivalent standalone page directly and verified three screen layouts, camera panel visibility, assembly completion, mouse/touch fallback and cleanup with no horizontal overflow or page errors. **Live-camera tracking, GitHub-hosted pages, and the full npm suite have not been verified in this session**. Run `npm test` and `npm run build` locally or in CI, then check the rendered scenes before publication.

## Scope
Only RBT Tahun 5 SP 7.1.1 and 7.1.2 are taught. The selection card bridges to SP 7.1.3 in the next lesson; no drawing exercise was added.

## Phase 4 Category C audio controls
The game now starts music only after a user gesture, uses original procedural sounds (no third-party song), and automatically attempts to speak subsequent Alya dialogue. `Dengar Semula`, mute, `Bacaan suara Alya secara automatik`, `Muzik latar`, and three independent volume sliders are available from `Tetapan`. Audio preferences remain separate for `kelas` and `kendiri`. HTML `file://` can play the original synthesized music/SFX, but voice selection depends on the browser; camera still requires HTTPS or localhost. The recorded audio manifest in `assets/audio/manifest.json` is not proof that MP3 files exist. WebAudio playback depends on the browser allowing sound after a user click.
