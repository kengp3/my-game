# Phase 1: Site Foundation - Research

**Researched:** 2026-04-10
**Domain:** VitePress 1.x — 靜態網站建置、主題客製化、CJK 搜尋、GitHub Pages 部署
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** 視覺風格 — 暗色系遊戲風格主題，沙漠紅/金色系強調色。預設暗色模式，支援亮色切換。
- **D-02:** 字型 — 系統預設繁體中文字型（Noto Sans TC fallback），英文 Inter 或 sans-serif。
- **D-03:** Boss 模板 — 名稱、圖片、等級/難度、弱點屬性、攻擊模式表格、推薦裝備、推薦策略、掉落物品列表（連結至裝備頁）、所在區域（連結至地圖頁）。
- **D-04:** 裝備模板 — 名稱、圖片、稀有度、屬性數值表格、取得方式（Boss掉落/商店/製作）、強化路線、適用建構推薦。
- **D-05:** 區域模板 — 名稱、描述、等級範圍、敵人列表、NPC 列表、寶箱位置、隱藏區域、相關任務列表。
- **D-06:** 導航架構 — 頂部導航 8 項目（首頁、新手入門、主線劇情、Boss攻略、角色職業、裝備圖鑑、地圖探索、系統機制）。每個分類有獨立側邊欄，自動從目錄結構生成。
- **D-07:** URL 策略 — 英文 slug（如 `/bosses/desert-king`），避免中文 URL 編碼問題。
- **D-08:** 部署 — GitHub Pages + GitHub Actions，推送 main 分支即部署。暫不使用自訂網域。
- **D-09:** 搜尋 — VitePress 內建 MiniSearch，測試中文分詞效果。如不理想再評估 Algolia DocSearch。

### Claude's Discretion

使用者將所有設計決策交由 Claude 決定（已在 D-01 至 D-09 中具體化）。

### Deferred Ideas (OUT OF SCOPE)

無 — 討論未超出 Phase 1 範疇。
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SITE-01 | 使用者可瀏覽 VitePress 靜態網站，具有清晰的頂部導航和側邊欄 | VitePress nav + sidebar 多路徑配置模式已驗證；見「Architecture Patterns」 |
| SITE-02 | 使用者可透過中文全文搜尋找到任何攻略內容 | MiniSearch local provider + Intl.Segmenter tokenizer 配置；見「Common Pitfalls」CJK 部分 |
| SITE-03 | 網站透過 GitHub Pages 自動建置部署，推送即上線 | GitHub Actions 官方 workflow 已驗證；見「Architecture Patterns」 |
| SITE-04 | 所有攻略頁面使用統一模板（Boss、裝備、區域各有專屬模板） | VitePress Vue SFC 全域元件模式；frontmatter schema 驅動的 Markdown 模板；見「Architecture Patterns」 |
| SITE-05 | 使用者可在手機/平板/桌面正常瀏覽（響應式設計） | VitePress 預設主題內建響應式（768/960/1440px 斷點）；無需額外工作 |
</phase_requirements>

---

## Summary

Phase 1 建立赤血沙漠攻略 Wiki 的完整站台骨架。技術核心為 **VitePress 1.6.4**（2025-08-05 發布），為 Vue 3 驅動的 Markdown-first 靜態網站生成器。本研究確認所有五個需求（SITE-01 至 SITE-05）均可在標準 VitePress 框架內達成，無需第三方函式庫，僅一個例外：中文搜尋分詞需要自訂 `Intl.Segmenter` tokenizer 配置（原生 MiniSearch 以空白為分詞邊界，對 CJK 語言無效）。

主題客製化透過覆寫 VitePress CSS Custom Properties 實現（在 `--vp-c-brand-*` 和 `--vp-c-bg-*` 系列變數），不需要 fork 主題或使用 Sass。內容模板以 Vue SFC 全域元件實作，於 `.vitepress/theme/index.ts` 中全域註冊後，即可在任何 Markdown 頁面的 frontmatter schema 驅動下使用。部署流程透過 GitHub Actions 官方 workflow 實現，推送 main 分支後數分鐘內自動上線。

這是 greenfield 專案（目前 `/Users/kengp3/Workspaces/claude_workspace/my-game/` 只有 `CLAUDE.md`），因此 Phase 1 必須從 `npx vitepress init` 開始建立完整專案結構。

**Primary recommendation:** 使用 `npx vitepress init` 初始化 — 選擇根目錄作為內容位置、TypeScript、dark mode 預設 — 然後依序套用 UI-SPEC.md 的 CSS 變數、配置 nav/sidebar、建立三種內容模板元件、設置 MiniSearch CJK tokenizer、建立 GitHub Actions workflow。

---

## Project Constraints (from CLAUDE.md)

| Directive | Impact on Phase 1 |
|-----------|-------------------|
| 語言：繁體中文 | 所有 UI 文字、frontmatter、meta tags 使用繁體中文；`lang="zh-Hant"` |
| Stack：VitePress 1.x | 不使用其他 SSG；不手建框架 |
| 搜尋：MiniSearch 優先，Algolia 備案 | Phase 1 使用 MiniSearch；如效果不佳於後續 phase 評估 Algolia |
| URL slug：英文路徑 | 所有路由使用 ASCII slug，如 `/bosses/desert-king` |
| Hosting：GitHub Pages | GitHub Actions workflow 為標準部署路徑 |
| 不使用：WordPress、MediaWiki、自建框架、Notion 匯出 | 不相關（已排除） |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vitepress | 1.6.4 | 靜態網站生成器 | 已在 CLAUDE.md 鎖定；Vue 3 驅動、Markdown-first、內建搜尋 |
| vue | 3.5.x (bundled) | 元件框架 | VitePress 內建，無需獨立安裝 |
| typescript | 5.x | 類型安全 | VitePress init wizard 可選；推薦用於 config.ts |

[VERIFIED: npm registry — vitepress@1.6.4 published 2025-08-05]
[VERIFIED: npm registry — vitepress 依賴 vue ^3.5.13、vite ^5.4.14、minisearch ^7.1.1]

### Supporting（Phase 1 範圍內）

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| MiniSearch | 7.1.1 (bundled) | 全文搜尋 index | VitePress 內建；配置 provider: 'local' 即啟用 |
| @vueuse/core | 12.x (bundled) | Vue composables | VitePress 內建；可在自訂元件中使用 |
| Google Fonts (CDN) | n/a | Noto Sans TC | via VitePress head config；不需要 npm 套件 |

[VERIFIED: npm registry — minisearch@7.1.1 為 vitepress@1.6.4 依賴]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| MiniSearch (local) | Algolia DocSearch | Algolia 功能更強、中文分詞更好，但需要申請 API key 和爬蟲設定；Phase 1 先用 MiniSearch |
| Google Fonts CDN | self-hosted Noto Sans TC | self-hosted 更快（無 DNS lookup），但增加 repo 大小；Phase 1 用 CDN 優先簡單 |
| VitePress 1.x | VitePress 2.0.0-alpha | alpha 版不穩定；dist-tags next 顯示仍為 alpha；Phase 1 用 stable |

[VERIFIED: npm registry — vitepress dist-tags: latest=1.6.4, next=2.0.0-alpha.17]

**Installation:**
```bash
npx vitepress init
# 選項：根目錄為內容位置、TypeScript、Site title: 赤血沙漠 攻略 Wiki
```

**Version verification:**
```bash
npm view vitepress version  # => 1.6.4
```

---

## Architecture Patterns

### Recommended Project Structure

```
my-game/                          # repo 根目錄（VitePress 內容根）
├── .vitepress/
│   ├── config.ts                 # 站台設定：lang、base、nav、sidebar、search、head
│   └── theme/
│       ├── index.ts              # 主題入口：擴展 DefaultTheme、全域元件、匯入 CSS
│       └── custom.css            # CSS Custom Properties 覆寫（來自 UI-SPEC.md）
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 部署 workflow
├── public/
│   ├── images/
│   │   ├── bosses/               # Boss 圖片（Phase 1 用佔位圖）
│   │   ├── equipment/            # 裝備圖片
│   │   └── maps/                 # 地圖圖片
│   └── favicon.ico
├── components/                   # 可選：Vue SFC 模板元件（若在 theme/index.ts 全域註冊則放 .vitepress/theme/components/）
├── index.md                      # 首頁（home layout）
├── guide/
│   ├── beginner/
│   │   └── index.md
│   ├── story/
│   │   └── index.md
│   ├── bosses/
│   │   ├── index.md              # Boss 列表頁
│   │   └── example-boss.md      # Boss 模板示例（Phase 1 用佔位）
│   ├── characters/
│   │   └── index.md
│   ├── equipment/
│   │   ├── index.md
│   │   └── example-equipment.md # 裝備模板示例
│   ├── maps/
│   │   ├── index.md
│   │   └── example-area.md      # 區域模板示例
│   └── systems/
│       └── index.md
├── package.json
├── CLAUDE.md
└── .planning/                    # GSD planning（不部署）
```

**關鍵決策：** VitePress 內容根設在 repo 根目錄（而非 `/docs`），這樣 `base` 配置更簡潔，且符合 ARCHITECTURE.md 的規劃。

### Pattern 1: VitePress Config（config.ts）

**What:** 中央配置：語言、base 路徑、head（字型）、導航、側邊欄、搜尋
**When to use:** Phase 1 必須建立

```typescript
// Source: https://vitepress.dev/reference/site-config
// .vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-Hant',
  title: '赤血沙漠 攻略 Wiki',
  description: '最完整的赤血沙漠攻略資料庫',
  base: '/my-game/',   // GitHub Pages 子路徑；若部署為 user.github.io 則設 '/'

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap',
      rel: 'stylesheet'
    }]
  ],

  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '新手入門', link: '/guide/beginner/' },
      { text: '主線劇情', link: '/guide/story/' },
      { text: 'Boss 攻略', link: '/guide/bosses/' },
      { text: '角色職業', link: '/guide/characters/' },
      { text: '裝備圖鑑', link: '/guide/equipment/' },
      { text: '地圖探索', link: '/guide/maps/' },
      { text: '系統機制', link: '/guide/systems/' },
    ],

    sidebar: {
      '/guide/bosses/': [
        { text: 'Boss 攻略', items: [
          { text: 'Boss 一覽', link: '/guide/bosses/' },
          // 後續 phase 填充各 Boss 條目
        ], collapsed: false }
      ],
      // 其他分區側邊欄在對應 phase 建立
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜尋攻略內容...' },
              modal: {
                noResultsText: '找不到相關內容',
                resetButtonTitle: '清除搜尋',
                footer: { closeText: '關閉', navigateText: '導航', selectText: '選擇' }
              }
            }
          }
        },
        miniSearch: {
          options: {
            tokenize: (text: string) => {
              // CJK tokenizer using Intl.Segmenter
              const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
              return Array.from(segmenter.segment(text))
                .filter(s => s.isWordLike)
                .map(s => s.segment)
            }
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        }
      }
    },

    footer: {
      message: '赤血沙漠 攻略 Wiki — 非官方玩家社群攻略',
    },
  }
})
```

[CITED: https://vitepress.dev/reference/site-config]
[CITED: https://vitepress.dev/reference/default-theme-search]
[CITED: https://vitepress.dev/reference/default-theme-config]

### Pattern 2: 主題擴展（theme/index.ts + custom.css）

**What:** 擴展 DefaultTheme、全域元件註冊、覆寫 CSS 變數
**When to use:** Phase 1 建立；後續 phase 追加元件

```typescript
// Source: https://vitepress.dev/guide/extending-default-theme
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BossTemplate from './components/BossTemplate.vue'
import EquipmentTemplate from './components/EquipmentTemplate.vue'
import AreaTemplate from './components/AreaTemplate.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BossTemplate', BossTemplate)
    app.component('EquipmentTemplate', EquipmentTemplate)
    app.component('AreaTemplate', AreaTemplate)
  }
} satisfies Theme
```

```css
/* Source: https://vitepress.dev/guide/extending-default-theme#overriding-css-variables */
/* .vitepress/theme/custom.css — 來自 UI-SPEC.md 的完整 CSS 變數映射 */
:root {
  --vp-font-family-base: 'Noto Sans TC', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', ui-monospace, 'Menlo', 'Monaco', 'Consolas', monospace;

  /* Light mode */
  --vp-c-bg: #faf8f5;
  --vp-c-bg-alt: #f0ece6;
  --vp-c-bg-elv: #ffffff;
  --vp-c-bg-soft: #f0ece6;
  --vp-c-brand-1: #a83520;
  --vp-c-brand-2: #c5442a;
  --vp-c-brand-3: #8c2c1a;
  --vp-c-brand-soft: rgba(168, 53, 32, 0.12);
  --vp-c-text-1: #2c2a26;
  --vp-c-text-2: #5c5850;
  --vp-c-text-3: #8a857c;
  --vp-c-divider: rgba(44, 42, 38, 0.12);
}

.dark {
  --vp-c-bg: #1a1a1e;
  --vp-c-bg-alt: #141416;
  --vp-c-bg-elv: #222228;
  --vp-c-bg-soft: #222228;
  --vp-c-brand-1: #c5442a;
  --vp-c-brand-2: #d4553b;
  --vp-c-brand-3: #b33d26;
  --vp-c-brand-soft: rgba(197, 68, 42, 0.16);
  --vp-c-text-1: rgba(235, 230, 220, 0.95);
  --vp-c-text-2: rgba(235, 230, 220, 0.60);
  --vp-c-text-3: rgba(235, 230, 220, 0.38);
  --vp-c-divider: rgba(235, 230, 220, 0.08);
  --vp-c-gutter: #141416;
  --vp-c-default-1: #3a3a40;
  --vp-c-default-2: #303035;
  --vp-c-default-3: #28282d;
  --vp-c-default-soft: rgba(235, 230, 220, 0.04);
}
```

### Pattern 3: 內容模板元件（Vue SFC + frontmatter）

**What:** Boss/裝備/區域各有對應 Vue SFC，由 Markdown frontmatter 提供資料，元件透過 `useData()` 讀取
**When to use:** SITE-04 需求；新增內容頁面時直接複製模板文件

```vue
<!-- Source: https://vitepress.dev/guide/using-vue -->
<!-- .vitepress/theme/components/BossTemplate.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="boss-template">
    <div class="boss-header">
      <h1>{{ frontmatter.name }}</h1>
      <span class="difficulty-badge" :data-level="frontmatter.difficulty">
        {{ frontmatter.difficulty }}
      </span>
    </div>
    <div class="boss-info-grid">
      <div>等級：{{ frontmatter.level }}</div>
      <div>弱點：{{ frontmatter.weakness?.join('、') }}</div>
      <div>所在區域：{{ frontmatter.area }}</div>
    </div>
    <!-- 攻擊模式、推薦裝備、策略、掉落物等 section 由 slot 插入 -->
    <slot />
  </div>
</template>
```

```markdown
<!-- guide/bosses/example-boss.md — Boss 頁面使用方式 -->
---
layout: doc
name: 示例 Boss 名稱
difficulty: 困難
level: 45
weakness: [火屬性, 雷屬性]
area: 赤血沙漠中心
drops:
  - name: 烈焰之刃
    link: /guide/equipment/flame-blade
    rarity: 傳說
---

<BossTemplate />

## 攻擊模式

| 招式名 | 傷害類型 | 應對方式 |
|--------|----------|----------|
| 沙塵暴 | 範圍物理 | 向側方翻滾閃避 |

## 攻略策略

此 Boss 的攻略內容...
```

### Pattern 4: 首頁（home layout）

**What:** VitePress 內建 home layout，hero + features cards
**When to use:** SITE-01；index.md 使用此 layout

```markdown
<!-- Source: https://vitepress.dev/guide/frontmatter -->
<!-- index.md -->
---
layout: home

hero:
  name: 赤血沙漠
  text: 攻略 Wiki
  tagline: 最完整的赤血沙漠攻略資料庫
  actions:
    - theme: brand
      text: 開始閱讀攻略
      link: /guide/beginner/introduction
    - theme: alt
      text: 查看 Boss 攻略
      link: /guide/bosses/

features:
  - title: 新手入門
    details: 從零開始的冒險指南
    link: /guide/beginner/
  - title: 主線劇情
    details: 章節制完整劇情攻略
    link: /guide/story/
  - title: Boss 攻略
    details: 每個 Boss 的詳細打法
    link: /guide/bosses/
  - title: 角色職業
    details: 技能樹與建構推薦
    link: /guide/characters/
  - title: 裝備圖鑑
    details: 武器防具完整資料
    link: /guide/equipment/
  - title: 地圖探索
    details: 區域指南與隱藏物品
    link: /guide/maps/
---
```

### Pattern 5: GitHub Actions 部署 Workflow

**What:** 推送 main 分支觸發自動建置並部署到 GitHub Pages
**When to use:** SITE-03；Phase 1 必須建立

```yaml
# Source: https://vitepress.dev/guide/deploy (GitHub Pages section)
# .github/workflows/deploy.yml
name: Deploy VitePress to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist   # 內容根在 repo 根目錄時的輸出路徑

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**注意：** 官方文件用 Node 24，但 Node 20 LTS 更穩定；兩者均可用。`artifact path` 取決於 VitePress 內容根位置：
- 內容根在 repo 根目錄 → `.vitepress/dist`
- 內容根在 `/docs` 子目錄 → `docs/.vitepress/dist`

[CITED: https://vitepress.dev/guide/deploy]

### Anti-Patterns to Avoid

- **Markdown 用中文路徑：** 如 `/guide/bosses/沙漠王.md` — URL 編碼後變成 `%E6%B2%99...`，難以引用。用英文 slug（D-07 決策）。
- **Sidebar 全用自動生成：** VitePress 沒有完全自動的 sidebar 生成；需手動配置或使用 `vitepress-sidebar` 插件。Phase 1 手動配置（結構簡單）。
- **在 Markdown 中直接 import 元件：** Phase 1 三個模板元件應全域註冊（在 theme/index.ts），避免每個頁面都需要 import 語句。
- **修改 VitePress node_modules：** 所有客製化應透過 CSS Custom Properties 和 theme extension，不直接修改 VitePress 原始碼。
- **不設 base：** 部署到 `username.github.io/my-game/` 時若不設 `base: '/my-game/'`，靜態資源路徑會錯誤導致 404。

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 全文搜尋 | 自建 search index | VitePress MiniSearch (local provider) | 已整合 index 建立、模糊搜尋、highlight；自建複雜度高 |
| 響應式佈局 | 自定義 CSS media query 系統 | VitePress 預設主題內建斷點 | 已處理 nav collapse、sidebar overlay、content width |
| 深色/淺色模式切換 | 手建 toggle + localStorage | VitePress 內建 AppearanceToggle | 已處理 prefers-color-scheme、localStorage 持久化、`.dark` class |
| Markdown 語法高亮 | 自建 highlight | VitePress 內建 Shiki | 支援 100+ 語言，已整合至 build pipeline |
| 側邊欄導航 | 自建 sidebar 元件 | VitePress themeConfig.sidebar | 已支援 nested、collapsible、active 狀態 |
| CI/CD | 自建 deploy script | GitHub Actions + actions/deploy-pages | 官方支援的 Pages 部署方式，最簡單穩定 |

**Key insight:** VitePress 為攻略 Wiki 提供了所有 table-stakes 基礎設施。Phase 1 的客製化工作應集中在「配置」和「CSS 變數覆寫」，而非「自建」。

---

## Common Pitfalls

### Pitfall 1: MiniSearch 中文分詞失效（SITE-02 風險）

**What goes wrong:** 預設 MiniSearch 以空白為分詞邊界。中文句子「赤血沙漠Boss攻略」被視為單一 token，搜尋「Boss」找不到結果。
**Why it happens:** MiniSearch 的預設 tokenizer 假設拉丁語系空白分隔。CJK 語言不使用空白。
**How to avoid:** 配置自訂 tokenizer 使用 `Intl.Segmenter`（見 Pattern 1 config.ts）。`Intl.Segmenter` 在現代瀏覽器中為原生 API，無需額外 npm 套件。
**Warning signs:** 搜尋整個詞組有結果，但搜尋其中一個詞語無結果。

[CITED: https://github.com/vuejs/vitepress/issues/4049]
[VERIFIED: WebSearch — Intl.Segmenter tokenizer 為社群驗證的解法]

### Pitfall 2: base 路徑設定錯誤（SITE-03 風險）

**What goes wrong:** 部署到 `username.github.io/my-game/` 後，CSS/JS 資源顯示 404，頁面樣式完全消失。
**Why it happens:** VitePress 生成的 `<link>` 和 `<script>` 標籤用絕對路徑 `/assets/...`，部署到子路徑時路徑不正確。
**How to avoid:** 在 config.ts 設定 `base: '/my-game/'`（需與 GitHub repository 名稱一致）。Trailing slash 必須保留。
**Warning signs:** 本地 `npm run docs:preview` 正常，部署後頁面無樣式。

[CITED: https://vitepress.dev/reference/site-config]

### Pitfall 3: VitePress init 預設輸出路徑（結構決策）

**What goes wrong:** 若 init wizard 選擇 `./docs` 作為內容根，GitHub Actions workflow 中的 artifact path 需設為 `docs/.vitepress/dist`，否則部署失敗。
**Why it happens:** VitePress 輸出目錄在 `{contentRoot}/.vitepress/dist`，不是固定位置。
**How to avoid:** Phase 1 選擇 repo 根目錄作為內容根（與 ARCHITECTURE.md 規劃一致），artifact path 設為 `.vitepress/dist`。整個團隊遵循一致的結構決策。
**Warning signs:** GitHub Actions build 成功但 deploy 步驟上傳空目錄。

[ASSUMED — 基於 VitePress 文件邏輯推斷；結構決策已由 ARCHITECTURE.md 確認]

### Pitfall 4: 全域元件命名規則（SITE-04 風險）

**What goes wrong:** 在 Markdown 中使用的元件名稱含中文或純小寫（如 `<boss>`），VitePress 將其視為 HTML 元素而非 Vue 元件，導致 hydration 錯誤或元件無法渲染。
**Why it happens:** VitePress/Vue 識別自訂元件的規則：名稱必須含連字號（kebab-case）或 PascalCase。
**How to avoid:** 使用 PascalCase（`<BossTemplate />`）或 kebab-case（`<boss-template />`）。推薦 PascalCase 與 Vue SFC 命名一致。

[CITED: https://vitepress.dev/guide/using-vue — "A custom component's name either needs to contain a hyphen or be in PascalCase"]

### Pitfall 5: Frontmatter 在 Vue 元件中無法直接存取陣列

**What goes wrong:** Frontmatter 中的 YAML 陣列（如 `drops: [...]`）在模板中直接使用時，若值為 undefined 會導致 Vue 模板錯誤。
**Why it happens:** 搜尋引擎爬蟲頁面和新建頁面中 frontmatter 欄位可能未填寫。
**How to avoid:** 在 Vue 模板中使用 optional chaining 和 fallback（`frontmatter.drops ?? []`、`frontmatter.weakness?.join('、')`）。

[ASSUMED — 基於 Vue 3 模板行為的通用知識]

---

## Code Examples

### CJK Tokenizer 完整配置

```typescript
// Source: https://github.com/vuejs/vitepress/issues/4049 + Intl.Segmenter API
// 在 config.ts 的 themeConfig.search.options.miniSearch.options.tokenize 中使用
tokenize: (text: string) => {
  const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
  return Array.from(segmenter.segment(text))
    .filter(s => s.isWordLike)
    .map(s => s.segment)
}
```

### 多路徑 Sidebar 配置

```typescript
// Source: https://vitepress.dev/reference/default-theme-config
sidebar: {
  '/guide/bosses/': [{
    text: 'Boss 攻略',
    collapsed: false,
    items: [
      { text: 'Boss 一覽', link: '/guide/bosses/' },
      { text: '示例 Boss', link: '/guide/bosses/example-boss' },
    ]
  }],
  '/guide/equipment/': [{
    text: '裝備圖鑑',
    collapsed: false,
    items: [
      { text: '裝備一覽', link: '/guide/equipment/' },
    ]
  }],
  // 每個頂層分區有獨立 sidebar
}
```

### Package.json Scripts（VitePress 根目錄模式）

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.6.4"
  }
}
```

### 裝備稀有度 Badge CSS

```css
/* .vitepress/theme/custom.css — 裝備稀有度 badge（SITE-04 模板需要） */
.rarity-badge[data-rarity="普通"] { color: #8a857c; }
.rarity-badge[data-rarity="精良"] { color: #4a9e4a; }
.rarity-badge[data-rarity="稀有"] { color: #4a7ec5; }
.rarity-badge[data-rarity="史詩"] { color: #9b59b6; }
.rarity-badge[data-rarity="傳說"] { color: #d4a843; }

.difficulty-badge[data-level="簡單"] { background: #4a9e4a; }
.difficulty-badge[data-level="普通"] { background: #d4a843; }
.difficulty-badge[data-level="困難"] { background: #d45a2a; }
.difficulty-badge[data-level="極難"] { background: #e54040; }
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| VitePress `--vp-c-brand` (舊版單一品牌色) | `--vp-c-brand-1/2/3/soft`（多層次品牌色系列） | VitePress 1.0+ | 覆寫需要設定全部四個變數才能正確呈現 hover/active 狀態 |
| VitePress init 輸出到 `/docs` | 可選擇根目錄或 `/docs` | VitePress 1.x | init wizard 會詢問；Phase 1 選根目錄 |
| MiniSearch 預設 tokenizer | 需自訂 Intl.Segmenter tokenizer | VitePress 持續 open issue | CJK 支援需要一次性配置，非零配置 |

**Deprecated/outdated:**
- `@vue/composition-api`：VitePress 1.x 使用 Vue 3，不需要此 polyfill
- VitePress `0.x` config 格式：`module.exports = {}` 已淘汰，使用 `defineConfig()` + TypeScript
- GitHub Actions `actions/deploy-pages@v1`：當前版本為 v4

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | VitePress init 選根目錄時，package.json scripts 為 `vitepress dev`（無 `docs` 參數） | Architecture Patterns（package.json scripts） | 若實際需要 `vitepress dev .`，build script 需調整 |
| A2 | GitHub repository 名稱為 `my-game`；`base` 應設 `/my-game/` | Pattern 5（GitHub Actions） | 若 repo 名不同，base 設定錯誤會導致靜態資源 404 |
| A3 | Frontmatter 中未填寫的陣列欄位回傳 `undefined`（而非空陣列） | Pitfall 5 | 若 VitePress 自動處理，optional chaining 仍安全但非必要 |

**Confirmed claims（非 ASSUMED）：** Standard Stack 版本、CSS 變數名稱、GitHub Actions workflow 結構、nav/sidebar TypeScript 類型、MiniSearch tokenizer API 均已透過官方文件或 npm registry 驗證。

---

## Open Questions (RESOLVED)

1. **GitHub repository 實際名稱**
   - What we know: 本地目錄名為 `my-game`
   - What's unclear: GitHub 上的 repository 名稱是否也是 `my-game`；是否有自訂網域計畫（D-08 說暫無）
   - Recommendation: 在 `config.ts` 中以 `base: '/my-game/'` 作為預設，部署前確認 GitHub Pages 設定
   - RESOLVED: 使用 `base: '/my-game/'` 作為預設值（Plan 01-01 Task 1 已設定）。若 GitHub repository 名稱不同，部署前調整 `base` 即可。

2. **main vs master 分支名稱**
   - What we know: 目前 git repo 顯示 `master` 分支（執行 git status 時看到「位於分支 master」）
   - What's unclear: GitHub 遠端是否也是 `master`；是否需要改為 `main`
   - Recommendation: GitHub Actions workflow 的 `on.push.branches` 需配合實際遠端分支名（`master` 或 `main`）
   - RESOLVED: 依據實際 git 環境使用 `master`。Plan 01-03 workflow 設定 `branches: [master]`。CONTEXT.md D-08 提到「推送 main 分支即部署」為概念性描述，實際以本地 git 分支名稱 `master` 為準。

3. **Intl.Segmenter 瀏覽器支援範圍**
   - What we know: `Intl.Segmenter` 在現代瀏覽器（Chrome 87+, Firefox 78+, Safari 14.1+）中為原生支援
   - What's unclear: 目標受眾是否使用舊版瀏覽器（如 iOS < 14）
   - Recommendation: Phase 1 直接使用；若有舊版支援需求，評估 `unicode-segmenter` npm 套件作為 polyfill
   - RESOLVED: Phase 1 直接使用原生 `Intl.Segmenter`，不加 polyfill。目標受眾為現代瀏覽器玩家，覆蓋率已足夠（Chrome 87+/Firefox 78+/Safari 14.1+ 皆支援）。若日後有舊版瀏覽器回報問題，再評估 polyfill。

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | VitePress 建置、本地開發 | ✓ | v25.8.1 | — |
| npm | 套件管理、build scripts | ✓ | 11.12.1 | — |
| Git | 版本控制、GitHub Actions 觸發 | ✓ | 2.47.0 | — |
| GitHub CLI (gh) | PR 管理（非必要） | ✗ | — | 直接用 GitHub 網頁介面 |
| GitHub Remote | SITE-03 自動部署 | ✗ (未確認) | — | 需在 Phase 1 建立並推送 |
| VitePress | 核心 SSG | ✗（尚未安裝） | — | Phase 1 Wave 0 安裝 |

**Missing dependencies with no fallback:**
- GitHub Remote repository：SITE-03 必須要有遠端 repo 才能設定 GitHub Pages。Phase 1 必須包含「建立 GitHub repository 並推送」步驟。

**Missing dependencies with fallback:**
- GitHub CLI：可直接用 GitHub 網頁介面操作，不影響開發流程。

**Note:** Node.js v25.8.1 為最新版（超過 LTS v22），VitePress 1.6.4 要求 Node 18+，完全相容。

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | 無自動化測試框架（Phase 1 為靜態網站基礎建設） |
| Config file | N/A |
| Quick run command | `npm run docs:build` — 建置成功即驗證 |
| Full suite command | `npm run docs:build && npm run docs:preview` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SITE-01 | nav 和 sidebar 正確渲染 | smoke (manual browser check) | `npm run docs:dev` 目視確認 | ❌ Wave 0 |
| SITE-02 | 中文搜尋回傳正確結果 | smoke (manual search test) | `npm run docs:dev` + 搜尋測試 | ❌ Wave 0 |
| SITE-03 | 推送後自動部署 | integration (GitHub Actions) | Push to main/master + check Actions tab | ❌ Wave 0 |
| SITE-04 | 三種模板頁面建置無錯誤 | build (automated) | `npm run docs:build` | ❌ Wave 0 |
| SITE-05 | 響應式版面不跑版 | smoke (manual DevTools check) | DevTools 裝置模擬 | ❌ Wave 0 |

**Design decision:** 靜態網站生成器專案的「測試」主要是 build 是否成功（`npm run docs:build` 0 exit code）和目視/手動檢查。自動化 unit/integration tests（如 Vitest、Playwright）超出 Phase 1 範圍，在後續需要互動功能時評估。

### Sampling Rate
- **Per task commit:** `npm run docs:build` — 確認無編譯錯誤
- **Per wave merge:** `npm run docs:build` + 本地 `npm run docs:preview` 目視確認
- **Phase gate:** `docs:build` 成功 + GitHub Pages 實際部署確認 + 手動 SITE-01~05 checklist

### Wave 0 Gaps
- [ ] `package.json` — 需要在 init 後確認 scripts 正確
- [ ] `.github/workflows/deploy.yml` — 需在 Wave 1 建立
- [ ] 三種模板 `.vue` 文件 — 需在 Wave 2 建立

---

## Security Domain

Phase 1 為純靜態網站，無使用者輸入、無後端、無資料庫。ASVS 高風險類別（身份驗證、Session 管理、存取控制）均不適用。

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | 否 | 無（靜態網站） |
| V3 Session Management | 否 | 無（無 session） |
| V4 Access Control | 否 | 無（公開內容） |
| V5 Input Validation | 部分 | 無使用者輸入；搜尋在瀏覽器端執行，不傳送到伺服器 |
| V6 Cryptography | 否 | GitHub Pages 提供 HTTPS（TLS 由平台處理） |

**Relevant security consideration:** 所有外部連結（Google Fonts CDN）應使用 HTTPS（已在 head config 中確保）。

---

## Sources

### Primary (HIGH confidence)
- [VitePress npm registry](https://www.npmjs.com/package/vitepress) — version 1.6.4, publish date 2025-08-05, bundled dependencies
- [VitePress Site Config](https://vitepress.dev/reference/site-config) — lang, base, head 配置
- [VitePress Default Theme Search](https://vitepress.dev/reference/default-theme-search) — MiniSearch local provider 配置
- [VitePress Default Theme Config](https://vitepress.dev/reference/default-theme-config) — nav, sidebar TypeScript 類型
- [VitePress Extending Default Theme](https://vitepress.dev/guide/extending-default-theme) — theme/index.ts 模式
- [VitePress Deploy Guide](https://vitepress.dev/guide/deploy) — GitHub Actions workflow
- [VitePress Using Vue in Markdown](https://vitepress.dev/guide/using-vue) — 元件命名規則

### Secondary (MEDIUM confidence)
- [VitePress GitHub Issue #4049](https://github.com/vuejs/vitepress/issues/4049) — CJK tokenizer 問題確認（issue open，社群 workaround 為 Intl.Segmenter）
- [VitePress Getting Started](https://vitepress.dev/guide/getting-started) — init wizard 流程

### Tertiary (LOW confidence)
- WebSearch 結果確認 Intl.Segmenter 為 CJK tokenizer 社群慣用解法（多個來源指向相同模式）

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — npm registry 直接驗證版本
- Architecture: HIGH — 官方文件 + ARCHITECTURE.md 確認
- Pitfalls: MEDIUM — CJK tokenizer 問題有官方 issue 確認；其他基於文件推斷
- GitHub Actions workflow: HIGH — 官方 deploy 文件提供

**Research date:** 2026-04-10
**Valid until:** 2026-09-10（VitePress stable 版本更新頻率低；MiniSearch CJK 狀態可能改善）
