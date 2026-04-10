---
phase: 03-characters-equipment
plan: 03
subsystem: systems-guides-sidebar
tags: [enhancement, crafting, sidebar, navigation, systems]
dependency_graph:
  requires: [03-01, 03-02]
  provides: [system-guide-pages, complete-sidebar-navigation]
  affects: [.vitepress/config.ts, guide/systems/]
tech_stack:
  added: []
  patterns: [vitepress-sidebar-subgroups, markdown-content-pages]
key_files:
  created:
    - guide/systems/enhancement.md
    - guide/systems/crafting.md
  modified:
    - guide/systems/index.md
    - .vitepress/config.ts
decisions:
  - Systems index rewritten from placeholder to real content with table linking both guides
  - Equipment sidebar uses sub-groups (武器/防具/飾品) with collapsed:false per UI-SPEC
metrics:
  duration_seconds: 109
  completed: "2026-04-11"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 4
---

# Phase 03 Plan 03: Systems Guides & Sidebar Navigation Summary

Enhancement/crafting system guides with real game data (refinement 0-10, Abyss Core, 5 crafting types, 355 manuals) and complete sidebar wiring for all Phase 3 pages.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create enhancement and crafting system guide pages with systems index | 52a9d8f | guide/systems/enhancement.md, guide/systems/crafting.md, guide/systems/index.md |
| 2 | Update sidebar configuration for all Phase 3 pages | 57114eb | .vitepress/config.ts |

## Deviations from Plan

None - plan executed exactly as written.

## Key Artifacts

### guide/systems/enhancement.md
- Refinement system levels 0-10, material requirements by equipment type (4 categories)
- Abyss Core socket system with effect types table
- Warning about level 5+ requiring Abyss Artifacts
- Cross-links to equipment pages (Sword of the Lord, Sword of the Wolf)

### guide/systems/crafting.md
- 5 crafting types table (forging, alchemy, cooking, dyeing, enhancement)
- 355 crafting manuals system explained
- Resource gathering guide with 5 resource types
- Info marker for pending recipe data
- Cross-links to enhancement system and equipment pages

### .vitepress/config.ts sidebar updates
- Characters: 3 character pages (Kliff, Damiane, Oongka)
- Equipment: sub-grouped into weapons (2), armor (1), accessories (1) with collapsed:false
- Systems: index + enhancement + crafting

## Known Stubs

| File | Line | Stub | Reason |
|------|------|------|--------|
| guide/systems/crafting.md | ~53 | `:::info 資料待補充` recipe data | Specific crafting recipes not available in research data; intentional marker for future update |

## Verification

- `npm run docs:build` exits 0 with no errors
- All sidebar links resolve to existing pages
- Enhancement guide contains refinement levels, materials, Abyss Core sections
- Crafting guide contains 5 types table and 355 manuals reference
- Cross-links between system and equipment pages present
