# Stack Research — 赤血沙漠 Game Guide Wiki

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
