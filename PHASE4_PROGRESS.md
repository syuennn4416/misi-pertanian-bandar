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
- **A — Scenes:** `Rumah Pangsa`, `Rumah Teres` and `Kebun Komuniti` now have distinct Canvas pixel backgrounds. **Alya's character source, palette and drawing function were not modified.**
- The downloadable `Misi-Pertanian-Bandar.html` is regenerated from the modular source.

## Remaining Phase 4 backlog
- **A:** Further polish of map perspective, furniture, motion and pixel coherence; visually inspect all three new scenes at projector and phone sizes.
- **B:** Fine-tune hotspot coordinates on real devices; improve the visual teaching of aquaponics microbes and capillary movement; test real hand gesture pinch on HTTPS.
- **C:** Natural female ms-MY narration, aligned subtitles, verified audio assets, background music and richer stamping sound effects. Current speech/audio is not production-ready.
- **D:** Further projector typography and phone/tablet ergonomic polish; responsive camera preview and baseline device layouts are implemented but require real hardware tests.
- **E:** Better illustrated Buku Misi, replay navigation and optional teacher assessment rubric; do not equate medals with PBD mastery.
- **F:** Full save/replay verification and regression testing after merging; preserve user data and keep a new user's state empty.
- **G:** Review terminology and accurate technical diagrams against the supplied textbook/DSKP. The new definition is an editorial clarification, not a verbatim textbook quotation.
- **H:** Real-browser end-to-end testing on desktop, mobile and tablet; manual camera tests; GitHub Pages publication.

## Verification caveat
Updated source is committed. A local JavaScript parser check passed against the equivalent edited standalone build. Local browser navigation to localhost was blocked, but Playwright loaded an equivalent standalone page directly and verified three screen layouts, camera panel visibility, assembly completion, mouse/touch fallback and cleanup with no horizontal overflow or page errors. **Live-camera tracking, GitHub-hosted pages, and the full npm suite have not been verified in this session**. Run `npm test` and `npm run build` locally or in CI, then check the rendered scenes before publication.

## Scope
Only RBT Tahun 5 SP 7.1.1 and 7.1.2 are taught. The selection card bridges to SP 7.1.3 in the next lesson; no drawing exercise was added.
