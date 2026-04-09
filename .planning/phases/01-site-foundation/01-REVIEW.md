---
phase: 01-site-foundation
reviewed: 2026-04-10T00:00:00Z
depth: standard
files_reviewed: 20
files_reviewed_list:
  - .github/workflows/deploy.yml
  - .gitignore
  - .vitepress/config.ts
  - .vitepress/theme/components/AreaTemplate.vue
  - .vitepress/theme/components/BossTemplate.vue
  - .vitepress/theme/components/EquipmentTemplate.vue
  - .vitepress/theme/custom.css
  - .vitepress/theme/index.ts
  - guide/beginner/index.md
  - guide/bosses/example-boss.md
  - guide/bosses/index.md
  - guide/characters/index.md
  - guide/equipment/example-equipment.md
  - guide/equipment/index.md
  - guide/maps/example-area.md
  - guide/maps/index.md
  - guide/story/index.md
  - guide/systems/index.md
  - index.md
  - package.json
findings:
  critical: 0
  warning: 4
  info: 4
  total: 8
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-04-10T00:00:00Z
**Depth:** standard
**Files Reviewed:** 20
**Status:** issues_found

## Summary

This review covers the complete site foundation for the 赤血沙漠 攻略 Wiki: the VitePress configuration, GitHub Actions deploy workflow, three Vue content-template components, custom CSS, theme registration, and all initial Markdown content files.

The overall structure is sound. The deploy pipeline, theme system, and component architecture are well-organised. No security vulnerabilities or data-loss risks were found.

Four warnings were identified: a broken hero CTA link that produces a 404 on the home page, frontmatter-based `href` values in all three Vue templates that bypass the VitePress base path and will 404 in the deployed environment, a missing null guard on `<h1>` text in all three templates, and missing `alt` attribute fallbacks on images. Four informational items are also noted, including a hardcoded `base` in config.ts and the absence of a `engines` field in package.json.

---

## Warnings

### WR-01: Hero CTA "開始閱讀攻略" Links to Non-Existent Page

**File:** `index.md:12`
**Issue:** The hero action link points to `/guide/beginner/introduction`, but no such file exists. The actual beginner index is at `guide/beginner/index.md`, which resolves to `/guide/beginner/`. Any visitor clicking the primary call-to-action on the home page will receive a 404.
**Fix:**
```yaml
actions:
  - theme: brand
    text: 開始閱讀攻略
    link: /guide/beginner/
```

---

### WR-02: Frontmatter `href` Values Ignore the VitePress `base` Path

**Files:**
- `guide/bosses/example-boss.md:10` (`areaLink: /guide/maps/example-area`)
- `guide/equipment/example-equipment.md:19` (`link: /guide/bosses/example-boss`)
- `guide/maps/example-area.md:13` (`link: /guide/bosses/example-boss`)
- `.vitepress/theme/components/BossTemplate.vue:40` (`<a ... :href="frontmatter.areaLink">`)
- `.vitepress/theme/components/AreaTemplate.vue:48` (`<a ... :href="enemy.link">`)
- `.vitepress/theme/components/EquipmentTemplate.vue:52` (`<a ... :href="source.link">`)

**Issue:** VitePress automatically prepends `base` (`/my-game/`) to links written in Markdown, but `:href` bindings in Vue templates receive the raw frontmatter string. Links like `/guide/maps/example-area` resolve to `https://host/guide/maps/example-area` instead of `https://host/my-game/guide/maps/example-area`, producing 404s in the deployed GitHub Pages site. The dev server works because VitePress dev serves from `/`, masking the problem until a production deploy.

**Fix (two options):**

Option A — Use VitePress `withBase` helper in each template component:
```ts
// In each <script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
```
```html
<!-- Then wrap each href -->
<a v-if="frontmatter.areaLink" :href="withBase(frontmatter.areaLink)">
```

Option B — Store paths without leading slash and construct URLs differently, but Option A is the canonical VitePress approach.

Apply the same `withBase()` wrapper to all `:href` expressions in `BossTemplate.vue`, `AreaTemplate.vue`, and `EquipmentTemplate.vue`.

---

### WR-03: Missing Null Guard on `<h1>` in All Three Templates

**Files:**
- `.vitepress/theme/components/BossTemplate.vue:5`
- `.vitepress/theme/components/EquipmentTemplate.vue:5`
- `.vitepress/theme/components/AreaTemplate.vue:5`

**Issue:** All three templates render `{{ frontmatter.name }}` directly into `<h1>` without a fallback. If an author creates a page using one of these templates but omits `name` from the frontmatter, the page renders with a blank `<h1>`, which breaks page structure and SEO. No runtime error is shown, making the omission invisible during development.

**Fix:**
```html
<h1>{{ frontmatter.name ?? '（未命名）' }}</h1>
```
A visible placeholder makes the omission immediately obvious rather than silently broken.

---

### WR-04: Image `alt` Attribute Will Be `null` When `frontmatter.name` Is Absent

**Files:**
- `.vitepress/theme/components/BossTemplate.vue:17`
- `.vitepress/theme/components/EquipmentTemplate.vue:19`

**Issue:** Both image elements bind `alt` directly to `frontmatter.name`:
```html
<img :src="frontmatter.image" :alt="frontmatter.name" />
```
When `frontmatter.name` is `undefined` (see WR-03), Vue renders the `alt` attribute as the string `"null"` or omits it, depending on the runtime version. An image with no meaningful `alt` text fails accessibility requirements and breaks screen readers. This is particularly notable since both templates also have a `v-if="frontmatter.image"` guard that excludes the fallback placeholder when a real image is provided.

**Fix:**
```html
<img :src="frontmatter.image" :alt="frontmatter.name ?? ''" />
```
An empty string `alt` is correct for decorative images where context is provided elsewhere; use a descriptive fallback string if the image is informational.

---

## Info

### IN-01: `base` in `config.ts` Is Hardcoded to the Repository Name

**File:** `.vitepress/config.ts:7`
**Issue:** `base: '/my-game/'` is a hardcoded string matching the current GitHub repository name. If the repository is renamed or the site is deployed to Netlify at a root path, this value must be manually updated or all assets and routes will break.
**Fix:** Document the dependency explicitly with a comment, or configure it via an environment variable for flexibility:
```ts
base: process.env.VITEPRESS_BASE ?? '/my-game/',
```

---

### IN-02: `Intl.Segmenter` Used in Search Tokenizer Without Environment Guard

**File:** `.vitepress/config.ts:112`
**Issue:** The custom Chinese tokenizer relies on `new Intl.Segmenter('zh', { granularity: 'word' })`. `Intl.Segmenter` is not available in Firefox versions before 106 (released October 2022) or in Node environments where the ICU data is stripped. If `Intl.Segmenter` is unavailable, the call will throw a `ReferenceError` or `TypeError` at runtime, silently breaking search for affected users rather than falling back gracefully.
**Fix:** Add a guard to fall back to simple character splitting when the API is unavailable:
```ts
tokenize: (text: string) => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
    return Array.from(segmenter.segment(text))
      .filter(s => s.isWordLike)
      .map(s => s.segment)
  }
  // Fallback: split on whitespace and punctuation
  return text.split(/[\s\p{P}]+/u).filter(Boolean)
},
```

---

### IN-03: `package.json` Has No `engines` Field

**File:** `package.json`
**Issue:** The CI workflow pins Node 20 (`actions/setup-node@v4` with `node-version: 20`), but `package.json` declares no `engines` constraint. A contributor running a different Node version locally (e.g., Node 18 or 22) will receive no warning that their version may produce different build output.
**Fix:**
```json
"engines": {
  "node": ">=20"
}
```

---

### IN-04: GitHub Actions Workflow Targets `master` Branch

**File:** `.github/workflows/deploy.yml:5`
**Issue:** The workflow triggers on pushes to `master`, but GitHub's default branch name for new repositories is `main`. If the repository was initialised with the default settings, the default branch will be `main` and the deploy workflow will never trigger on normal pushes.
**Fix:** Confirm the repository's default branch name and update accordingly:
```yaml
on:
  push:
    branches: [main]   # or [master] if that is confirmed correct
  workflow_dispatch:
```

---

_Reviewed: 2026-04-10T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
