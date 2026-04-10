---
phase: 03-characters-equipment
reviewed: 2026-04-11T12:00:00Z
depth: standard
files_reviewed: 16
files_reviewed_list:
  - .vitepress/theme/components/CharacterTemplate.vue
  - .vitepress/theme/components/EquipmentTemplate.vue
  - .vitepress/theme/index.ts
  - .vitepress/config.ts
  - guide/characters/kliff.md
  - guide/characters/damiane.md
  - guide/characters/oongka.md
  - guide/characters/index.md
  - guide/equipment/sword-of-the-wolf.md
  - guide/equipment/grey-wolf-leather-armor.md
  - guide/equipment/pailunese-signet.md
  - guide/equipment/example-equipment.md
  - guide/equipment/index.md
  - guide/systems/enhancement.md
  - guide/systems/crafting.md
  - guide/systems/index.md
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 3: Code Review Report

**Reviewed:** 2026-04-11T12:00:00Z
**Depth:** standard
**Files Reviewed:** 16
**Status:** issues_found

## Summary

Phase 3 introduces character pages (Kliff, Damiane, Oongka), equipment pages (4 items across weapons/armor/accessories), system guides (enhancement and crafting), two new Vue template components, and sidebar/nav config updates. The code is well-structured overall -- both Vue components use proper null-coalescing for missing data, VitePress `withBase` for internal links, and consistent styling patterns established in prior phases. Two warnings relate to a missing CSS rarity color and a missing base style for the rarity badge class. Two info items note minor quality concerns.

## Warnings

### WR-01: Missing CSS rule for "獨特" rarity value

**File:** `guide/equipment/example-equipment.md:4` (frontmatter) / `.vitepress/theme/custom.css:42-47`
**Issue:** The equipment page for "主之劍" declares `rarity: 獨特` in its frontmatter. The EquipmentTemplate renders a `<span class="rarity-badge" data-rarity="獨特">` element. However, `.vitepress/theme/custom.css` only defines color rules for 普通, 精良, 稀有, 史詩, and 傳說. The "獨特" rarity has no matching `[data-rarity]` selector, so the badge text will render with the default inherited color instead of a distinct rarity color.
**Fix:** Add a CSS rule for the "獨特" rarity in `.vitepress/theme/custom.css`:
```css
.rarity-badge[data-rarity="獨特"] { color: #e08d3c; }
```

### WR-02: rarity-badge class lacks base display/padding styles

**File:** `.vitepress/theme/custom.css:42-47` / `.vitepress/theme/components/EquipmentTemplate.vue:8-10`
**Issue:** The `.rarity-badge` class in `custom.css` only defines `color` per rarity level but has no base styling (display, padding, border-radius). Compare with `.difficulty-badge` (line 50) which defines `display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 14px; font-weight: 700;` as base styles. In EquipmentTemplate, the scoped `.equipment-rarity` class provides `font-size` and `font-weight`, but BossTemplate (which also uses `rarity-badge`) gets no base styling at all. This means the rarity badge in BossTemplate will lack padding and consistent presentation.
**Fix:** Add base styles for `.rarity-badge` in `custom.css`, analogous to `.difficulty-badge`:
```css
.rarity-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
}
```

## Info

### IN-01: v-for keys may collide if data contains duplicate names

**File:** `.vitepress/theme/components/CharacterTemplate.vue:54` / `.vitepress/theme/components/EquipmentTemplate.vue:37`
**Issue:** Both templates use `:key="skill.name"` and `:key="stat.name"` for `v-for` loops. If frontmatter data ever contains duplicate skill or stat names, Vue will emit a warning and may produce rendering bugs. Currently the data does not contain duplicates, so this is informational only.
**Fix:** Consider using the array index as a composite key: `:key="skill.name + '-' + index"` (adding `(skill, index)` to the v-for).

### IN-02: Sidebar label "麥克道夫（Kliff）" inconsistent with page name "麥克道夫（Kliff Macduff）"

**File:** `.vitepress/config.ts:85` vs `guide/characters/kliff.md:3`
**Issue:** The sidebar entry uses "麥克道夫（Kliff）" but the page frontmatter `name` field is "麥克道夫（Kliff Macduff）". Minor naming inconsistency that could confuse users navigating between sidebar and page header.
**Fix:** Align the sidebar text with the page name, either both "Kliff" or both "Kliff Macduff". Recommend using the full name in the sidebar:
```ts
{ text: '麥克道夫（Kliff Macduff）', link: '/guide/characters/kliff' },
```

---

_Reviewed: 2026-04-11T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
