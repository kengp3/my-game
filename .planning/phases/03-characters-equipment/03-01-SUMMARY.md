---
phase: 03-characters-equipment
plan: 01
subsystem: characters
tags: [vue-component, character-pages, game-data, vitepress]
dependency_graph:
  requires: [01-01, 01-02]
  provides: [CharacterTemplate.vue, character-pages]
  affects: [guide/characters/*, .vitepress/theme/index.ts]
tech_stack:
  added: []
  patterns: [CharacterTemplate frontmatter schema, character-info-grid 3-col layout, class-type-badge]
key_files:
  created:
    - .vitepress/theme/components/CharacterTemplate.vue
    - guide/characters/kliff.md
    - guide/characters/damiane.md
    - guide/characters/oongka.md
  modified:
    - .vitepress/theme/index.ts
    - guide/characters/index.md
decisions:
  - CharacterTemplate follows BossTemplate pattern with scoped styles and useData/withBase
  - build-name font-size 14px per UI-SPEC 4-tier typography scale
  - Equipment links use withBase() for /my-game/ base path handling
metrics:
  duration_seconds: 154
  completed: 2026-04-10
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 2
---

# Phase 03 Plan 01: Character Template & Pages Summary

CharacterTemplate.vue with 6 sections (header, image, info-grid, skills table, builds with equipment cross-links, slot) plus 3 character pages populated with real Crimson Desert game data from research.

## Task Results

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create CharacterTemplate.vue and register globally | 49ca831 | CharacterTemplate.vue, index.ts |
| 2 | Create 3 character pages and rewrite character index | 7c2a7bb | kliff.md, damiane.md, oongka.md, index.md |

## Deviations from Plan

None - plan executed exactly as written.

## Key Implementation Details

### CharacterTemplate.vue
- 6 sections matching UI-SPEC exactly: header with class-type badge, image/placeholder, 3-column info grid, skills table (5 columns), build recommendation cards with equipment links, markdown slot
- Responsive: info grid collapses to 1 column at 768px
- CSS variables only, no hardcoded colors
- Empty states: "圖片尚未提供" for missing image, "技能資料尚未收集" for no skills, "建構推薦資料尚待整理" for no builds

### Character Pages
- **Kliff (kliff.md):** 6 skills (Armed Combat, Marksmanship, Force Palm, Focus, Pump Kick, Evasive Roll), 6 builds (sword-shield, dual-wield, longsword, spear, unarmed, infinite arrows), equipment links to example-equipment
- **Damiane (damiane.md):** 4 skills (Smiting Strike, Piercing Light, Shield Toss, Holy Explosion), 5 builds (fire gunner, rapier-shield, dual-wield, greatsword, spear)
- **Oongka (oongka.md):** 4 skills (Scatter Shot, Leaping Smash, Slash, Rage), 1 build (dual-wield greataxe/hammer)
- All pages include ::: info blocks for incomplete skill tree data

### Character Index
- Table with all 3 characters: name, weapon types, class role, detail links
- Info block explaining no traditional class system in Crimson Desert
- Replaced placeholder "此內容正在撰寫中" with real content

## Known Stubs

| File | Line | Stub | Reason |
|------|------|------|--------|
| kliff.md | frontmatter | `image: null` | D-09 deferred images to future plan |
| damiane.md | frontmatter | `image: null` | D-09 deferred images to future plan |
| oongka.md | frontmatter | `image: null` | D-09 deferred images to future plan |
| kliff.md | builds | `link: /guide/equipment/example-equipment` | Only example equipment page exists; real equipment pages in Plan 02 |
| damiane.md | builds | `equipmentLinks: []` | Equipment pages not yet created |
| oongka.md | builds | `equipmentLinks: []` | Equipment pages not yet created |

All stubs are intentional: images deferred per D-09, equipment links will be wired when Plan 02 creates equipment pages.

## Verification

- `npm run docs:build` passes with zero errors
- CharacterTemplate renders all 6 sections
- All three character pages use real game data from 03-RESEARCH.md
- Character index links to all three character pages

## Self-Check: PASSED

All 6 files verified present. Both commits (49ca831, 7c2a7bb) verified in git log.
