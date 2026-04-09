<!-- GSD:project-start source:PROJECT.md -->
## Project

**赤血沙漠 攻略 Wiki**

為現成遊戲「赤血沙漠」製作的完整攻略 Wiki，透過網路資料搜集整理，涵蓋遊戲所有主要面向。內容以網站/Wiki 格式呈現，供玩家查閱主線劇情、戰鬥策略、角色裝備建構及地圖探索等資訊。

**Core Value:** 提供玩家一站式完整攻略，讓任何進度的玩家都能找到所需資訊順利通關。

### Constraints

- **資料來源**: 依賴公開網路資訊 — 資料完整性取決於網路上現有內容
- **語言**: 繁體中文 — 面向繁中玩家社群
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Static Site Generator: VitePress
- **Version**: 1.x (latest stable)
- **Why**: Vue 3 驅動、Markdown-first、內建搜尋、優秀的 i18n/CJK 支援、極快的 HMR 開發體驗
- **Confidence**: High
### Content Format: Markdown (MDX-compatible)
- **Why**: 易於維護、版本控制友好、可嵌入 Vue 元件做互動內容
- **Confidence**: High
### Search: VitePress 內建 MiniSearch
- **Why**: 零配置、支援中文分詞、不需要外部服務
- **Alternative**: Algolia DocSearch (免費開源方案，更強大但需要設定)
- **Confidence**: High
### Hosting: GitHub Pages / Netlify
- **Why**: 免費、自動部署、SSL、CDN
- **GitHub Pages**: 最簡單，搭配 GitHub Actions 自動建置
- **Netlify**: 更多功能（表單、重導向、預覽部署）
- **Confidence**: High
### Version Control: Git + GitHub
- **Why**: 標準做法、免費、社群協作友好
- **Confidence**: High
## Alternatives Considered
| Tool | Pros | Cons | Verdict |
|------|------|------|---------|
| Docusaurus | React 生態系、成熟 | 較重、CJK 搜尋需額外配置 | Acceptable alternative |
| MkDocs + Material | Python 生態、美觀主題 | Vue 擴展性差、互動元件困難 | Not recommended |
| Wiki.js | 全功能 Wiki | 需要伺服器、過度複雜 | Not recommended |
| MediaWiki | 維基百科同款 | 需要 PHP/MySQL 伺服器、維護成本高 | Not recommended |
| Hugo | 極快建置速度 | Go template 語法學習曲線、CJK 支援一般 | Not recommended |
## What NOT to Use
- **WordPress**: 過度複雜、安全性問題多、靜態內容不需要 CMS
- **MediaWiki**: 維護成本太高、需要資料庫伺服器
- **自建框架**: 時間浪費在基礎設施而非內容
- **Notion/Google Docs 匯出**: 格式不一致、無法自訂樣式
## CJK / 繁體中文 特殊考量
- VitePress 原生支援 CJK 字元渲染
- MiniSearch 需確認中文分詞效果，可能需要 jieba 或 nodejieba 輔助
- 字型：Noto Sans TC 或系統預設字型
- URL slug：使用英文路徑（如 `/bosses/desert-king`）而非中文路徑，避免編碼問題
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
