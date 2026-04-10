---
phase: 03-characters-equipment
plan: 02
subsystem: equipment
tags: [equipment, templates, cross-links, content]
dependency_graph:
  requires: [EquipmentTemplate.vue, example-equipment.md, example-boss.md]
  provides: [equipment-catalog, equipment-cross-links, equipment-index]
  affects: [guide/equipment/*, .vitepress/theme/components/EquipmentTemplate.vue]
tech_stack:
  added: []
  patterns: [characterLink cross-referencing in build cards, v-if guard for backward compatibility]
key_files:
  created:
    - guide/equipment/sword-of-the-wolf.md
    - guide/equipment/grey-wolf-leather-armor.md
    - guide/equipment/pailunese-signet.md
  modified:
    - .vitepress/theme/components/EquipmentTemplate.vue
    - guide/equipment/example-equipment.md
    - guide/equipment/index.md
decisions:
  - "characterLink uses v-if guard for backward compatibility with existing equipment pages"
  - "Equipment index categorized by weapon/armor/accessory per D-05 design"
metrics:
  duration_seconds: 93
  completed: "2026-04-11T03:07:58Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 6
---

# Phase 03 Plan 02: Equipment Pages and Index Summary

EquipmentTemplate updated with characterLink cross-referencing and 14px typography fix; 3 new equipment pages (weapon/armor/accessory) created with real game data; equipment index rewritten with category sections.

## Task Results

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update EquipmentTemplate.vue with characterLink and typography fix | 4a1613e | .vitepress/theme/components/EquipmentTemplate.vue |
| 2 | Create equipment pages and rewrite equipment index | cb9ede0 | guide/equipment/example-equipment.md, sword-of-the-wolf.md, grey-wolf-leather-armor.md, pailunese-signet.md, index.md |

## Key Changes

- **EquipmentTemplate.vue**: Fixed `.build-name` font-size from 15px to 14px per UI-SPEC. Added `build.characterLink` support with `v-if` guard and `withBase()` rendering a "查看適用職業" link. Added `.build-character-link` scoped CSS.
- **example-equipment.md**: Added `characterLink: /guide/characters/kliff` to both existing builds. File path preserved (no rename) to maintain boss page cross-link.
- **sword-of-the-wolf.md**: New weapon page for Kliff's starting sword with source link to character page.
- **grey-wolf-leather-armor.md**: New armor page with crafting source link to `/guide/systems/crafting`.
- **pailunese-signet.md**: New accessory page with ATK +2 and CRIT Lv.1 stats.
- **equipment/index.md**: Rewritten from placeholder to categorized index with weapon/armor/accessory tables and links.

## Decisions Made

1. **characterLink backward compatibility**: Uses `v-if="build.characterLink"` guard so existing equipment pages without characterLink render unchanged.
2. **Equipment index categorization**: Three sections (武器/防具/飾品) per D-05 design specification with table format for quick scanning.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

| File | Line | Stub | Reason |
|------|------|------|--------|
| guide/equipment/sword-of-the-wolf.md | stats | 攻擊力: 資料待確認 | Game data not publicly available for exact stat values |
| guide/equipment/grey-wolf-leather-armor.md | stats | 防禦力: 資料待確認 | Game data not publicly available for exact stat values |

These stubs are intentional placeholders for numeric game data that is not yet available in public sources. They do not prevent the plan's goal (browsable equipment catalog with cross-links) from being achieved.

## Verification

- `npm run docs:build` exits 0 (confirmed both tasks)
- Equipment index has three category sections (武器, 防具, 飾品)
- Equipment pages have source cross-links to boss/character/system pages
- EquipmentTemplate build cards show "查看適用職業" link when characterLink is present
- Existing boss page drops link to example-equipment still works (file not renamed)

## Self-Check: PASSED
