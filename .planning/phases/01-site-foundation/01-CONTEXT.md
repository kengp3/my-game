# Phase 1: Site Foundation - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

建立赤血沙漠攻略 Wiki 的 VitePress 站台骨架，包含：主題配色與視覺風格、內容模板系統（Boss/裝備/區域）、導航架構、中文全文搜尋、響應式設計、以及 GitHub Pages 自動部署流程。

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

使用者將所有設計決策交由 Claude 決定。以下為各領域的規劃方向：

- **D-01:** 視覺風格 — 採用暗色系遊戲風格主題，搭配沙漠紅/金色系強調色，符合「赤血沙漠」遊戲氛圍。使用 VitePress 預設暗色模式，同時支援亮色模式切換。
- **D-02:** 字型 — 使用系統預設繁體中文字型（Noto Sans TC 作為 fallback），英文使用 Inter 或系統 sans-serif。
- **D-03:** Boss 模板 — 包含：名稱、圖片、等級/難度、弱點屬性、攻擊模式表格、推薦裝備、推薦策略、掉落物品列表（連結至裝備頁）、所在區域（連結至地圖頁）。
- **D-04:** 裝備模板 — 包含：名稱、圖片、稀有度、屬性數值表格、取得方式（Boss掉落/商店/製作）、強化路線、適用建構推薦。
- **D-05:** 區域模板 — 包含：名稱、描述、等級範圍、敵人列表、NPC 列表、寶箱位置、隱藏區域、相關任務列表。
- **D-06:** 導航架構 — 頂部導航：首頁 | 新手入門 | 主線劇情 | Boss攻略 | 角色職業 | 裝備圖鑑 | 地圖探索 | 系統機制。每個分類有獨立側邊欄，自動從目錄結構生成。
- **D-07:** URL 策略 — 使用英文 slug（如 `/bosses/desert-king`），避免中文 URL 編碼問題。
- **D-08:** 部署 — GitHub Pages + GitHub Actions 自動建置，推送 main 分支即部署。暫不使用自訂網域。
- **D-09:** 搜尋 — 使用 VitePress 內建 MiniSearch，測試中文分詞效果。如不理想再評估 Algolia DocSearch。

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above.

### Project Context
- `.planning/PROJECT.md` — Project vision and core value
- `.planning/REQUIREMENTS.md` — SITE-01 through SITE-05 requirements
- `.planning/research/STACK.md` — VitePress stack recommendation and rationale
- `.planning/research/ARCHITECTURE.md` — Content taxonomy and file structure design
- `.planning/research/FEATURES.md` — Table stakes features for game wikis

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — patterns will be established in this phase

### Integration Points
- VitePress config (`/.vitepress/config.ts`) — central site configuration
- Content templates will be reusable Vue components or Markdown frontmatter schemas
- GitHub Actions workflow (`.github/workflows/deploy.yml`) — CI/CD pipeline

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

*Phase: 01-site-foundation*
*Context gathered: 2026-04-10*
