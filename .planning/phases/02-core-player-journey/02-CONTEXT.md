# Phase 2: Core Player Journey - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

建立赤血沙漠攻略 Wiki 的核心玩家旅程內容：戰鬥系統基礎教學（操作、連招、防禦機制）與主線劇情章節攻略（按章節順序的流程指引、關鍵選擇點說明）。

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

使用者將所有設計決策交由 Claude 決定。以下為各領域的規劃方向：

- **D-01:** 戰鬥教學結構 — 分主題拆頁：基礎操作（移動/攻擊/閃避）、連招系統、防禦與格擋、進階技巧。每頁獨立完整，可單獨查閱。使用圖文說明搭配按鍵提示表格。
- **D-02:** 戰鬥教學模板 — 建立新的 Vue SFC 模板（CombatGuideTemplate），支援 frontmatter 欄位：標題、難度、前置知識、按鍵操作表、技巧列表、相關頁面連結。
- **D-03:** 劇情章節格式 — 按遊戲內章節劃分（Chapter 1, 2, 3...），每章包含：劇情摘要（可摺疊防劇透）、推進路線、關鍵戰鬥提示（連結 Boss 頁面）、該章收集品提示。
- **D-04:** 劇情章節模板 — 建立新的 Vue SFC 模板（StoryChapterTemplate），支援 frontmatter 欄位：章節編號、章節名稱、推薦等級、涉及區域、關鍵 Boss 列表、前後章連結。
- **D-05:** 選擇點與分支 — 使用明顯標記的「選擇框」元件呈現，包含各選項與其後果說明。推薦選項以強調色標示。含劇透警告摺疊區塊。
- **D-06:** 章節間導航 — 每章底部設「上一章 / 下一章」導航按鈕，側邊欄按章節順序排列。
- **D-07:** 資料搜集策略 — 以佔位範例資料建立結構與模板，標記為「範例資料」。實際遊戲資料待後續填充。Phase 2 聚焦在結構與模板的建立，而非完整真實資料。
- **D-08:** URL 結構 — 延續 Phase 1 英文 slug 策略：`/guide/beginner/combat-basics`、`/guide/story/chapter-1`。
- **D-09:** 側邊欄更新 — 將新增頁面加入 config.ts 的 sidebar 配置，新手入門增加戰鬥教學子頁，主線劇情增加各章節連結。

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above.

### Project Context
- `.planning/PROJECT.md` — Project vision and core value
- `.planning/REQUIREMENTS.md` — COMBAT-01, STORY-01, STORY-02 requirements
- `.planning/phases/01-site-foundation/01-CONTEXT.md` — Phase 1 design decisions (D-01~D-09)

### Existing Templates (from Phase 1)
- `.vitepress/theme/components/BossTemplate.vue` — Reference for Vue SFC template pattern
- `.vitepress/theme/components/EquipmentTemplate.vue` — Reference for frontmatter-driven layout
- `.vitepress/theme/components/AreaTemplate.vue` — Reference for responsive grid patterns
- `.vitepress/theme/index.ts` — Global component registration pattern
- `.vitepress/config.ts` — Nav/sidebar configuration pattern

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- BossTemplate/EquipmentTemplate/AreaTemplate Vue SFC — 可參考 useData() + frontmatter 模式建立新模板
- custom.css — 已有 difficulty-badge、rarity-badge 樣式，可擴展用於戰鬥教學難度標記
- withBase() 已在所有模板中使用 — 新模板需遵循相同連結模式

### Established Patterns
- Vue SFC 模板使用 `useData()` 讀取 frontmatter
- 全域元件透過 `app.component()` 在 theme/index.ts 註冊
- Markdown 頁面使用 frontmatter + `<ComponentName />` 模式
- 英文 URL slug、繁中內容

### Integration Points
- `.vitepress/config.ts` sidebar — 需新增 `/guide/beginner/` 戰鬥教學子頁和 `/guide/story/` 章節連結
- `.vitepress/theme/index.ts` — 需註冊新的 CombatGuideTemplate 和 StoryChapterTemplate
- `guide/beginner/` — 已有佔位頁，需新增戰鬥教學內容頁面
- `guide/story/` — 已有佔位頁，需新增各章節攻略頁面

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User gave full design discretion to Claude.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-player-journey*
*Context gathered: 2026-04-10*
