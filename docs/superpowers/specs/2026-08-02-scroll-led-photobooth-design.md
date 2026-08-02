# Scroll-led Photobooth Design

## Goal

Replace the four clickable workflow tabs with one progressive, vertically scrolling Pica Booth experience. Users should always understand the current action and move forward through a single primary button.

## Experience

The page contains four full-width stages in order: start, capture, style, save. A slim non-interactive progress rail marks `01` through `04` and highlights the active stage while scrolling. It is informational only; navigation happens through the primary action in each stage.

- **01 Start:** Text-led introduction and two small pet-photo mood cards. The existing default human mock-photo strip is removed.
- **02 Capture:** The live camera and session strip stay in this stage. When four photos are captured, `继续编辑` smoothly scrolls to stage 03. Users can also continue by scrolling naturally.
- **03 Style:** Existing editor controls remain, now embedded in the scroll sequence. `继续导出` scrolls to stage 04.
- **04 Save:** Existing final preview and download/share controls remain as the last stage.

## Visual Direction

Use the approved visual reference: warm off-white surface, dark serif headings, pink accent labels, generous vertical pacing, centered pet mood cards, and one visually dominant primary action per stage. The existing straight photo-strip and optional footer signature remain unchanged.

## Content Rules

- Keep the UI in Chinese/English through the existing locale system.
- Pet mood cards use external, royalty-free photo URLs for the initial design; they are decorative and have descriptive alt text.
- The user’s real camera photos remain local to the browser and never use external image services.

## Architecture

`App.tsx` owns the active stage and section refs. It renders all four stage sections in a single page and exposes scroll helpers to child pages. `StepRail` becomes a passive progress indicator. Existing `CameraPage`, `EditPage`, and `ExportPage` are adapted from route-like screens into stage content, preserving their camera, editing, and export behavior.

## Error Handling

Camera permissions, unavailable hardware, sharing cancellation, and PNG errors retain their current in-stage messages. A user cannot invoke editing or export actions until all four photos are captured.

## Verification

- Test the stage progression manually with mouse wheel and primary buttons.
- Verify capture, editing, export, and retake behavior on desktop and a mobile viewport.
- Run `npm run build` and `npm run lint`.
