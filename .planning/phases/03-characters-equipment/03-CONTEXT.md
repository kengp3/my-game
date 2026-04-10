# Phase 3: Characters & Equipment - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

建立赤血沙漠攻略 Wiki 的角色/職業介紹頁面與完整裝備圖鑑，包含：角色模板（CharacterTemplate）、技能列表、建構推薦、裝備分類索引、強化與製作系統指南頁面。所有內容使用真實遊戲資料填充（延續 Phase 2.1 模式）。

</domain>

<decisions>
## Implementation Decisions

### 角色頁面設計
- **D-01:** 每個角色/職業一個完整頁面 — 建立新的 CharacterTemplate.vue，包含介紹、技能、建構推薦等所有資訊
- **D-02:** 技能呈現使用表格式技能列表 — 每個技能一行，顯示名稱/等級/效果/冷卻等欄位
- **D-03:** 建構推薦使用卡片式呈現 — 每個建構一張卡片，含名稱/說明/推薦裝備連結/技能配置。風格與 EquipmentTemplate 的 builds 區塊一致

### 裝備圖鑑規模
- **D-04:** 每件裝備獨立頁面 — 沿用現有 EquipmentTemplate.vue，每件裝備一個 Markdown 頁面
- **D-05:** 裝備索引頁按武器/防具/飾品分類 — 裝備圖鑑首頁分區索引，側邊欄同步分類結構

### 製作/強化系統
- **D-06:** 建立獨立系統指南頁面 — 在 guide/systems/ 下建立強化系統和製作系統專頁，完整說明流程。裝備頁面連結到系統指南頁（符合 CHAR-03 要求）

### 資料搜集策略
- **D-07:** 直接搜集真實資料 — 延續 Phase 2.1 模式，建立模板同時搜集真實遊戲資料填充，避免佔位內容再替換的重工
- **D-08:** 缺失資料使用 `::: info 資料待補充` 標記 — 與 Phase 2.1 一致

### 圖片
- **D-09:** ~~從網路搜集角色與裝備圖片~~ — **DEFERRED**: 圖片搜集延後處理，Phase 3 先以 image: null + 佔位文字上線

### Claude's Discretion
- CharacterTemplate.vue 的具體 frontmatter 欄位設計
- 裝備分類的具體子分類（如武器下的劍/弓/法杖等）
- 系統指南頁面的具體結構和模板
- 搜集工具和搜尋策略的選擇
- 圖片儲存路徑和命名規則

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 現有模板（Phase 1 建立）
- `.vitepress/theme/components/EquipmentTemplate.vue` — 裝備頁面模板，已有 stats/sources/enhancement/builds 區塊，Phase 3 直接沿用
- `.vitepress/theme/components/BossTemplate.vue` — Boss 模板，CharacterTemplate 可參考其結構模式
- `.vitepress/theme/index.ts` — 全域元件註冊，需新增 CharacterTemplate

### 現有內容（Phase 1-2 建立）
- `guide/characters/index.md` — 角色職業索引頁（目前為佔位）
- `guide/equipment/index.md` — 裝備圖鑑索引頁（目前為佔位）
- `guide/equipment/example-equipment.md` — 裝備範例頁（需替換為真實裝備）
- `guide/systems/index.md` — 系統機制索引頁
- `.vitepress/config.ts` — 導航與側邊欄配置

### 先前 Context
- `.planning/phases/01-site-foundation/01-CONTEXT.md` — Phase 1 設計決策（URL slug 策略、模板設計、視覺風格）
- `.planning/phases/02-core-player-journey/02-CONTEXT.md` — Phase 2 設計決策（Vue SFC 模板模式）
- `.planning/phases/02.1-real-game-data-research/02.1-CONTEXT.md` — Phase 2.1 資料搜集策略（多來源交叉比對、`::: info 資料待補充` 標記）

### 需求文件
- `.planning/REQUIREMENTS.md` — CHAR-01, CHAR-02, CHAR-03, CHAR-04 requirements

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `EquipmentTemplate.vue` — 直接沿用於裝備頁面，已有完整 stats/sources/enhancement/builds 區塊
- `BossTemplate.vue` — CharacterTemplate 可參考其 useData() + frontmatter 模式
- `CombatGuideTemplate.vue` / `StoryChapterTemplate.vue` — 確認 Vue SFC 模板的標準模式
- `custom.css` — 已有 rarity-badge、difficulty-badge 樣式，可擴展用於角色/裝備分類標記

### Established Patterns
- Vue SFC 模板使用 `useData()` 讀取 frontmatter
- 全域元件透過 `app.component()` 在 `theme/index.ts` 註冊
- Markdown 頁面使用 frontmatter + `<ComponentName />` 模式
- 英文 URL slug、繁中內容
- `withBase()` 處理所有內部連結
- `::: info 資料待補充` 標記缺失資料

### Integration Points
- `.vitepress/config.ts` sidebar — 需新增角色職業和裝備圖鑑的側邊欄配置
- `.vitepress/theme/index.ts` — 需註冊新的 CharacterTemplate
- `guide/characters/` — 需建立各角色頁面
- `guide/equipment/` — 需建立各裝備頁面（替換 example-equipment）
- `guide/systems/` — 需建立強化與製作系統指南

</code_context>

<specifics>
## Specific Ideas

- ~~角色與裝備頁面必須附上圖片（從網路搜集），不使用純文字佔位~~ — DEFERRED to follow-up phase
- 建構推薦卡片需包含推薦裝備連結，實現角色頁↔裝備頁的交叉連結（符合 CHAR-04 要求）

</specifics>

<deferred>
## Deferred Ideas

- **D-09 圖片搜集**: 從網路搜集角色與裝備圖片存到 repo — 延後處理，Phase 3 以 image: null 佔位先行上線

</deferred>

---

*Phase: 03-characters-equipment*
*Context gathered: 2026-04-11*
