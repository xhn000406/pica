# Dazz-style Camera Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four strong, Dazz-inspired live camera looks while retaining Original as the unmodified default and baking each selected look into captured frames.

**Architecture:** A single preset module defines lens metadata, live CSS treatment, and canvas rendering parameters. `App` owns the selected preset; `CameraPage` displays and selects it; `useCamera` uses the same preset when converting the live video frame to JPEG. The existing post-capture editor filter remains independent.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Canvas 2D, Vitest.

## Global Constraints

- Original is the default and must write an unmodified camera frame.
- Presets: CCD Blue, Flash 2000, Film 35, and Night Chrome; do not reuse Dazz names or assets.
- A preset is selectable only before the first capture; restart unlocks it.
- Live view and captured JPEG must use the same preset.
- Camera failure must never prevent an Original capture fallback.
- Preserve the existing iOS, Android, macOS, and Windows permission/switching behavior.

---

### Task 1: Define and test camera-lens presets

**Files:**
- Create: `src/data/cameraFilters.ts`
- Create: `src/data/cameraFilters.test.ts`
- Modify: `src/types.ts`
- Modify: `package.json`
- Modify: `vite.config.ts`

**Interfaces:**
- Produces `CameraFilterId`, `cameraFilters`, `cameraFilterOrder`, and `getCameraFilter(id)`.
- `CameraFilterPreset` contains `id`, `label`, `shortLabel`, `liveFilter`, `overlayClass`, and deterministic canvas values for saturation, contrast, brightness, tint, grain, vignette, and bloom.

- [ ] **Step 1: Add a failing preset test**

```ts
import { cameraFilterOrder, getCameraFilter } from './cameraFilters'

test('keeps Original first and exposes the four approved camera looks', () => {
  expect(cameraFilterOrder).toEqual(['original', 'ccd-blue', 'flash-2000', 'film-35', 'night-chrome'])
  expect(getCameraFilter('original').canvas.grain).toBe(0)
  expect(getCameraFilter('ccd-blue').canvas.tint).toBe('#65d9ff')
})
```

- [ ] **Step 2: Run the test and confirm it fails because the module does not exist**

Run: `npx vitest run src/data/cameraFilters.test.ts`

Expected: module-not-found failure for `./cameraFilters`.

- [ ] **Step 3: Add Vitest and the preset module**

Install `vitest`, `jsdom`, `@testing-library/react`, and `@testing-library/user-event` as development dependencies. Add `"test": "vitest run"` to `package.json`, then add this test block to `vite.config.ts`:

```ts
test: {
  environment: 'jsdom',
  globals: true,
},
```

```ts
export type CameraFilterId = 'original' | 'ccd-blue' | 'flash-2000' | 'film-35' | 'night-chrome'

export const cameraFilterOrder: CameraFilterId[] = [
  'original', 'ccd-blue', 'flash-2000', 'film-35', 'night-chrome',
]

export function getCameraFilter(id: CameraFilterId) {
  return cameraFilters[id]
}
```

Use neutral canvas values for Original. Give each non-original look a distinct CSS filter and matching deterministic Canvas parameters; no random per-frame variation.

- [ ] **Step 4: Run the preset test and full checks**

Run: `npm test -- src/data/cameraFilters.test.ts && npm run build && npm run lint`

Expected: all commands exit `0`.

- [ ] **Step 5: Commit the isolated preset layer**

```bash
git add package.json package-lock.json vite.config.ts src/types.ts src/data/cameraFilters.ts src/data/cameraFilters.test.ts
git commit -m "feat: define camera lens filters"
```

### Task 2: Render the selected lens into captured JPEGs

**Files:**
- Create: `src/lib/renderCameraFilter.ts`
- Create: `src/lib/renderCameraFilter.test.ts`
- Modify: `src/hooks/useCamera.ts`

**Interfaces:**
- Consumes `CameraFilterPreset` from Task 1.
- Produces `renderCameraFilter(context, width, height, preset)`.
- Changes `captureFrame` to `(filterId: CameraFilterId) => string | null`.

- [ ] **Step 1: Write a failing renderer test**

```ts
test('does not alter canvas state for Original', () => {
  const context = { filter: 'none', globalAlpha: 1, save: vi.fn(), restore: vi.fn() } as unknown as CanvasRenderingContext2D
  renderCameraFilter(context, 600, 800, getCameraFilter('original'))
  expect(context.filter).toBe('none')
  expect(context.globalAlpha).toBe(1)
})
```

- [ ] **Step 2: Run the test and confirm the missing renderer fails**

Run: `npm test -- src/lib/renderCameraFilter.test.ts`

Expected: module-not-found failure for `./renderCameraFilter`.

- [ ] **Step 3: Implement canvas rendering and wire it into capture**

```ts
context.filter = `saturate(${preset.canvas.saturation}) contrast(${preset.canvas.contrast}) brightness(${preset.canvas.brightness})`
context.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height)
renderCameraFilter(context, width, height, preset)
```

`renderCameraFilter` uses repeatable seeded grain derived from pixel coordinates, a clipped radial vignette, and a low-alpha tint/bloom layer. It returns immediately for Original. Preserve the current front-camera mirror behavior before drawing the filtered frame.

- [ ] **Step 4: Run renderer and project checks**

Run: `npm test -- src/lib/renderCameraFilter.test.ts && npm run build && npm run lint`

Expected: all commands exit `0`.

- [ ] **Step 5: Commit capture rendering**

```bash
git add src/lib/renderCameraFilter.ts src/lib/renderCameraFilter.test.ts src/hooks/useCamera.ts
git commit -m "feat: bake lens filters into captures"
```

### Task 3: Add the camera lens dial and capture lock

**Files:**
- Create: `src/components/CameraFilterDial.tsx`
- Modify: `src/App.tsx`
- Modify: `src/pages/CameraPage.tsx`
- Modify: `src/locales.ts`

**Interfaces:**
- Consumes `CameraFilterId`, `cameraFilterOrder`, and preset metadata from Task 1.
- `CameraFilterDial({ value, disabled, onChange })` emits a selected `CameraFilterId`.
- `CameraPage` receives `cameraFilterId` and `onCameraFilterChange`.

- [ ] **Step 1: Write a failing component test**

```tsx
render(<CameraFilterDial value="original" disabled={false} onChange={onChange} />)
await user.click(screen.getByRole('button', { name: /CCD Blue/i }))
expect(onChange).toHaveBeenCalledWith('ccd-blue')
```

- [ ] **Step 2: Run the test and confirm the absent dial fails**

Run: `npm test -- src/components/CameraFilterDial.test.tsx`

Expected: module-not-found failure for `./CameraFilterDial`.

- [ ] **Step 3: Implement the dial and state flow**

Render the dial below the viewfinder. Apply `preset.liveFilter` to the video and `preset.overlayClass` above it. In `App`, initialize state as `original`; pass the selected filter to capture; reset it to `original` in `resetSession`. Disable all lens buttons whenever `capturedPhotos.length > 0` or a capture is currently locked. Add concise Chinese and English labels for “Lens look”, “Locked after first photo”, and each mode.

- [ ] **Step 4: Verify the full user flow**

Run: `npm test && npm run build && npm run lint`

Manual check: select each mode, confirm the live video changes, take a photo, compare its session-strip frame to the live look, confirm the dial locks, restart, then confirm Original is selected and the dial unlocks.

- [ ] **Step 5: Commit the complete camera lens experience**

```bash
git add src/components/CameraFilterDial.tsx src/components/CameraFilterDial.test.tsx src/App.tsx src/pages/CameraPage.tsx src/locales.ts
git commit -m "feat: add live camera lens filter dial"
```
