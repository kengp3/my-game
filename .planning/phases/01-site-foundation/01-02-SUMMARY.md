---
phase: 01-site-foundation
plan: 02
subsystem: content-templates
tags: [vitepress, vue-sfc, templates, frontmatter, boss, equipment, area]
dependency_graph:
  requires:
    - vitepress-project-scaffold
    - custom-theme-css
    - nav-and-sidebar-config
  provides:
    - boss-template-component
    - equipment-template-component
    - area-template-component
    - example-boss-page
    - example-equipment-page
    - example-area-page
  affects:
    - .vitepress/theme/index.ts
    - .vitepress/config.ts
tech_stack:
  added: []
  patterns:
    - Vue SFC global component registration via enhanceApp
    - useData() frontmatter-driven template rendering
    - Optional chaining for safe array access in templates
    - Scoped CSS with responsive grid layout
key_files:
  created:
    - .vitepress/theme/components/BossTemplate.vue
    - .vitepress/theme/components/EquipmentTemplate.vue
    - .vitepress/theme/components/AreaTemplate.vue
    - guide/bosses/example-boss.md
    - guide/equipment/example-equipment.md
    - guide/maps/example-area.md
  modified:
    - .vitepress/theme/index.ts
    - .vitepress/config.ts
decisions: []
metrics:
  duration_minutes: 8
  tasks_completed: 2
  tasks_total: 2
  files_created: 6
  files_modified: 2
  completed_date: "2026-04-10"
---

# Phase 01 Plan 02: Content Template Components Summary

**One-liner:** Three frontmatter-driven Vue SFC templates (Boss/Equipment/Area) globally registered in VitePress theme, each with structured info grids, tables, badge styling, and example pages demonstrating all D-03/D-04/D-05 fields.

## What Was Built

Three globally registered Vue Single File Components that serve as the visual contract for all future content pages in Phases 2-5:

### BossTemplate.vue
- **Header:** Boss name (h1) + color-coded difficulty badge (`difficulty-badge` class with `data-level` attribute)
- **Image:** Renders `<img>` if `frontmatter.image` is set, otherwise shows placeholder div
- **Info grid:** 3-column responsive grid (collapses to 1 on mobile) showing level, weakness (joined with 、), area with optional link
- **Drops list:** Renders per-drop cards with name links and rarity badges (`rarity-badge` class)
- **Slot:** `<slot />` for all Markdown body content (attack tables, strategy prose, tips)
- All array accesses use optional chaining (`frontmatter.weakness?.join()`, `frontmatter.drops?.length`)

### EquipmentTemplate.vue
- **Header:** Equipment name (h1) + rarity badge (`rarity-badge` class)
- **Stats table:** Renders `<table>` with 屬性/數值/備註 columns from `frontmatter.stats` array
- **Sources list:** Per-source type + from with optional link
- **Enhancement:** Ordered list from `frontmatter.enhancement` array
- **Builds:** `.template-card` cards for each build recommendation
- **Slot:** `<slot />` for additional Markdown content

### AreaTemplate.vue
- **Header:** Area name (h1) + level range badge (brand-colored pill)
- **Description:** Paragraph from `frontmatter.description`
- **Overview grid:** 3-column grid showing level range, enemy count, quest count
- **Enemy table:** Name (with optional link) + level
- **NPC table:** Name + location + services columns
- **Chests list:** Location + contents
- **Hidden areas:** `.template-card` cards with name, description, entry method
- **Quest list:** Type + name with optional link
- **Slot:** `<slot />`

### Global Registration
`enhanceApp` in `.vitepress/theme/index.ts` registers all three via `app.component()` so they are usable in any Markdown file without per-file imports.

### Example Pages
Three fully-featured example pages demonstrating each template with realistic game data, complete frontmatter schemas per D-03/D-04/D-05, Markdown body content using tables and admonition containers.

### Sidebar
`.vitepress/config.ts` sidebar updated to include all three example pages under their respective sections.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 3d13617 | feat: create Vue SFC templates and register globally |
| 2 | b1fffe2 | feat: add example content pages and update sidebar |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all three example pages render real template data from frontmatter. The `image: null` fields in frontmatter are intentional placeholder declarations that trigger the image-placeholder div (styled with dashed border), not broken stubs. This is the expected state for Phase 1.

## Threat Surface Scan

All threats reviewed against the plan's threat model:
- **T-02-01 (accept):** `{{ }}` interpolation used throughout — Vue auto-escapes HTML, no `v-html` used anywhere. Verified in all three templates.
- **T-02-02 (accept):** All frontmatter is git-committed content authored by developers, not user input.
- **T-02-03 (accept):** Static site build — array sizes only affect build time.

No new threat surface beyond the plan's threat model.

## Self-Check: PASSED
