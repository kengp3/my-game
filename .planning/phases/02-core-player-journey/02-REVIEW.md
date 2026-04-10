---
phase: 02-core-player-journey
reviewed: 2026-04-10T09:10:00Z
depth: standard
files_reviewed: 16
files_reviewed_list:
  - .vitepress/config.ts
  - .vitepress/theme/components/AreaTemplate.vue
  - .vitepress/theme/components/BossTemplate.vue
  - .vitepress/theme/components/ChoicePoint.vue
  - .vitepress/theme/components/CombatGuideTemplate.vue
  - .vitepress/theme/components/StoryChapterTemplate.vue
  - .vitepress/theme/custom.css
  - .vitepress/theme/index.ts
  - guide/beginner/combat-basics.md
  - guide/beginner/combat-combos.md
  - guide/beginner/combat-defense.md
  - guide/beginner/index.md
  - guide/story/chapter-1.md
  - guide/story/chapter-2.md
  - guide/story/chapter-3.md
  - guide/story/index.md
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-10T09:10:00Z
**Depth:** standard
**Files Reviewed:** 16
**Status:** issues_found

## Summary

Reviewed all 16 source files for the core player journey phase, including the VitePress config, 6 Vue template components, a custom CSS theme file, the theme index, and 8 Markdown content pages. The codebase is generally well-structured with consistent patterns: Vue components use optional chaining defensively, `v-if` guards protect conditional rendering, and `withBase()` is applied to internal links. Three issues were found: a missing guard on boss links in `StoryChapterTemplate.vue` that could produce broken hrefs, a CSS specificity conflict in the gold-highlight utility that breaks dark mode, and a redundant CSS rule.

## Warnings

### WR-01: Boss links rendered without guard for missing `link` field

**File:** `.vitepress/theme/components/StoryChapterTemplate.vue:31`
**Issue:** The boss `v-for` always renders an `<a>` tag with `:href="withBase(boss.link)"`. If a frontmatter boss entry omits the `link` field, `withBase(undefined)` will produce a malformed URL (e.g., `/my-game/undefined`). Other templates in this codebase correctly guard against this -- for example, `AreaTemplate.vue` lines 47-49 use `v-if="enemy.link"` to conditionally render an `<a>` vs a `<span>`, and `BossTemplate.vue` line 40 uses `v-if="frontmatter.areaLink"`.
**Fix:**
```vue
<template v-for="boss in frontmatter.bosses" :key="boss.name">
  <a v-if="boss.link" :href="withBase(boss.link)" class="boss-link template-card">
    {{ boss.name }}
  </a>
  <span v-else class="boss-link template-card">{{ boss.name }}</span>
</template>
```

### WR-02: CSS specificity conflict causes `.gold-highlight` dark mode color to be overridden

**File:** `.vitepress/theme/custom.css:60-62`
**Issue:** Three rules target `.gold-highlight`:
```css
.gold-highlight { color: #d4a843; }          /* specificity 0,1,0 */
.dark .gold-highlight { color: #d4a843; }    /* specificity 0,2,0 */
:root .gold-highlight { color: #b8922e; }    /* specificity 0,2,0 */
```
`.dark .gold-highlight` and `:root .gold-highlight` have identical specificity (0,2,0). Since `:root .gold-highlight` appears later in source order, it wins via the cascade -- even in dark mode. This means dark mode always gets the light-mode color `#b8922e` instead of the intended `#d4a843`.
**Fix:**
```css
.gold-highlight { color: #d4a843; }
:root .gold-highlight { color: #b8922e; }
.dark .gold-highlight { color: #d4a843; }
```
Move the `.dark` rule after `:root` so it wins in dark mode. Alternatively, increase specificity of the dark rule (e.g., `html.dark .gold-highlight`).

## Info

### IN-01: First `.gold-highlight` rule is dead code

**File:** `.vitepress/theme/custom.css:60`
**Issue:** The base rule `.gold-highlight { color: #d4a843; }` is immediately overridden by `:root .gold-highlight { color: #b8922e; }` which applies to all elements under `:root` (i.e., all elements on the page). The base rule can never take effect.
**Fix:** Remove the base `.gold-highlight` rule entirely and rely on the `:root` and `.dark` scoped rules. After fixing WR-02:
```css
:root .gold-highlight { color: #b8922e; }
.dark .gold-highlight { color: #d4a843; }
```

---

_Reviewed: 2026-04-10T09:10:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
