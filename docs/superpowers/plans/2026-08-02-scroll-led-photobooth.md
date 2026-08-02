# Scroll-led Photobooth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the clickable four-tab photo-booth flow with one progressive scrolling experience that carries the user from start through capture, editing, and export.

**Architecture:** `App.tsx` will render all four stages together and own the active stage plus section refs. Primary actions will set the active stage and scroll to the appropriate section. Existing camera, edit, and export components remain the feature owners; their route-like wrappers become stage content. `StepRail` becomes a passive progress display.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, GSAP, MediaDevices API, Canvas export.

## Global Constraints

- Keep camera processing and captured photos local to the browser.
- Preserve the existing 4:4.65 camera capture and photo-strip output ratio.
- Keep editing limited to filter, paper color, and optional footer signature.
- Use pet photos only as decorative start-stage imagery; never mix them into captured/exported user photos.
- Keep Chinese and English strings in `src/locales.ts`.

---

### Task 1: Create stage navigation primitives

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/StepRail.tsx`

**Interfaces:**
- Produces `scrollToStage(stage: AppPage): void` in `App.tsx`.
- `StepRail` consumes `currentPage` only and renders a non-interactive progress display.

- [ ] **Step 1: Replace route-only page state with section refs and active stage state**

Add refs for `start`, `camera`, `edit`, and `export`; render each as a semantic `section` with a matching ref.

- [ ] **Step 2: Add a minimal scroll helper**

```ts
const scrollToStage = (stage: AppPage) => {
  stageRefs.current[stage]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setPage(stage)
}
```

- [ ] **Step 3: Use an IntersectionObserver to update the passive rail**

Observe stage sections with a threshold around `0.45`; update `page` to the most-visible section.

- [ ] **Step 4: Convert `StepRail` buttons to presentational items**

Remove `onSelect`, `isStepEnabled`, `disabled`, and click handlers. Keep active number, label, and note styling.

- [ ] **Step 5: Verify manually**

Run `npm run dev`, scroll through the page, and confirm the rail changes as each stage reaches the viewport center.

### Task 2: Turn capture completion into stage progression

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/CameraPage.tsx`

**Interfaces:**
- `CameraPage.onContinue(): void` invokes `scrollToStage('edit')` after four photos are captured.
- `CameraPage.onRestart(): void` clears the session and invokes `scrollToStage('camera')`.

- [ ] **Step 1: Keep the camera stage mounted for the full session**

Render `CameraPage` in the capture section instead of switching it through the `switch (page)` block.

- [ ] **Step 2: Connect the completed capture button to edit scrolling**

Use the existing completion guard so `继续编辑` remains disabled before the fourth shot and scrolls to stage 03 after completion.

- [ ] **Step 3: Keep natural scroll available**

Do not lock scrolling or hide later stages; the edit stage displays its locked/empty state until capture is complete.

- [ ] **Step 4: Verify camera regression**

Capture four frames, confirm the session strip updates, then confirm `继续编辑` scrolls to the editor without losing photos.

### Task 3: Embed the editor and exporter as scroll stages

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/EditPage.tsx`
- Modify: `src/pages/ExportPage.tsx`

**Interfaces:**
- `EditPage.onContinue(): void` invokes `scrollToStage('export')`.
- `ExportPage.onRetake(): void` resets camera state and invokes `scrollToStage('camera')`.

- [ ] **Step 1: Remove the edit modal container**

Remove `isEditModalOpen`, ESC modal handling, and the fixed overlay; render `EditPage` inside the stage 03 section.

- [ ] **Step 2: Add locked-stage affordance**

Before four shots are captured, stage 03 and 04 show a short in-page instruction and disabled primary controls rather than navigational dead ends.

- [ ] **Step 3: Rewire edit and export actions**

`继续导出` scrolls to stage 04. `重拍` clears session data and scrolls to stage 02.

- [ ] **Step 4: Verify style and export state**

Adjust filter, paper color, and signature; scroll to export and confirm the final preview and generated PNG use the same values.

### Task 4: Replace the start-stage mock photo strip with pet mood cards

**Files:**
- Modify: `src/pages/StartPage.tsx`
- Modify: `src/locales.ts`

**Interfaces:**
- `StartPage.onStart(): void` invokes `scrollToStage('camera')` and resets any prior session.

- [ ] **Step 1: Remove `PhotoStripPreview` from the start stage**

Delete the default human mock-photo-strip props and component from `StartPage`.

- [ ] **Step 2: Add two decorative pet cards**

Use stable external image URLs with descriptive alt text and soft pink/blue framing. Keep the cards decorative and outside the camera/export state.

- [ ] **Step 3: Rewrite start copy for the scroll flow**

Add localized copy that explains the single action: begin, capture, style, save.

- [ ] **Step 4: Verify responsive layout**

At mobile width, cards stack or overlap safely and the stage CTA remains visible without horizontal overflow.

### Task 5: Full verification and handoff

**Files:**
- Modify: `docs/STATUS.md`

- [ ] **Step 1: Update project status**

Record the scroll-led flow, current stage behavior, and test coverage in `docs/STATUS.md`.

- [ ] **Step 2: Run static verification**

Run:

```bash
npm run build
npm run lint
```

Expected: both commands exit with code `0`.

- [ ] **Step 3: Run manual browser checks**

Check 01→02, four captures, 02→03, style updates, 03→04, PNG export, and retake→02 at desktop and mobile widths.

- [ ] **Step 4: Commit**

```bash
git add src docs
git commit -m "feat: add scroll-led photobooth flow"
```
