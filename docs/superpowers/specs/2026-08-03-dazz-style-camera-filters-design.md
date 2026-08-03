# Dazz-style Camera Filters Design

## Goal

Make Pica feel like a camera app rather than a post-processing tool. The default is always an unmodified camera original; users can optionally select one strong, Dazz-inspired lens look before shooting. The live view, captured frames, editor preview, and exported strip must show the same chosen look.

## Experience

The camera page gains a horizontally scrollable lens-mode dial below the viewfinder. It contains five mutually exclusive modes:

- **Original** — default; no color, grain, or texture modification.
- **CCD Blue** — cool cyan/blue cast, blown highlights, digital noise.
- **Flash 2000** — warm direct-flash look, lifted skin warmth, darker edge falloff.
- **Film 35** — faded warm film palette, visible grain, restrained light leak and haze.
- **Night Chrome** — cool shadows, deeper blacks, stronger contrast for low light.

Each mode is a small visual swatch/card. Tapping one updates the live view immediately. It remains selectable before the first capture and becomes locked as soon as the first frame is taken, so a four-photo strip cannot accidentally mix looks. Restarting clears captures and unlocks the dial. The current mode is visible as a concise label in the viewfinder chrome.

Original remains selected unless the user explicitly chooses another mode. The existing editor can still offer a later style change, but it starts from the look used at capture.

## Visual Direction

The four non-original looks should be deliberately noticeable, not subtle Instagram-style adjustments. They borrow the *category* of retro digital/film camera effects without copying Dazz names, assets, or proprietary preset data. Grain, color response, mild bloom, and vignetting are part of a mode rather than separate controls.

## Architecture

Add a `CameraFilterId` and preset metadata module with names, colors, CSS live-preview treatment, and deterministic capture-rendering parameters. `App.tsx` owns the selected camera filter, alongside the chosen strip layout, and passes it to `CameraPage` and `useCamera`.

`CameraPage` renders the lens dial and applies the active preview treatment as an overlay/filter to the video element. `useCamera.captureFrame` accepts the selected preset and reproduces the same composition on its canvas before producing the JPEG data URL. Captured photos retain that rendered result, so the strip and PNG export do not need to reinterpret the camera effect. The existing editor filter remains a separate, optional post-capture layer.

## Error Handling

Filter selection is fully local and does not affect camera permissions or device switching. If canvas filtering is unsupported, capture falls back to the original frame rather than failing the shot; the UI shows a non-blocking notice only if the selected non-original filter could not be rendered. `Original` must always work on iOS, Android, macOS, and Windows.

## Verification

- Confirm `Original` produces an unmodified capture.
- For each of the four effects, compare live view, captured frame, editor strip, and downloaded PNG for the same look.
- Confirm a selected mode locks after frame one and unlocks after restart.
- Verify the camera continues to work with front/back switching where supported.
- Test iOS, Android, macOS, and Windows browser layouts; run `npm run build` and `npm run lint`.
