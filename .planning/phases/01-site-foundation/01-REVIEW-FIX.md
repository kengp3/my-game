---
phase: 01-site-foundation
fixed_at: 2026-04-10T00:00:00Z
review_path: .planning/phases/01-site-foundation/01-REVIEW.md
iteration: 1
findings_in_scope: 4
fixed: 4
skipped: 0
status: all_fixed
---

# Phase 01: Code Review Fix Report

**Fixed at:** 2026-04-10T00:00:00Z
**Source review:** .planning/phases/01-site-foundation/01-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 4 (Warnings only; 4 Info findings excluded per fix_scope)
- Fixed: 4
- Skipped: 0

## Fixed Issues

### WR-01: Hero CTA "開始閱讀攻略" Links to Non-Existent Page

**Files modified:** `index.md`
**Commit:** b96cdd9
**Applied fix:** Changed `link: /guide/beginner/introduction` to `link: /guide/beginner/` in the hero actions frontmatter, matching the actual file at `guide/beginner/index.md`.

---

### WR-02: Frontmatter `href` Values Ignore the VitePress `base` Path

**Files modified:** `.vitepress/theme/components/BossTemplate.vue`, `.vitepress/theme/components/AreaTemplate.vue`, `.vitepress/theme/components/EquipmentTemplate.vue`
**Commit:** 6119547
**Applied fix:** Added `withBase` to the import from `'vitepress'` in all three components and wrapped every raw `:href` binding with `withBase(...)`:
- BossTemplate.vue: `frontmatter.areaLink` and `drop.link`
- AreaTemplate.vue: `enemy.link` and `quest.link`
- EquipmentTemplate.vue: `source.link`

---

### WR-03: Missing Null Guard on `<h1>` in All Three Templates

**Files modified:** `.vitepress/theme/components/BossTemplate.vue`, `.vitepress/theme/components/AreaTemplate.vue`, `.vitepress/theme/components/EquipmentTemplate.vue`
**Commit:** 934c07e
**Applied fix:** Changed `{{ frontmatter.name }}` to `{{ frontmatter.name ?? '（未命名）' }}` in the `<h1>` of all three templates, providing a visible Chinese placeholder when `name` is absent from frontmatter.

---

### WR-04: Image `alt` Attribute Will Be `null` When `frontmatter.name` Is Absent

**Files modified:** `.vitepress/theme/components/BossTemplate.vue`, `.vitepress/theme/components/EquipmentTemplate.vue`
**Commit:** a45f75a
**Applied fix:** Changed `:alt="frontmatter.name"` to `:alt="frontmatter.name ?? ''"` in both BossTemplate.vue and EquipmentTemplate.vue, ensuring the `alt` attribute is an empty string (valid for decorative images) rather than `"null"` or `undefined` when `name` is not defined.

---

_Fixed: 2026-04-10T00:00:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
