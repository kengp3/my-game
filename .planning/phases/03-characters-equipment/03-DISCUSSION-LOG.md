# Phase 3: Characters & Equipment - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 03-characters-equipment
**Areas discussed:** 角色頁面設計, 裝備圖鑑規模, 製作/強化系統, 資料搜集策略, 圖片

---

## 角色頁面設計

### 角色/職業頁面結構

| Option | Description | Selected |
|--------|-------------|----------|
| 每個角色一頁 | 像 BossTemplate 模式 — 每個角色/職業一個完整頁面 | ✓ |
| 拆分子頁 | 每個角色拆為多頁（介紹頁 + 技能樹頁 + 建構推薦頁） | |
| Claude 決定 | 根據資料量和遊戲實際角色系統複雜度自行判斷 | |

**User's choice:** 每個角色一頁
**Notes:** None

### 技能樹呈現方式

| Option | Description | Selected |
|--------|-------------|----------|
| 表格式技能列表 | 每個技能一行，顯示名稱/等級/效果/冷卻 | ✓ |
| 卡片式分類 | 技能按類別分組（攻擊/防禦/被動），每個技能一張卡片 | |
| Claude 決定 | 根據實際遊戲技能系統複雜度自行選擇 | |

**User's choice:** 表格式技能列表
**Notes:** None

### 建構推薦呈現方式

| Option | Description | Selected |
|--------|-------------|----------|
| 卡片式建構 | 每個建構一張卡片，含名稱/說明/推薦裝備連結/技能配置 | ✓ |
| 段落式說明 | 每個建構一個段落，用文字詳細描述運作模式、優缺點 | |
| Claude 決定 | 根據資料豐富度自行決定呈現方式 | |

**User's choice:** 卡片式建構
**Notes:** None

---

## 裝備圖鑑規模

### 裝備頁面策略

| Option | Description | Selected |
|--------|-------------|----------|
| 每件獨立頁面 | 沿用現有 EquipmentTemplate.vue | ✓ |
| 分類表格頁 | 每個分類一個表格總覽頁 | |
| Claude 決定 | 根據實際裝備數量和複雜度自行判斷 | |

**User's choice:** 每件獨立頁面
**Notes:** None

### 裝備索引組織

| Option | Description | Selected |
|--------|-------------|----------|
| 武器/防具/飾品分類索引 | 裝備圖鑑首頁按大類分區 | ✓ |
| 單一列表索引 | 所有裝備統一列表 | |
| Claude 決定 | 根據實際裝備種類數自行組織 | |

**User's choice:** 武器/防具/飾品分類索引
**Notes:** None

---

## 製作/強化系統

### 內容放置方式

| Option | Description | Selected |
|--------|-------------|----------|
| 獨立系統指南頁 | 在 guide/systems/ 下建立專頁 | ✓ |
| 嵌入裝備頁面 | 每個裝備頁面內顯示其強化/製作資訊 | |
| 兩者都要 | 系統指南頁 + 裝備頁面內強化路線 | |
| Claude 決定 | 根據遊戲實際系統複雜度自行判斷 | |

**User's choice:** 獨立系統指南頁
**Notes:** None

---

## 資料搜集策略

### 資料處理方式

| Option | Description | Selected |
|--------|-------------|----------|
| 直接搜集真實資料 | 延續 Phase 2.1 模式 | ✓ |
| 先建結構後補資料 | Phase 2 的做法 | |
| Claude 決定 | 根據資料可取得性自行判斷 | |

**User's choice:** 直接搜集真實資料
**Notes:** None

### 缺失資料處理

| Option | Description | Selected |
|--------|-------------|----------|
| 「資料待補充」標記 | `::: info 資料待補充` | ✓ |
| 省略該欄位 | 找不到的欄位直接不顯示 | |
| Claude 決定 | 根據欄位重要性自行判斷 | |

**User's choice:** 「資料待補充」標記
**Notes:** None

---

## 圖片

### 圖片來源

| Option | Description | Selected |
|--------|-------------|----------|
| 網路搜集圖片 | 從遊戲 Wiki/官網/資料庫搜集 | ✓ |
| 外部連結引用 | 直接連結到外部圖片來源 | |
| 圖片佔位區塊 | 保留位置，標記「圖片尚未提供」 | |

**User's choice:** 網路搜集圖片
**Notes:** 使用者特別提出角色與裝備需要附上圖片

---

## Claude's Discretion

- CharacterTemplate.vue 的具體 frontmatter 欄位設計
- 裝備分類的具體子分類
- 系統指南頁面的具體結構和模板
- 搜集工具和搜尋策略
- 圖片儲存路徑和命名規則

## Deferred Ideas

None
