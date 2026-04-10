# Phase 3: Characters & Equipment - Research

**Researched:** 2026-04-11
**Domain:** VitePress Vue SFC template authoring + Crimson Desert character/equipment game data
**Confidence:** MEDIUM (component patterns HIGH; game data MEDIUM due to recency of release)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**角色頁面設計**
- D-01: 每個角色/職業一個完整頁面 — 建立新的 CharacterTemplate.vue，包含介紹、技能、建構推薦等所有資訊
- D-02: 技能呈現使用表格式技能列表 — 每個技能一行，顯示名稱/等級/效果/冷卻等欄位
- D-03: 建構推薦使用卡片式呈現 — 每個建構一張卡片，含名稱/說明/推薦裝備連結/技能配置。風格與 EquipmentTemplate 的 builds 區塊一致

**裝備圖鑑規模**
- D-04: 每件裝備獨立頁面 — 沿用現有 EquipmentTemplate.vue，每件裝備一個 Markdown 頁面
- D-05: 裝備索引頁按武器/防具/飾品分類 — 裝備圖鑑首頁分區索引，側邊欄同步分類結構

**製作/強化系統**
- D-06: 建立獨立系統指南頁面 — 在 guide/systems/ 下建立強化系統和製作系統專頁，完整說明流程。裝備頁面連結到系統指南頁（符合 CHAR-03 要求）

**資料搜集策略**
- D-07: 直接搜集真實資料 — 延續 Phase 2.1 模式，建立模板同時搜集真實遊戲資料填充，避免佔位內容再替換的重工
- D-08: 缺失資料使用 `::: info 資料待補充` 標記 — 與 Phase 2.1 一致

**圖片**
- D-09: 從網路搜集角色與裝備圖片 — 從遊戲 Wiki/官網/資料庫搜集現有圖片存到 repo 中

### Claude's Discretion
- CharacterTemplate.vue 的具體 frontmatter 欄位設計
- 裝備分類的具體子分類（如武器下的劍/弓/法杖等）
- 系統指南頁面的具體結構和模板
- 搜集工具和搜尋策略的選擇
- 圖片儲存路徑和命名規則

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CHAR-01 | 使用者可查閱各角色/職業的介紹、技能樹和建構推薦 | CharacterTemplate.vue 設計 + 三個角色的真實資料（Kliff/Damiane/Oongka）|
| CHAR-02 | 使用者可瀏覽完整裝備圖鑑（武器、防具、飾品），含屬性和取得方式 | EquipmentTemplate.vue 沿用 + 武器/防具/飾品真實資料 |
| CHAR-03 | 使用者可查閱裝備強化和製作系統的流程說明 | 精煉系統（0→10 等級）+ 製作系統（355 個 Manual）研究完成 |
| CHAR-04 | 裝備頁面連結到取得地點（Boss 掉落、商店、製作） | EquipmentTemplate.vue 現有 sources[].link 機制可直接滿足 |
</phase_requirements>

---

## Summary

Phase 3 的工作範圍清晰分為三個子任務：(1) 建立 `CharacterTemplate.vue` 並填充 Kliff、Damiane、Oongka 三個可玩角色的真實資料；(2) 以現有 `EquipmentTemplate.vue` 建立代表性裝備頁面，並重寫裝備/角色索引頁；(3) 在 `guide/systems/` 下建立精煉系統與製作系統的獨立指南頁。

遊戲共有三個可玩角色，無傳統職業分類（Class-based）——每個角色有各自的技能樹（Kliff 80+ 技能、Damiane/Oongka 各約 70）。技能透過深淵神器（Abyss Artifacts）或「觀察學習（Watch and Learn）」戰鬥中習得。裝備系統分武器（9+ 種類型）、防具（頭盔/胸甲/手套/靴子 4 槽）、飾品（戒指×2、耳環×2、項鍊×1、披風×1 共 6 件）。精煉系統 0→10 等級，1-4 級用基礎材料，5 級起需深淵神器；深淵核心（Abyss Core）可插入武器槽提供特殊效果。

**Primary recommendation:** CharacterTemplate.vue 完全按照 UI-SPEC 的已確定規格建立；裝備頁優先建立三類代表性裝備各一件（武器：主之劍、防具：一件防具、飾品：一件飾品），並同時建立精煉/製作系統指南頁，確保 CHAR-03/CHAR-04 cross-link 在首批裝備頁即可運作。

---

## Standard Stack

### Core（已確立，Phase 1 起）

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| VitePress | 1.6.4 | 靜態網站生成器 | Phase 1 已部署，不可換 |
| Vue 3 (SFC) | bundled with VitePress | 互動元件（CharacterTemplate.vue） | 專案既有模式 |
| TypeScript | bundled | config.ts + 元件型別 | 專案既有模式 |

[VERIFIED: codebase — .vitepress/ 目錄結構]

### Supporting（既有 utilities）

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `useData()` from vitepress | — | 讀取 Markdown frontmatter | 所有 Vue SFC 模板 |
| `withBase()` from vitepress | — | 處理 /my-game/ base path 的內部連結 | 所有 `<a :href>` 內部連結 |
| VitePress custom containers | built-in | `:::tip`, `:::info`, `:::warning` | 系統指南頁、資料待補充標記 |

[VERIFIED: codebase — BossTemplate.vue, EquipmentTemplate.vue]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| 手寫 Vue SFC CharacterTemplate | Markdown-only 頁面 | 失去結構化 frontmatter 資料與 Vue 互動性，不符合 D-01 |
| 沿用 EquipmentTemplate 展示角色 | 建立 CharacterTemplate | 技能表格需求與裝備表格不同，需專屬模板 |

---

## Game Data: Playable Characters

> 此節為資料搜集產出，供執行 Agent 填充 CharacterTemplate frontmatter 使用。

### 角色總覽

赤血沙漠沒有傳統「職業」（Class）系統，而是三個固定可玩角色，各有獨立技能樹。

[CITED: game8.co/games/Crimson-Desert/archives/583000]

| 角色 | 解鎖時機 | 武器風格 | 定位 |
|------|---------|---------|------|
| 麥克道夫（Kliff Macduff） | 遊戲開始即可玩 | 劍盾/大劍/長槍/弓/雙持 | 萬能型、新手友好 |
| 黛米安（Damiane） | 第三章（灰鬃傭兵營地）| 長劍/手槍/大劍/長槍 | 高速連擊、攻擊型 |
| 烏卡（Oongka） | 第七章後（擊敗穆爾丁後）| 雙持巨斧/大錘 | 高傷害 AOE、力量型 |

### 麥克道夫（Kliff）— 詳細資料

**起始武器：** 狼之劍（Sword of the Wolf）、灰狼木盾（Grey Wolf Wooden Shield）

**技能樹特性：** 80+ 技能，涵蓋近戰、遠程、軸力（Axiom Force）能力。技能透過 Abyss Artifacts 或觀察敵人（Watch and Learn）習得。

[CITED: game8.co/games/Crimson-Desert/archives/585471]

**已確認技能（樣本）：**

| 技能名稱 | 類型 | 效果摘要 | 解鎖方式 |
|---------|------|---------|---------|
| Armed Combat | 主動 | 基礎近戰武器攻擊 | 預設 |
| Marksmanship | 主動 | 遠程武器攻擊，傷害與技能等級連動 | 預設 |
| Force Palm | 主動 | 能量攻擊，降低敵人防禦力 | 早期 Abyss Artifact |
| Focus | 特殊 | 時間減速，恢復 Spirit | 預設 |
| Pump Kick | 主動 | 雙腳飛踢，序幕 Boss 馬提亞斯習得 | 觀察學習 |
| Evasive Roll | 主動 | 閃避翻滾 | 觀察學習（裂角凱洛克） |

[CITED: game8.co/games/Crimson-Desert/archives/585471, CITED: 02.1-RESEARCH.md 已驗證資料]

**推薦建構（已驗證）：**

[CITED: game8.co/games/Crimson-Desert/archives/583162]

| 建構名稱 | 主武器 | 策略重點 |
|---------|-------|---------|
| 劍盾建構 | Sword of the Wolf + Warspike Spear | 新手友好，均衡攻守 |
| 雙持建構 | Sword of the Lord + Tauria Curved Sword | 全攻擊型，最大連擊輸出 |
| 長劍建構 | Rhett's Longsword | 技能連鎖：Spinning Slash、Stab、Lariat、Forward Slash |
| 長槍建構 | Rhinard Cannon | 反擊型，Counter Stance 特效 |
| 徒手建構 | Combat God's Plate Gloves + Dark Marksman's Plate Boots | Iron Fist 連擊 + 摔角技術 |
| 無限箭矢建構 | Noble Man's Bow | Boss 戰特化，遠程持續輸出 |

### 黛米安（Damiane）— 詳細資料

**起始武器：** 白風長劍（White Wind Rapier）、絕對正義大劍（Absolute Justice Greatsword）

**技能樹特性：** 約 70 技能，強調高速近戰連擊、盾牌彈射力學與遠程火器。比 Kliff 更快但需要更精準操作。

[CITED: method.gg/crimson-desert/crimson-desert-classes-combat-skills-and-playable-characters]

**已確認技能（樣本）：**

| 技能名稱 | 類型 | 效果摘要 | 解鎖方式 |
|---------|------|---------|---------|
| Smiting Strike | 主動 | 以光之矛旋轉並將敵人打落 | Abyss Artifact |
| Piercing Light | 主動 | 向前衝刺穿透敵人 | Abyss Artifact |
| Shield Toss | 主動 | 彈射盾牌，反彈後返回 | 預設/Abyss Artifact |
| Holy Explosion | 主動 | 上勾拳觸發地面爆炸 | Abyss Artifact |

**推薦建構：**

| 建構名稱 | 主武器 | 策略重點 |
|---------|-------|---------|
| 火焰槍手建構 | Demenissian Hero's Musket + Shield of Radiance | Elemental Charged Shot + Focused Shot 組合火焰傷害 |
| 長劍盾牌建構 | White Wind Rapier + Spencer Pistol | 近中距離位置操控 |
| 雙持建構 | White Wind + Grace Rapier | 新手友好，設置簡單 |
| 大劍建構 | Absolute Justice Greatsword | 大範圍近戰連擊，對群體效果佳 |
| 長槍建構 | Warspike Spear | 快速近戰攻擊，廣覆蓋範圍 |

### 烏卡（Oongka）— 詳細資料

**起始武器：** Orc Blaster、Dekarr Greataxe、Silverwolf Axe

**技能樹特性：** 約 70 技能，以雙持大型武器和 AOE 破陣能力為核心。在 Focus 模式下進入 Rage 超裝甲狀態。

**已確認技能（樣本）：**

| 技能名稱 | 類型 | 效果摘要 | 解鎖方式 |
|---------|------|---------|---------|
| Scatter Shot | 主動 | 散射攻擊，命中多個敵人 | Abyss Artifact |
| Leaping Smash | 主動 | 高跳後俯衝重擊，範圍傷害 | Abyss Artifact |
| Slash | 主動 | 前方橫掃，將敵人打落 | 預設 |
| Rage | 特殊 | Focus 模式下的超裝甲狀態 | 特定條件 |

**推薦建構：**

| 建構名稱 | 主武器 | 策略重點 |
|---------|-------|---------|
| 雙持建構 | Patterned Stone Greataxe + Bekker Greathammer | 旋風式持續攻擊，快速累積硬直計量 |

[ASSUMED: Oongka 資料比 Kliff/Damiane 少，遊戲社群後期解鎖研究較少]

---

## Game Data: Equipment

> 此節為裝備系統資料，供 EquipmentTemplate frontmatter 填充及裝備索引頁設計使用。

### 武器分類（確認）

[CITED: game8.co/games/Crimson-Desert/archives/582200]

| 武器類型 | 特性 | 適用角色 |
|---------|------|---------|
| 單手劍（One-Handed Sword） | 快速攻擊，搭盾使用 | Kliff |
| 斧頭（Axe） | 較慢但傷害更重 | Kliff, Oongka |
| 大劍（Greatsword） | 廣範圍、強擊退 | Kliff, Damiane |
| 長槍（Spear） | 攻擊距離長，安全輸出 | Kliff, Damiane |
| 大斧（Greataxe） | 巨大傷害，廣範圍揮擊 | Oongka |
| 雙刀/雙斧（Dual Wield） | 最高 DPS，高連擊數 | Kliff, Oongka |
| 弓（Bow） | 遠程安全輸出，適合潛行 | Kliff |
| 手槍（Pistol） | 可切換近/遠程 | Damiane |
| 步槍/火繩槍（Musket/Rifle） | 高傷害精確射擊 | Damiane |
| 手砲（Hand Cannon） | 充能強力射擊 | Kliff, Oongka |
| 匕首（Dagger） | 主要用於潛行暗殺 | Kliff |
| 盾牌（Shield） | 搭配單手武器防禦/招架 | Kliff, Damiane |

**代表性武器（適合首批裝備頁）：**

| 武器名稱 | 類型 | 取得方式 | 信心度 |
|---------|------|---------|--------|
| 主之劍（Sword of the Lord） | 單手劍 | 擊敗第一章 Boss 裂角凱洛克 | HIGH [VERIFIED: 02.1 research] |
| 狼之劍（Sword of the Wolf） | 單手劍 | Kliff 起始武器 | HIGH [CITED: game8] |
| Rhett's Longsword | 大劍 | 任務獎勵 | MEDIUM [CITED: game8 builds guide] |
| White Wind Rapier | 長劍 | Damiane 起始武器 | HIGH [CITED: game8] |
| Noble Man's Bow | 弓 | [資料待補充] | LOW [ASSUMED] |

### 防具分類（確認）

[CITED: game8.co/games/Crimson-Desert/archives/582201, crimsondesertgame.wiki.fextralife.com/Armor]

| 防具槽 | 主要效果 | 備註 |
|-------|---------|------|
| 頭盔（Headgear） | 防禦值（最低） | — |
| 胸甲（Chest Armor） | 防禦值（最高） | 4 槽中防禦最強 |
| 手套（Gloves） | 攻擊加成 | 強化攻擊輸出 |
| 靴子（Footwear） | 攻擊加成（與手套類似） | — |

**注意：** 防具組不提供套裝加成（No set bonus），主要功能為數值提升。

材料分類：
- 皮革系（Leather）：灰狼（Grey Wolf）、黑翼（Blackwing）、Ashclaw 等
- 板甲系（Plate）：Bolton、Canta、Scorchflame、Belkandor 等
- 布料系（Cloth）：Bandit、Dancing Catfish、Scarlet Blades 等
- 特殊套裝：Scholastone Uniform、Beekeeping Suit、St Halssius Priest Attire

### 飾品分類（確認）

[CITED: game8.co/games/Crimson-Desert/archives/586638]

| 飾品類型 | 裝備槽數 | 主要效果 |
|---------|---------|---------|
| 戒指（Ring） | ×2 | 攻擊/暴擊加成 |
| 耳環（Earring） | ×2 | 防禦/移動速度加成 |
| 項鍊（Necklace） | ×1 | 攻擊/暴擊加成 |
| 披風（Cloak） | ×1 | 防禦/元素抗性加成 |

**最大同時裝備：6 件飾品**

**代表性飾品：**

| 飾品名稱 | 類型 | 屬性 |
|---------|------|------|
| Pailunese Signet | 戒指 | ATK +2, CRIT Lv.1 |
| Mark of Darkness | 戒指 | ATK +2, ATK SPD Lv.2 |
| Witch's Earring | 耳環 | DEF +3, Move SPD Lv.1 |
| Surreal Necklace | 項鍊 | ATK +5, CRIT Lv.4 |
| Desert Marauder's Cloak | 披風 | DEF +5, Ice RES Lv.3 |

---

## Game Data: Enhancement & Crafting Systems

> 此節供 guide/systems/enhancement.md 與 guide/systems/crafting.md 頁面設計使用。

### 精煉系統（Refinement System）

[CITED: game8.co/games/Crimson-Desert/archives/587627, powerupgaming.co.uk refining guide]

**核心流程：**
1. 前往鍛造師（Blacksmith） — 第一位為埃爾南德城的圖爾納利（Turnali）
2. 選擇「Refinement」選項
3. 選擇要升級的裝備
4. 提交所需材料

**重要特點：** 精煉不消耗金幣（只消耗材料）。

**精煉等級：** 0 → 10 級（最高 +10）

**材料需求（依材料類型）：**

| 裝備類型 | 所需材料 | 來源 |
|---------|---------|------|
| 武器、板甲 | 礦石（鐵礦、銅礦及稀有變體） | 山壁/懸崖礦脈採集 |
| 木盾、弓 | 木材（Basic/Fine/Flawless Timber） | 砍伐樹木 |
| 皮革防具、飾品 | 皮革、小型/大型骨頭 | 獵殺動物掉落 |
| 布料、披風 | 羊毛、布料碎片、羽毛、象牙、蜘蛛絲 | 敵人掉落、探索 |

**等級 5+ 需要深淵神器（Abyss Artifacts）**：[CITED: powerupgaming.co.uk — 高精煉等級資源消耗大]

**獨特武器精煉：** 非獨特裝備可用複製品精煉；獨特武器需特定材料（非通用材料）。

**早期建議：** 先完成 Rhett 與 Turnali 的支線任務，取得鎬頭和伐木斧，啟動資源採集。

### 深淵核心系統（Abyss Core System）

[CITED: powerupgaming.co.uk refining guide, web search confirmed system basics]

**功能：** 裝備插槽系統，可插入深淵核心提供特殊加成。

**深淵核心效果範例：**
- 攻擊速度加成
- 暴擊率提升
- 元素傷害加成
- 生命偷取
- 範圍傷害附加效果

**插槽系統：**
- 普通武器預設 3 個插槽
- 訪問「女巫（Abyss Witch）」NPC 可花費 Abyss Cells 新增插槽（Create Socket 選項）
- 遊戲地圖散布 5 位深淵女巫，透過主線任務或特定位置解鎖（第三章後開始可用）

**Abyss Cells 來源：** 擊敗敵人、完成任務、分解不要的深淵核心裝備

### 製作系統（Crafting System）

[CITED: web search — thegameswiki.com/crimson-desert/wiki/crafting, game8.co/games/Crimson-Desert/archives/587737]

**五大製作系統：**

| 製作類型 | 製作地點 | 製作內容 |
|---------|---------|---------|
| 裝備鍛造 | 鍛造師（Smithy）/ 裁縫（Tailor） | 武器、防具 |
| 煉金術 | 大釜（Cauldron） | 藥水、強化劑 |
| 烹飪 | 篝火/野外鍋 | 料理（增益效果）|
| 染料製作 | 染料站（Dye Station） | 裝備顏色染色 |
| 裝備強化 | 鍛造師 | 精煉升級（同上節）|

**知識系統（Knowledge System）：** 355 個製作手冊（Crafting Manuals），涵蓋全遊戲可製作物品。

**製作手冊取得：**
- 可找到後交給相關商人（裝備商、裁縫、鍛造師）
- 不同手冊對應不同 NPC

**資源採集對應：**
- 礦石：採礦（Mining nodes — 山壁、懸崖）
- 木材：伐木（Logging）
- 食材：狩獵、採集
- 特殊材料：Boss 掉落、寶箱、任務

---

## Architecture Patterns

### Recommended Project Structure (Phase 3 新增)

```
.vitepress/
└── theme/
    ├── components/
    │   ├── CharacterTemplate.vue     ← NEW (Phase 3)
    │   ├── EquipmentTemplate.vue     ← EXISTING (typography fix needed)
    │   └── [others unchanged]
    └── index.ts                      ← 需新增 CharacterTemplate 註冊

guide/
├── characters/
│   ├── index.md                      ← 改寫（現為佔位）
│   ├── kliff.md                      ← NEW
│   ├── damiane.md                    ← NEW
│   └── oongka.md                     ← NEW
├── equipment/
│   ├── index.md                      ← 改寫（現為佔位）
│   ├── sword-of-the-lord.md          ← RENAME example-equipment → 或保留？
│   ├── [weapon pages]                ← NEW (代表性武器)
│   ├── [armor pages]                 ← NEW (代表性防具)
│   └── [accessory pages]             ← NEW (代表性飾品)
└── systems/
    ├── index.md                      ← 改寫（現為佔位）
    ├── enhancement.md                ← NEW
    └── crafting.md                   ← NEW
```

### Pattern 1: CharacterTemplate.vue — frontmatter + useData()

UI-SPEC 已完全規格化此模板。以下為完整 frontmatter schema（Claude's Discretion 範圍，UI-SPEC 確認）：

```yaml
# Source: 03-UI-SPEC.md (Phase 3 design contract)
---
layout: doc
name: 麥克道夫（Kliff Macduff）
classType: 萬能型
mainWeapon: 劍盾 / 雙持 / 弓
recommendedLevel: 第三章前
image: /images/characters/kliff.jpg   # 或 null
skills:
  - name: Force Palm
    level: 1
    effect: 能量攻擊，降低敵人防禦力
    cooldown: null
    note: 重要反制技
  - name: Evasive Roll
    level: 被動
    effect: 閃避翻滾
    cooldown: null
    note: 觀察裂角凱洛克習得
builds:
  - name: 劍盾建構
    description: 搭配盾牌使用，均衡攻守。新手推薦配置，格擋消耗體力較低。
    equipmentLinks:
      - text: 主之劍
        link: /guide/equipment/sword-of-the-lord
---
```

```vue
<!-- Source: 03-UI-SPEC.md CharacterTemplate rendered sections -->
<template>
  <div class="character-template">
    <!-- 1. Header: name (h1) + classType badge -->
    <!-- 2. Image or placeholder (200px height) -->
    <!-- 3. Info grid (3-col): 職業類型 / 主武器類型 / 推薦等級 -->
    <!-- 4. Skills table: 技能名稱 | 等級 | 效果 | 冷卻時間 | 備註 -->
    <!-- 5. Builds (card stack): name / description / equipmentLinks (comma-sep <a>) -->
    <!-- 6. <slot /> — Markdown prose -->
  </div>
</template>
<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
</script>
```

[VERIFIED: codebase — BossTemplate.vue, EquipmentTemplate.vue 同一模式]

### Pattern 2: EquipmentTemplate.vue — 沿用 + 小幅修正

D-04 決定直接沿用，但 UI-SPEC 指定兩處修改：

1. **Typography fix（`.build-name`）：** `font-size: 15px` → `font-size: 14px`（符合 4 級字型規模）
2. **CHAR-04 cross-link 擴展：** `builds[]` 新增可選 `characterLink` 欄位 → backward-compatible

```vue
<!-- Source: 03-UI-SPEC.md EquipmentTemplate Phase 3 addition -->
<!-- In the builds loop, after description: -->
<a v-if="build.characterLink" :href="withBase(build.characterLink)">查看適用職業</a>
```

### Pattern 3: 系統指南頁 — 純 Markdown，無新 Vue 元件

```markdown
<!-- Source: 03-UI-SPEC.md System Guide Page Layout -->
---
layout: doc
title: 精煉系統
---

# 精煉系統

[介紹段落]

## 基本流程
1. 步驟一...

## 材料與費用
| 材料 | 數量 | 來源 |
|------|------|------|

:::tip 提示
...
:::

## 相關裝備
[link list]
```

### Anti-Patterns to Avoid

- **不要建立 CharacterTemplate 使用 props 而非 frontmatter：** 專案統一使用 frontmatter + `useData()` 模式（所有既有模板均如此）
- **不要在 builds 卡片中使用 router-link：** 改用 `withBase()` + `<a :href>` 避免 SSR 問題
- **不要為系統指南頁建立新 Vue 元件：** 純 Markdown + VitePress custom containers 即足夠
- **不要在技能表格「效果」欄位放過長文字：** 限 ≤40 字，細節移至 Markdown slot
- **`example-equipment.md` 的處理：** 側邊欄已有此連結，需要保留原 slug 或將其重新命名，並更新 config.ts，否則舊連結 404

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 裝備索引排序/篩選 | 自建 Vue 篩選元件 | 標準 Markdown 表格分區 | v1 無互動篩選需求（v2 INTER-02）|
| 搜尋功能 | 自建搜尋 | VitePress 內建 MiniSearch（已配置中文斷詞）| Phase 1 已完成 |
| 角色比較表 | 自建比較元件 | 靜態 Markdown 表格 | v1 不需要 |
| 圖片 CDN | 自建圖片處理 | 直接放入 `public/images/` | 靜態網站無需複雜圖片管線 |
| 深淵核心資料庫 | 自建資料表格元件 | 系統指南頁內的 Markdown 表格 | v1 不需要互動查詢 |

**Key insight:** 本 Phase 所有「互動」需求均可用 VitePress Markdown + 既有模板滿足，不需新增 Vue 元件（除 CharacterTemplate 外）。

---

## Common Pitfalls

### Pitfall 1: `withBase()` 遺漏導致 GitHub Pages 連結 404

**What goes wrong:** 裝備頁建構推薦中的角色連結（`/guide/characters/kliff`）若未套用 `withBase()`，在 GitHub Pages（base: `/my-game/`）上會 404。
**Why it happens:** VitePress 的 `base` 配置不自動修改 Vue 模板中手寫的 href。
**How to avoid:** 所有 Vue 模板內部連結均使用 `withBase(link)`。Markdown 中的相對連結由 VitePress 自動處理。
**Warning signs:** 本機開發（base: `/`）正常但 GitHub Pages 404。

[VERIFIED: codebase — 現有模板均已使用 withBase]

### Pitfall 2: `example-equipment.md` slug 遺留問題

**What goes wrong:** `config.ts` 側邊欄和 `example-boss.md` 中的 `drops[].link` 已指向 `/guide/equipment/example-equipment`。若直接刪除/重命名此檔而未更新所有引用，會產生 404 死連結。
**Why it happens:** Phase 2.1 決策「example-*.md 保留文件名，替換內容」，但裝備頁 slug 重命名（sword-of-the-lord）需要同步更新所有引用。
**How to avoid:** 保留 `example-equipment.md`（或 rename 後同步更新所有引用與 config.ts）。
**Warning signs:** Build 成功但點連結後 404。

[VERIFIED: codebase — config.ts sidebar + example-boss.md drops link]

### Pitfall 3: CharacterTemplate class-type badge 背景色使用錯誤變數

**What goes wrong:** Class type badge（UI-SPEC 指定 `--vp-c-brand-soft` 背景 + `--vp-c-brand-1` 文字）若使用 difficulty-badge 的 CSS 類會產生顏色不一致。
**Why it happens:** BossTemplate 的 `difficulty-badge` 使用硬編碼顏色（`#4a9e4a` 等），不是 brand 色。
**How to avoid:** CharacterTemplate 使用新的 `.class-type-badge` scoped CSS 類，使用 CSS 變數而非硬編碼色值。
**Warning signs:** Badge 顯示為綠色/黃色/紅色而非品牌色。

[VERIFIED: codebase — custom.css difficulty-badge 規則]

### Pitfall 4: 技能「等級」欄位混用 number 與 string

**What goes wrong:** 部分技能無明確等級（被動技能），若 frontmatter 強制要求 `number` 型別，會造成 Vue TypeScript 型別錯誤或顯示 `NaN`。
**Why it happens:** 遊戲技能分主動/被動，被動無冷卻無等級數字。
**How to avoid:** frontmatter schema 中 `level: number | string`（如 `"被動"`）；模板中直接渲染為字串，無需型別轉換。

[CITED: 03-UI-SPEC.md frontmatter schema 已指定 number | string]

### Pitfall 5: 側邊欄缺少新頁面導致 404

**What goes wrong:** 建立了 `guide/characters/kliff.md` 但未在 `config.ts` 的 `/guide/characters/` sidebar 加入對應條目，使用者無法從側邊欄導航到該頁（搜尋可找到但無側邊欄入口）。
**Why it happens:** VitePress 不自動掃描頁面更新側邊欄，需手動維護。
**How to avoid:** 每新增一個 Markdown 頁面，同步更新 `config.ts` 對應 sidebar 區塊。
**Warning signs:** 頁面可透過直接 URL 訪問但側邊欄缺項。

[VERIFIED: codebase — config.ts 手動維護的 sidebar 結構]

---

## Code Examples

### CharacterTemplate.vue 完整骨架

```vue
<!-- Source: 03-UI-SPEC.md + 既有 BossTemplate/EquipmentTemplate 模式 -->
<template>
  <div class="character-template">
    <div class="character-header template-section">
      <h1>{{ frontmatter.name ?? '（未命名）' }}</h1>
      <span v-if="frontmatter.classType" class="class-type-badge">
        {{ frontmatter.classType }}
      </span>
    </div>

    <div class="character-image template-section">
      <img v-if="frontmatter.image" :src="frontmatter.image" :alt="frontmatter.name ?? ''" />
      <div v-else class="character-image-placeholder"><span>圖片尚未提供</span></div>
    </div>

    <div class="template-section">
      <h2>基本資訊</h2>
      <div class="boss-info-grid">
        <div class="template-card">
          <div class="info-label">角色類型</div>
          <div class="info-value">{{ frontmatter.classType ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">主要武器</div>
          <div class="info-value">{{ frontmatter.mainWeapon ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">推薦進度</div>
          <div class="info-value">{{ frontmatter.recommendedLevel ?? '—' }}</div>
        </div>
      </div>
    </div>

    <div v-if="frontmatter.skills?.length" class="template-section">
      <h2>技能列表</h2>
      <table>
        <thead>
          <tr><th>技能名稱</th><th>等級</th><th>效果</th><th>冷卻時間</th><th>備註</th></tr>
        </thead>
        <tbody>
          <tr v-for="skill in frontmatter.skills" :key="skill.name">
            <td>{{ skill.name }}</td>
            <td>{{ skill.level ?? '—' }}</td>
            <td>{{ skill.effect }}</td>
            <td>{{ skill.cooldown ?? '—' }}</td>
            <td>{{ skill.note ?? '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="frontmatter.builds?.length" class="template-section">
      <h2>建構推薦</h2>
      <div class="equipment-builds">
        <div v-for="build in frontmatter.builds" :key="build.name" class="template-card">
          <div class="build-name">{{ build.name }}</div>
          <div class="build-description">{{ build.description }}</div>
          <div v-if="build.equipmentLinks?.length" class="build-equipment-links">
            推薦裝備：
            <template v-for="(item, i) in build.equipmentLinks" :key="item.link">
              <a :href="withBase(item.link)">{{ item.text }}</a>
              <span v-if="i < build.equipmentLinks.length - 1">、</span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="template-section"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
</script>
```

### index.ts 元件註冊新增

```typescript
// Source: .vitepress/theme/index.ts 現有模式
import CharacterTemplate from './components/CharacterTemplate.vue'
// 在 enhanceApp 中新增：
app.component('CharacterTemplate', CharacterTemplate)
```

### config.ts sidebar 擴充（角色職業）

```typescript
// Source: config.ts 現有 sidebar 結構
'/guide/characters/': [
  {
    text: '角色職業',
    items: [
      { text: '角色職業索引', link: '/guide/characters/' },
      { text: '麥克道夫（Kliff）', link: '/guide/characters/kliff' },
      { text: '黛米安（Damiane）', link: '/guide/characters/damiane' },
      { text: '烏卡（Oongka）', link: '/guide/characters/oongka' },
    ]
  }
],
```

### config.ts sidebar 擴充（裝備圖鑑）

```typescript
'/guide/equipment/': [
  {
    text: '裝備圖鑑',
    items: [
      { text: '裝備一覽', link: '/guide/equipment/' },
      {
        text: '武器',
        collapsed: false,
        items: [
          { text: '主之劍', link: '/guide/equipment/sword-of-the-lord' },
          // ...
        ]
      },
      {
        text: '防具',
        collapsed: false,
        items: [ /* ... */ ]
      },
      {
        text: '飾品',
        collapsed: false,
        items: [ /* ... */ ]
      },
    ]
  }
],
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 角色職業佔位頁（「此內容正在撰寫中」） | CharacterTemplate + 真實 Kliff/Damiane/Oongka 資料 | Phase 3 | CHAR-01 完成 |
| 裝備佔位頁（example-equipment.md 範例資料）| 真實裝備資料頁 + 分類索引 | Phase 3 | CHAR-02 完成 |
| 系統機制佔位頁 | 精煉系統 + 製作系統完整指南 | Phase 3 | CHAR-03 完成 |
| 無角色↔裝備 cross-link | CharacterTemplate builds.equipmentLinks + EquipmentTemplate sources.link | Phase 3 | CHAR-04 完成 |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Oongka 的建構目前只有一個雙持建構（資料稀少，因後期解鎖） | Game Data: Characters | 若有更多建構需補充；首批頁面可用資料待補充標記 |
| A2 | 精煉等級上限為 10（0→+10） | Enhancement System | 若上限不同則系統指南頁需修正 |
| A3 | 個別武器的具體攻擊力數值需執行時再次搜尋確認 | Equipment Game Data | 數值若不準確需使用資料待補充標記 |
| A4 | `example-equipment.md` 現有連結（config.ts sidebar + example-boss.md）需同步更新 | Pitfall 2 | 若未同步更新導致 404，需額外修復任務 |
| A5 | 技能冷卻時間資料目前在主要來源尚不完整，多數需標記資料待補充 | Game Data: Characters skills | 若冷卻資料存在，技能表格精確度提升 |

---

## Open Questions (RESOLVED)

1. **`example-equipment.md` 的處理策略** — RESOLVED: Strategy A（保留 `example-equipment.md` 檔名，更新內容為主之劍真實資料，確保現有 config.ts sidebar 與 example-boss.md drops link 不斷裂）
   - What we know: 現有檔案 slug 為 `example-equipment`，config.ts sidebar 與 example-boss.md drops link 均引用它
   - Resolution: Plan 02 explicitly preserves the file path and updates content in-place.

2. **裝備頁面的數量規模** — RESOLVED: 每類別 3-5 件代表性裝備（早期/中期/強力各一），共約 4 頁。完整圖鑑在後續版本擴充。
   - What we know: 遊戲有 300+ 武器、數十件防具/飾品
   - Resolution: Plan 02 creates 4 equipment pages (1 existing + 3 new) covering weapon/armor/accessory categories.

3. **圖片儲存路徑與命名規則** — RESOLVED: D-09 deferred. 圖片搜集延後處理，Phase 3 使用 `image: null` + 佔位文字。路徑規則為 `public/images/characters/{slug}.jpg` 和 `public/images/equipment/{slug}.jpg`，待圖片搜集時使用。

---

## Environment Availability

> Step 2.6: SKIPPED — 此 Phase 為純靜態網站內容建立（Vue SFC + Markdown），無需外部資料庫、CLI 工具或服務。VitePress 開發環境已在 Phase 1 驗證。

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | VitePress build（無獨立單元測試框架）|
| Config file | `.vitepress/config.ts` |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CHAR-01 | CharacterTemplate 渲染角色技能/建構 | Build smoke | `npm run build` | ❌ Wave 0 (template file) |
| CHAR-02 | 裝備索引頁 + 裝備頁渲染 | Build smoke | `npm run build` | ❌ Wave 0 (content files) |
| CHAR-03 | 系統指南頁 enhancement.md + crafting.md 存在 | Build smoke | `npm run build` | ❌ Wave 0 (content files) |
| CHAR-04 | 裝備頁 sources[] link 指向有效目標 | Manual link check | `npm run preview` 手動確認 | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build`（確認無建置錯誤）
- **Per wave merge:** `npm run build && npm run preview`（手動驗證頁面渲染正確）
- **Phase gate:** Build green + 手動確認角色頁/裝備頁/系統指南頁所有 cross-link 有效

### Wave 0 Gaps

- [ ] `CharacterTemplate.vue` — 覆蓋 CHAR-01（需先建立才能 build）
- [ ] `guide/characters/kliff.md` + `damiane.md` + `oongka.md` — 覆蓋 CHAR-01
- [ ] `guide/equipment/[weapon].md` + `[armor].md` + `[accessory].md` — 覆蓋 CHAR-02
- [ ] `guide/systems/enhancement.md` + `crafting.md` — 覆蓋 CHAR-03
- [ ] `config.ts` sidebar 更新 — 覆蓋所有頁面可導航

---

## Security Domain

> `security_enforcement` 未設定 false，但本 Phase 為靜態網站純內容建立，無身份驗證、表單處理、使用者輸入、資料庫或 API 端點。適用 ASVS 項目極為有限。

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | 靜態網站，無身份驗證 |
| V3 Session Management | no | 靜態網站，無 session |
| V4 Access Control | no | 所有內容公開 |
| V5 Input Validation | no | 無使用者輸入表單 |
| V6 Cryptography | no | 無加密需求 |

**Threat relevant to Phase 3:** 唯一安全考量為圖片來源——從第三方 Wiki/網站下載圖片時需注意版權（非 ASVS 範疇但為法律風險）。建議優先使用官方 Pearl Abyss 媒體資源或公平使用的攻略截圖。

---

## Sources

### Primary (HIGH confidence)
- `codebase (.vitepress/)` — 現有模板結構、custom.css、config.ts、index.ts 直接驗證
- `03-UI-SPEC.md` — Phase 3 UI 設計合約，已由 gsd-ui-researcher 確認
- `02.1-RESEARCH.md` — Phase 2.1 遊戲資料研究，已執行的資料來源
- [game8.co/games/Crimson-Desert/archives/583000](https://game8.co/games/Crimson-Desert/archives/583000) — 所有可玩角色列表
- [game8.co/games/Crimson-Desert/archives/583162](https://game8.co/games/Crimson-Desert/archives/583162) — 最佳建構指南
- [game8.co/games/Crimson-Desert/archives/585471](https://game8.co/games/Crimson-Desert/archives/585471) — 所有技能列表
- [game8.co/games/Crimson-Desert/archives/582200](https://game8.co/games/Crimson-Desert/archives/582200) — 武器列表
- [game8.co/games/Crimson-Desert/archives/582201](https://game8.co/games/Crimson-Desert/archives/582201) — 防具列表
- [game8.co/games/Crimson-Desert/archives/586638](https://game8.co/games/Crimson-Desert/archives/586638) — 飾品列表
- [game8.co/games/Crimson-Desert/archives/587627](https://game8.co/games/Crimson-Desert/archives/587627) — 精煉系統指南

### Secondary (MEDIUM confidence)
- [powerupgaming.co.uk/2026/03/30/crimson-desert-refining-and-enhancing-gear-guide/](https://powerupgaming.co.uk/2026/03/30/crimson-desert-refining-and-enhancing-gear-guide/) — 精煉等級 0-10 + 材料細節
- [method.gg/crimson-desert/crimson-desert-classes-combat-skills-and-playable-characters](https://www.method.gg/crimson-desert/crimson-desert-classes-combat-skills-and-playable-characters) — 角色/技能系統總覽
- [crimsondesertgame.wiki.fextralife.com/Armor](https://crimsondesertgame.wiki.fextralife.com/Armor) — 防具分類（5 槽確認）
- [neonlightsmedia.com — all skills guide](https://www.neonlightsmedia.com/blog/crimson-desert-all-skills-characters-guide) — 技能樹結構確認

### Tertiary (LOW confidence)
- General web search results for crafting system — 多來源交叉印證，具體手冊數 (355) 需執行時確認
- Oongka build data — 來源較少，標記 ASSUMED

---

## Metadata

**Confidence breakdown:**
- Standard stack (VitePress patterns): HIGH — codebase 直接驗證，既有模板完整
- CharacterTemplate design: HIGH — UI-SPEC 已完全規格化
- Game data (characters): MEDIUM — game8.co 為 HIGH，技能冷卻資料不完整
- Game data (equipment): MEDIUM — 分類確認 HIGH，具體數值 MEDIUM
- Enhancement/crafting systems: MEDIUM — 主要流程 HIGH，材料細節/等級 MEDIUM

**Research date:** 2026-04-11
**Valid until:** 2026-05-11（遊戲發售中，社群資料持續更新，約 30 天有效期）
