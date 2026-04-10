# Roadmap: 赤血沙漠攻略 Wiki

## Overview

從 VitePress 站台骨架開始，依序建立戰鬥基礎與主線劇情核心攻略、角色裝備體系、Boss 進階攻略，最後完成地圖探索與支線任務等收集向內容。每個階段交付可獨立驗證的完整功能區塊，後續階段透過交叉連結串接前期內容。

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Site Foundation** - VitePress 站台架設、模板系統、部署管線、搜尋與響應式設計 (completed 2026-04-09)
- [ ] **Phase 2: Core Player Journey** - 戰鬥基礎教學與主線劇情章節攻略
- [ ] **Phase 3: Characters & Equipment** - 角色職業介紹、裝備圖鑑、強化與製作系統
- [ ] **Phase 4: Boss Guides & Advanced Combat** - Boss 詳細攻略、高難度挑戰、交叉連結
- [ ] **Phase 5: Maps, Exploration & Side Content** - 區域地圖指南、隱藏區域、收集品、支線與隱藏任務

## Phase Details

### Phase 1: Site Foundation
**Goal**: 玩家可以存取一個結構完整、可搜尋、響應式的攻略網站框架
**Depends on**: Nothing (first phase)
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04, SITE-05
**Success Criteria** (what must be TRUE):
  1. 使用者可在瀏覽器開啟網站，看到頂部導航和側邊欄分類結構
  2. 使用者可在搜尋框輸入中文關鍵字，找到對應的攻略頁面
  3. 推送 commit 到 GitHub 後，網站在數分鐘內自動更新上線
  4. 網站包含 Boss、裝備、區域三種內容模板，新頁面可直接套用
  5. 使用者可在手機上正常瀏覽所有頁面，排版不跑版
**Plans**: 3 plans
**UI hint**: yes

Plans:
- [x] 01-01-PLAN.md — VitePress 初始化、主題配色、導航架構、首頁與內容佔位頁
- [x] 01-02-PLAN.md — Boss/裝備/區域三種 Vue SFC 內容模板與範例頁面
- [x] 01-03-PLAN.md — GitHub Actions 部署 workflow、搜尋與響應式驗證

### Phase 2: Core Player Journey
**Goal**: 玩家可以查閱戰鬥基礎操作教學，並按章節順序跟隨主線劇情攻略推進遊戲
**Depends on**: Phase 1
**Requirements**: COMBAT-01, STORY-01, STORY-02
**Success Criteria** (what must be TRUE):
  1. 使用者可閱讀完整的戰鬥系統教學，理解操作、連招和防禦機制
  2. 使用者可按章節順序瀏覽主線劇情流程，每章有清晰的推進指引
  3. 每章攻略包含關鍵選擇點說明與建議推進順序
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Vue SFC 模板建立（CombatGuideTemplate、StoryChapterTemplate、ChoicePoint）與全域註冊
- [x] 02-02-PLAN.md — 戰鬥教學內容頁面（基礎操作、連招系統、防禦與格擋）與新手入門索引更新
- [x] 02-03-PLAN.md — 主線劇情章節頁面（第一至三章含選擇點）、劇情索引更新與側邊欄配置

### Phase 02.1: Real Game Data Research — 從網路搜集赤血沙漠真實遊戲資料，替換所有佔位內容為真實資訊 (INSERTED)

**Goal:** 所有現有攻略頁面的佔位內容替換為真實遊戲資料，劇情章節擴充至真實遊戲的 14 段（序幕+12章），戰鬥教學使用正確鍵位和機制
**Requirements**: D-01, D-02, D-03, D-04, D-05, D-06, D-07, D-08
**Depends on:** Phase 2
**Plans:** 5/5 plans complete

Plans:
- [x] 02.1-01-PLAN.md — 戰鬥教學三頁替換為真實鍵位和機制（招架核心、觀察學習、9+武器類型）
- [x] 02.1-02-PLAN.md — Boss/裝備/區域範例頁替換為真實資料（裂角凱洛克、主之劍、埃爾南德）
- [x] 02.1-03-PLAN.md — 序幕新建 + 劇情第1-3章改寫為真實遊戲劇情
- [x] 02.1-04-PLAN.md — 劇情第4-8章新建（知識的代價、不速之客、盾牌的裂縫、歸鄉、血色加冕）
- [x] 02.1-05-PLAN.md — 劇情第9-12章新建 + config.ts 側邊欄更新 + 所有索引頁更新

### Phase 3: Characters & Equipment
**Goal**: 玩家可以查閱完整的角色建構資訊與裝備圖鑑，規劃自己的角色配置
**Depends on**: Phase 2
**Requirements**: CHAR-01, CHAR-02, CHAR-03, CHAR-04
**Success Criteria** (what must be TRUE):
  1. 使用者可查閱每個角色/職業的技能樹與建構推薦方案
  2. 使用者可瀏覽完整裝備圖鑑，查看武器、防具、飾品的屬性與取得方式
  3. 使用者可查閱裝備強化和製作系統的完整流程說明
  4. 每個裝備頁面包含取得地點連結（Boss 掉落、商店、製作來源）
**Plans**: 3 plans
**UI hint**: yes

Plans:
- [ ] 03-01-PLAN.md — CharacterTemplate.vue 建立、3 個角色頁面（Kliff/Damiane/Oongka）與角色索引
- [ ] 03-02-PLAN.md — EquipmentTemplate 更新、代表性裝備頁面（武器/防具/飾品）與裝備索引
- [ ] 03-03-PLAN.md — 精煉與製作系統指南頁、系統索引更新、全 Phase 3 側邊欄配置

### Phase 4: Boss Guides & Advanced Combat
**Goal**: 玩家可以查閱每個 Boss 的詳細攻略與高難度挑戰技巧，頁面串連相關裝備與區域
**Depends on**: Phase 3
**Requirements**: COMBAT-02, COMBAT-03, COMBAT-04
**Success Criteria** (what must be TRUE):
  1. 使用者可查閱每個 Boss 的弱點、攻擊模式與推薦裝備組合
  2. 使用者可查閱高難度挑戰的專門攻略與進階技巧
  3. 每個 Boss 攻略頁面包含連結到相關掉落裝備頁和所在區域頁
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD
- [ ] 04-03: TBD

### Phase 5: Maps, Exploration & Side Content
**Goal**: 玩家可以查閱完整的區域探索指南、支線任務與收集品資訊，達成全收集目標
**Depends on**: Phase 4
**Requirements**: MAP-01, MAP-02, MAP-03, MAP-04, STORY-03, STORY-04
**Success Criteria** (what must be TRUE):
  1. 使用者可查閱每個區域的地圖指南，包含敵人分布、NPC 位置與重要地點
  2. 使用者可查閱隱藏區域的位置與進入方式
  3. 使用者可查閱寶箱位置、內容物清單，並使用收集品指南追蹤全收集進度
  4. 使用者可查閱所有支線任務的觸發條件、流程和獎勵
  5. 使用者可查閱隱藏任務和彩蛋的觸發條件與完成方式
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD
- [ ] 05-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Site Foundation | 3/3 | Complete   | 2026-04-09 |
| 2. Core Player Journey | 0/3 | Not started | - |
| 02.1. Real Game Data Research | 5/5 | Complete    | 2026-04-10 |
| 3. Characters & Equipment | 0/3 | Not started | - |
| 4. Boss Guides & Advanced Combat | 0/3 | Not started | - |
| 5. Maps, Exploration & Side Content | 0/3 | Not started | - |
