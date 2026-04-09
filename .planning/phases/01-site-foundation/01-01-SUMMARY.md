---
phase: 01-site-foundation
plan: 01
subsystem: site-scaffold
tags: [vitepress, setup, theme, navigation, css]
dependency_graph:
  requires: []
  provides:
    - vitepress-project-scaffold
    - custom-theme-css
    - nav-and-sidebar-config
    - home-page
    - content-placeholder-pages
  affects: []
tech_stack:
  added:
    - vitepress@1.6.4
  patterns:
    - VitePress DefaultTheme extension via .vitepress/theme/index.ts
    - CSS custom property overrides for dark/light mode theming
    - Multi-path sidebar configuration
    - Intl.Segmenter CJK tokenizer for MiniSearch
key_files:
  created:
    - package.json
    - package-lock.json
    - .gitignore
    - .vitepress/config.ts
    - .vitepress/theme/index.ts
    - .vitepress/theme/custom.css
    - index.md
    - guide/beginner/index.md
    - guide/story/index.md
    - guide/bosses/index.md
    - guide/characters/index.md
    - guide/equipment/index.md
    - guide/maps/index.md
    - guide/systems/index.md
  modified: []
decisions:
  - type:module added to package.json — VitePress 1.x requires ESM; without it esbuild fails to resolve the ESM-only vitepress package
metrics:
  duration_minutes: 3
  tasks_completed: 2
  tasks_total: 2
  files_created: 14
  files_modified: 0
  completed_date: "2026-04-10"
---

# Phase 01 Plan 01: VitePress Project Initialization Summary

**One-liner:** VitePress 1.6.4 initialized with dark/light themed CSS variables, 8-item CJK nav, Intl.Segmenter search, Noto Sans TC font, and 7 content placeholder pages.

## What Was Built

A complete VitePress project skeleton for the 赤血沙漠 攻略 Wiki, ready for content authoring:

- **package.json** — VitePress 1.6.4 dev dependency, build scripts, ESM module type
- **.vitepress/config.ts** — Central site config: lang zh-Hant, base /my-game/, dark mode default, 8 nav items, 7 sidebar configs, CJK MiniSearch tokenizer, Google Fonts, footer
- **.vitepress/theme/custom.css** — Full CSS variable overrides: dark (#1a1a1e) and light (#faf8f5) backgrounds, red/gold accent brand colors, rarity/difficulty badge styles, table hover interactions
- **.vitepress/theme/index.ts** — Theme entry point extending DefaultTheme with custom CSS import
- **index.md** — Home page with hero (赤血沙漠 / 攻略 Wiki / two CTAs) and 6 feature cards
- **guide/\*/index.md** — 7 placeholder content pages with layout:doc frontmatter and placeholder text

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 783db34 | feat: initialize VitePress project with full nav config |
| 2 | b42d847 | feat: add theme CSS, home page, and content placeholders |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added `"type": "module"` to package.json**
- **Found during:** Task 1 verification (npm run docs:build)
- **Issue:** VitePress is ESM-only. Without `"type": "module"` in package.json, esbuild threw: `"vitepress" resolved to an ESM file. ESM file cannot be loaded by require`.
- **Fix:** Added `"type": "module"` field to package.json before the scripts section.
- **Files modified:** package.json
- **Commit:** 783db34

## Known Stubs

All 7 content pages under guide/ contain placeholder text "此內容正在撰寫中，敬請期待." — this is intentional per the plan spec. Content will be authored in subsequent plans (02 and 03).

## Threat Surface Scan

- **T-01-02 (mitigate):** config.ts reviewed — contains no secrets, API keys, or sensitive env vars. Only public site metadata.
- **T-01-03 (mitigate):** package-lock.json committed for reproducible installs; vitepress pinned at `^1.6.4` (no unexpected major bumps). CI should use `npm ci`.
- No new threat surface introduced beyond what was in the plan's threat model.

## Self-Check: PASSED
