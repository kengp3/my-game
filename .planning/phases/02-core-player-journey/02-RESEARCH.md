# Phase 02: Core Player Journey - Research

**Researched:** 2026-04-10
**Domain:** VitePress Vue SFC template authoring, Markdown content structure, game wiki UX patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** 戰鬥教學結構 — 分主題拆頁：基礎操作（移動/攻擊/閃避）、連招系統、防禦與格擋、進階技巧。每頁獨立完整，可單獨查閱。使用圖文說明搭配按鍵提示表格。
- **D-02:** 戰鬥教學模板 — 建立新的 Vue SFC 模板（CombatGuideTemplate），支援 frontmatter 欄位：標題、難度、前置知識、按鍵操作表、技巧列表、相關頁面連結。
- **D-03:** 劇情章節格式 — 按遊戲內章節劃分（Chapter 1, 2, 3...），每章包含：劇情摘要（可摺疊防劇透）、推進路線、關鍵戰鬥提示（連結 Boss 頁面）、該章收集品提示。
- **D-04:** 劇情章節模板 — 建立新的 Vue SFC 模板（StoryChapterTemplate），支援 frontmatter 欄位：章節編號、章節名稱、推薦等級、涉及區域、關鍵 Boss 列表、前後章連結。
- **D-05:** 選擇點與分支 — 使用明顯標記的「選擇框」元件呈現，包含各選項與其後果說明。推薦選項以強調色標示。含劇透警告摺疊區塊。
- **D-06:** 章節間導航 — 每章底部設「上一章 / 下一章」導航按鈕，側邊欄按章節順序排列。
- **D-07:** 資料搜集策略 — 以佔位範例資料建立結構與模板，標記為「範例資料」。實際遊戲資料待後續填充。Phase 2 聚焦在結構與模板的建立，而非完整真實資料。
- **D-08:** URL 結構 — 延續 Phase 1 英文 slug 策略：`/guide/beginner/combat-basics`、`/guide/story/chapter-1`。
- **D-09:** 側邊欄更新 — 將新增頁面加入 config.ts 的 sidebar 配置，新手入門增加戰鬥教學子頁，主線劇情增加各章節連結。

### Claude's Discretion

使用者將所有設計決策交由 Claude 決定。以上 D-01 ~ D-09 均為 Claude 提出並鎖定的決策。

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMBAT-01 | 使用者可閱讀戰鬥系統基礎教學（操作、連招、防禦機制） | CombatGuideTemplate Vue SFC + 4 pages under `/guide/beginner/` |
| STORY-01 | 使用者可按章節順序查閱主線劇情流程與推進指引 | StoryChapterTemplate Vue SFC + chapter pages under `/guide/story/` |
| STORY-02 | 每章攻略包含關鍵選擇點說明與建議推進順序 | ChoicePoint component + VitePress `details` container for spoilers |

</phase_requirements>

---

## Summary

Phase 2 builds on the established VitePress 1.6.4 codebase from Phase 1. All foundation work is complete: Vue SFC template pattern (`useData()` + frontmatter), global component registration in `theme/index.ts`, custom CSS variables, and sidebar configuration in `.vitepress/config.ts`. This phase adds two new Vue SFC templates (CombatGuideTemplate, StoryChapterTemplate), a reusable ChoicePoint component, 4 combat tutorial pages, and at least 3 story chapter pages, then updates the sidebar configuration.

The critical technical patterns are already proven in Phase 1. CombatGuideTemplate follows the exact same structure as BossTemplate (frontmatter via `useData()`, scoped CSS using existing CSS variables). StoryChapterTemplate similarly mirrors AreaTemplate. The VitePress built-in `details` container handles collapsible spoilers without any additional packages. Chapter navigation (D-06) can be fully handled via VitePress's built-in prev/next frontmatter fields — no custom nav component is required.

**Primary recommendation:** Reuse the Phase 1 Vue SFC pattern exactly. Create templates first, then placeholder content pages, then update config.ts. All three tasks are independent enough for parallel or wave-based execution.

---

## Standard Stack

### Core (inherited from Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vitepress | 1.6.4 (installed) | Static site generator + Markdown renderer | Already installed; 1.x latest stable [VERIFIED: npm registry] |
| vue | 3.x (bundled with VitePress) | Vue SFC authoring for templates | Bundled — no separate install needed [VERIFIED: local node_modules] |

### Supporting

No new packages required. All Phase 2 functionality is achievable with:
- VitePress built-in `details` container (collapsible blocks) [VERIFIED: vitepress.dev docs]
- VitePress built-in `prev`/`next` frontmatter for chapter navigation [VERIFIED: vitepress.dev docs]
- Existing `custom.css` for styling new components (badge classes already present)

**Installation:** No new `npm install` commands needed for this phase.

**Version verification:** VitePress 1.6.4 installed locally. Latest stable on npm registry is also 1.6.4 as of 2026-04-10. [VERIFIED: npm view vitepress version]

---

## Architecture Patterns

### Recommended File Structure

```
.vitepress/
  theme/
    components/
      CombatGuideTemplate.vue   # NEW: Phase 2
      StoryChapterTemplate.vue  # NEW: Phase 2
      ChoicePoint.vue           # NEW: Phase 2
    index.ts                    # MODIFY: register 3 new components
    custom.css                  # MODIFY: add choice-point + chapter-nav styles
  config.ts                     # MODIFY: expand /guide/beginner/ and /guide/story/ sidebars

guide/
  beginner/
    index.md                    # MODIFY: add overview + links to sub-pages
    combat-basics.md            # NEW: 基礎操作
    combat-combos.md            # NEW: 連招系統
    combat-defense.md           # NEW: 防禦與格擋
  story/
    index.md                    # MODIFY: add chapter overview
    chapter-1.md                # NEW: 第一章攻略
    chapter-2.md                # NEW: 第二章攻略
    chapter-3.md                # NEW: 第三章攻略
```

### Pattern 1: Vue SFC Template (inherited from Phase 1)

**What:** A `.vue` file that reads `frontmatter` via `useData()` and renders structured HTML. The Markdown page uses `<ComponentName />` and `<slot />` receives the Markdown body.

**When to use:** Any content type that has repeated structured fields (level, requirements, boss lists, etc.)

**Example (established pattern from BossTemplate):**
```typescript
// Source: .vitepress/theme/components/BossTemplate.vue (verified in codebase)
<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
</script>
```

**Markdown page usage:**
```markdown
---
layout: doc
chapterNumber: 1
chapterName: 沙漠覺醒
recommendedLevel: 1-10
prevChapter: false
nextChapter:
  text: 第二章：赤血試煉
  link: /guide/story/chapter-2
---

<StoryChapterTemplate />

## 推進路線
...
```

### Pattern 2: VitePress `details` Container (collapsible spoilers)

**What:** Built-in VitePress Markdown syntax for collapsible blocks. Renders as native `<details>/<summary>` HTML — no Vue component needed.

**When to use:** Spoiler warnings,劇情摘要防劇透, 選擇點後果說明.

**Example:**
```markdown
::: details 劇情摘要（點擊展開，含劇透）
第一章講述主角在赤血沙漠邊緣的小村莊甦醒，失去所有記憶...
:::
```
[VERIFIED: vitepress.dev/guide/markdown — details container is a built-in container type in VitePress 1.x]

### Pattern 3: Prev/Next Chapter Navigation via Frontmatter

**What:** VitePress auto-generates prev/next links from sidebar order. Can be overridden per-page via frontmatter.

**When to use:** Chapter-to-chapter navigation (D-06). Sidebar order drives automatic nav; frontmatter `prev`/`next` allow custom labels.

**Example:**
```markdown
---
prev:
  text: 第一章：沙漠覺醒
  link: /guide/story/chapter-1
next:
  text: 第三章：赤血試煉
  link: /guide/story/chapter-3
---
```
[VERIFIED: vitepress.dev/reference/default-theme-prev-next-links]

If sidebar is ordered correctly, `prev`/`next` frontmatter is optional — VitePress infers from sidebar order automatically.

### Pattern 4: ChoicePoint Component (D-05)

**What:** A Vue SFC component accepting props for choices array. Rendered inline in Markdown via `<ChoicePoint />` tag. Uses VitePress's `withBase()` for links.

**Design:** Since it appears inline in Markdown (not a page template), it should accept props directly rather than reading from frontmatter. This differs slightly from the BossTemplate pattern.

```typescript
// Proposed interface (ASSUMED — no exact prior art in codebase)
interface Choice {
  text: string
  consequence: string
  recommended?: boolean
  link?: string
}
// Props: choices: Choice[], title?: string
```

**Spoiler wrapping:** Use a local `ref(false)` toggle or the native `<details>` pattern in the template to show/hide consequences.

### Anti-Patterns to Avoid

- **Don't use `<details>` HTML directly in Markdown** — use the VitePress `:::details` container syntax for consistency and styling
- **Don't register components locally** — all new templates must be globally registered in `theme/index.ts` following the established pattern
- **Don't use Chinese characters in URLs** — D-08 locks English slugs; chapter pages are `chapter-1.md` not `第一章.md`
- **Don't add prev/next nav as custom HTML** — VitePress handles this via frontmatter and sidebar config (D-06 is handled by framework, not custom code)
- **Don't populate real game data** — D-07 explicitly requires placeholder data only; content pages should be clearly labeled as example data

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Collapsible spoiler blocks | Custom accordion Vue component | VitePress `:::details` container | Built-in, styled by VitePress, zero JS bundle cost |
| Chapter prev/next buttons | Custom navigation Vue component | VitePress frontmatter `prev`/`next` + sidebar order | Framework handles rendering; already styled by DefaultTheme |
| Keyboard shortcut tables | Custom table component | Standard Markdown tables | VitePress renders tables with hover styles already (vp-doc table) |
| Difficulty/category badges | New CSS classes | Extend existing `.difficulty-badge` from custom.css | `.difficulty-badge[data-level]` already defined in custom.css |

**Key insight:** VitePress 1.x provides collapsible containers, automatic prev/next navigation, and styled tables natively. The primary work of this phase is component template authoring and content page creation — not infrastructure.

---

## Common Pitfalls

### Pitfall 1: Forgetting to register new components globally

**What goes wrong:** Vue component renders as unknown element in Markdown; VitePress silently ignores it and shows nothing.

**Why it happens:** VitePress Markdown pages can only use globally-registered components. Local imports in `.vue` files don't propagate to `.md` files.

**How to avoid:** Always add new SFC components to the `enhanceApp()` block in `.vitepress/theme/index.ts`. The pattern is already established: `app.component('CombatGuideTemplate', CombatGuideTemplate)`.

**Warning signs:** Component tag appears as literal text or the page renders blank where the component should be.

### Pitfall 2: `withBase()` omitted for internal links

**What goes wrong:** Links work locally but break on GitHub Pages due to the `/my-game/` base path.

**Why it happens:** VitePress is configured with `base: '/my-game/'`. Relative links without `withBase()` resolve to `/` on production.

**How to avoid:** Any link generated programmatically in a Vue template must use `withBase()`. This is consistently applied in BossTemplate, EquipmentTemplate, and AreaTemplate — follow the same pattern.

**Warning signs:** Works on `localhost:5173` but 404s on GitHub Pages deployment.

### Pitfall 3: `layout: doc` missing from frontmatter

**What goes wrong:** Page renders without the standard sidebar, nav, and footer.

**Why it happens:** VitePress infers layout from frontmatter; the default for `.md` files is `doc`, but it's best practice to be explicit (Phase 1 sets it explicitly on all example pages).

**How to avoid:** Include `layout: doc` in all new Markdown page frontmatter.

### Pitfall 4: Sidebar not updated after adding new pages

**What goes wrong:** New pages exist but don't appear in the sidebar nav; users can only reach them via direct URL.

**Why it happens:** VitePress does NOT auto-discover pages from the filesystem. Sidebar items must be explicitly declared in `config.ts`.

**How to avoid:** D-09 locks this — update `.vitepress/config.ts` sidebar config as part of the same task that creates content pages. This is a single atomic config change.

### Pitfall 5: ChoicePoint component used as page template vs. inline component

**What goes wrong:** ChoicePoint is placed as `<ChoicePoint />` at top of page without considering that it receives props, not frontmatter. If implemented like BossTemplate (reading `useData().frontmatter`), there's no natural place to pass multiple choices per page.

**Why it happens:** Confusing the two patterns — page templates (BossTemplate) read from frontmatter; inline components (ChoicePoint) should receive props from the Markdown author.

**How to avoid:** Implement ChoicePoint as a props-accepting component. In Markdown, pass data via Vue template syntax or embed the component call with an explicit data structure. Alternatively, accept a `choices` prop as a JSON-serializable string and parse it in the component.

**Simplest viable approach:** Accept a YAML frontmatter key `choices` on the StoryChapterTemplate and have it render the ChoicePoint UI inline within the template — eliminating the need for a separate inline component call in Markdown body.

---

## Code Examples

Verified patterns from the existing codebase:

### Component Registration (theme/index.ts)
```typescript
// Source: .vitepress/theme/index.ts (verified in codebase)
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CombatGuideTemplate from './components/CombatGuideTemplate.vue'
import StoryChapterTemplate from './components/StoryChapterTemplate.vue'
import ChoicePoint from './components/ChoicePoint.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // ... existing registrations ...
    app.component('CombatGuideTemplate', CombatGuideTemplate)
    app.component('StoryChapterTemplate', StoryChapterTemplate)
    app.component('ChoicePoint', ChoicePoint)
  }
} satisfies Theme
```

### CombatGuideTemplate frontmatter schema (proposed)
```yaml
---
layout: doc
title: 基礎操作教學
difficulty: 初階
prerequisites:          # list of strings
  - 無前置知識
keybindings:            # list of {action, key, note}
  - action: 普通攻擊
    key: 滑鼠左鍵 / 方形鍵
    note: 連按可觸發連招
tips:                   # list of strings
  - 閃避有無敵幀，善用以規避大招
relatedPages:           # list of {text, link}
  - text: 連招系統
    link: /guide/beginner/combat-combos
---

<CombatGuideTemplate />

## 詳細說明（範例資料）
...
```

### StoryChapterTemplate frontmatter schema (proposed)
```yaml
---
layout: doc
title: 第一章：沙漠覺醒
chapterNumber: 1
chapterName: 沙漠覺醒
recommendedLevel: '1–10'
areas:                  # list of strings
  - 赤血沙漠邊境
  - 落日村莊
bosses:                 # list of {name, link}
  - name: 沙漠守衛隊長
    link: /guide/bosses/example-boss
choices:                # list of {title, options: [{text, consequence, recommended}]}
  - title: 選擇加入哪個派系
    options:
      - text: 加入流沙商隊
        consequence: 解鎖商人交易折扣，但失去沙漠遊俠支援
        recommended: true
      - text: 加入沙漠遊俠
        consequence: 獲得額外戰鬥技能，但商品價格上漲20%
        recommended: false
prev: false             # false = 隱藏；或 {text, link}
next:
  text: 第二章：赤血試煉
  link: /guide/story/chapter-2
---

<StoryChapterTemplate />

## 主線推進步驟（範例資料）
...
```

### VitePress `details` container for spoilers
```markdown
<!-- Source: vitepress.dev/guide/markdown — built-in container type -->
::: details 劇情摘要（點擊展開，含劇透）
主角在沙漠邊境的廢棄神殿中甦醒，身上只剩一把生鏽的短刀...
:::
```

### Sidebar config update pattern (config.ts)
```typescript
// Source: .vitepress/config.ts (verified in codebase) — extend existing structure
'/guide/beginner/': [
  {
    text: '新手入門',
    items: [
      { text: '新手指南', link: '/guide/beginner/' },
      {
        text: '戰鬥教學',
        items: [
          { text: '基礎操作', link: '/guide/beginner/combat-basics' },
          { text: '連招系統', link: '/guide/beginner/combat-combos' },
          { text: '防禦與格擋', link: '/guide/beginner/combat-defense' },
        ]
      }
    ]
  }
],
'/guide/story/': [
  {
    text: '主線劇情',
    items: [
      { text: '主線總覽', link: '/guide/story/' },
      { text: '第一章：沙漠覺醒', link: '/guide/story/chapter-1' },
      { text: '第二章：赤血試煉', link: '/guide/story/chapter-2' },
      { text: '第三章：沙漠之心', link: '/guide/story/chapter-3' },
    ]
  }
],
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate spoiler library (vue-spoiler etc.) | VitePress built-in `:::details` container | VitePress 1.x | Zero dependency, fully supported |
| Manual prev/next link HTML | VitePress frontmatter `prev`/`next` keys | VitePress 1.x | Framework handles rendering |
| Separate i18n packages for CJK | VitePress built-in `lang: 'zh-Hant'` config | VitePress 1.x | No extra config needed |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | ChoicePoint is best implemented as a prop-accepting component, with choices data embedded in StoryChapterTemplate frontmatter | Architecture Patterns — Pattern 4 | Low risk: alternative is inline Markdown + separate ChoicePoint call; either works |
| A2 | Phase 2 will create 3 combat pages + 3 story chapters as minimum viable content (to satisfy requirements with placeholder data) | Architecture Patterns — file structure | Low risk: count is adjustable; D-07 confirms placeholder data is acceptable |

**All other claims are VERIFIED against the local codebase or CITED from vitepress.dev.**

---

## Open Questions

1. **ChoicePoint rendering approach**
   - What we know: D-05 requires a "choice box" component with options, consequences, and a collapsible spoiler area
   - What's unclear: Whether choices data should live in frontmatter (parsed by StoryChapterTemplate) or be called inline in the Markdown body as `<ChoicePoint :choices="[...]" />`
   - Recommendation: Keep choices in frontmatter for consistency with the established template pattern. StoryChapterTemplate renders ChoicePoint internally. This avoids requiring content authors to write Vue template syntax in Markdown.

2. **Number of example chapters to create**
   - What we know: D-07 says Phase 2 focuses on structure/templates, not real data
   - What's unclear: Whether 1, 2, or 3 example chapters best demonstrates the chapter navigation (prev/next) UX
   - Recommendation: Create 3 chapters minimum — this demonstrates working prev/next navigation for both the middle chapter (has both prev and next) and validates the sidebar ordering. 3 chapters is the minimum to show a real navigation sequence.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | VitePress dev server | ✓ | (system installed) | — |
| npm | Package management | ✓ | (system installed) | — |
| VitePress 1.6.4 | All content pages | ✓ | 1.6.4 (local node_modules) | — |
| Vue 3 | Vue SFC authoring | ✓ | bundled with VitePress | — |

No missing dependencies. Phase 2 requires no new package installations.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | VitePress build + manual browser check |
| Config file | `.vitepress/config.ts` |
| Quick run command | `npm run docs:dev` |
| Full suite command | `npm run docs:build` |

No automated test framework (vitest/jest) is configured for this project. Validation is build-based: `npm run docs:build` fails on broken imports, unregistered components, or config syntax errors.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMBAT-01 | 戰鬥教學頁面可瀏覽，顯示操作/連招/防禦內容 | smoke (build) | `npm run docs:build` | ❌ Wave 0 |
| STORY-01 | 章節頁面按順序可瀏覽，side nav 顯示 1-2-3 | smoke (build) | `npm run docs:build` | ❌ Wave 0 |
| STORY-02 | 每章包含選擇點元件，含可摺疊後果說明 | manual | open localhost, verify details expand | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run docs:build` — verifies no build errors
- **Per wave merge:** `npm run docs:build` + manual browser check of new pages
- **Phase gate:** Full build green + manual verification of all 3 requirements before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `guide/beginner/combat-basics.md` — covers COMBAT-01 (basic operation)
- [ ] `guide/beginner/combat-combos.md` — covers COMBAT-01 (combo system)
- [ ] `guide/beginner/combat-defense.md` — covers COMBAT-01 (defense mechanics)
- [ ] `guide/story/chapter-1.md` — covers STORY-01, STORY-02
- [ ] `guide/story/chapter-2.md` — covers STORY-01 (mid-chapter nav)
- [ ] `guide/story/chapter-3.md` — covers STORY-01 (end-chapter nav)
- [ ] `.vitepress/theme/components/CombatGuideTemplate.vue` — required for COMBAT-01 pages
- [ ] `.vitepress/theme/components/StoryChapterTemplate.vue` — required for STORY-01/02 pages
- [ ] `.vitepress/theme/components/ChoicePoint.vue` — required for STORY-02

---

## Security Domain

This phase produces static HTML/CSS/JS with no user input, authentication, or server-side logic. No ASVS categories apply. Content pages contain placeholder game guide data only.

---

## Sources

### Primary (HIGH confidence)
- Local codebase inspection — `.vitepress/theme/components/BossTemplate.vue`, `EquipmentTemplate.vue`, `AreaTemplate.vue`, `theme/index.ts`, `config.ts`, `custom.css` — verified patterns for Vue SFC template, component registration, sidebar config, CSS variable usage
- `node_modules/vitepress` — version 1.6.4 confirmed installed
- npm registry — `npm view vitepress version` → 1.6.4 (current stable)

### Secondary (MEDIUM confidence)
- [vitepress.dev/guide/markdown](https://vitepress.dev/guide/markdown) — verified `:::details` container is built-in
- [vitepress.dev/reference/default-theme-prev-next-links](https://vitepress.dev/reference/default-theme-prev-next-links) — verified `prev`/`next` frontmatter field syntax

### Tertiary (LOW confidence)
- None — all claims verified against codebase or official docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — installed version verified locally and on npm
- Architecture: HIGH — patterns verified against existing Phase 1 codebase (3 templates already working)
- Pitfalls: HIGH — derived from direct inspection of existing code and VitePress documented behavior
- VitePress details container: HIGH — cited from official vitepress.dev docs
- Prev/next navigation: HIGH — cited from official vitepress.dev docs

**Research date:** 2026-04-10
**Valid until:** 2026-05-10 (stable library; VitePress 1.x is mature)
