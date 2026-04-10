---
layout: doc
title: 基礎操作教學
difficulty: 初階
prerequisites:
  - 無特殊前置知識
keybindings:
  - action: 移動
    key: WASD / 左搖桿
    note: 按住 Shift 可衝刺（消耗體力）
  - action: 輕攻擊
    key: 滑鼠左鍵 / 方形鍵(PS) / X鍵(Xbox)
    note: 連按可觸發基礎連段
  - action: 重攻擊
    key: 滑鼠右鍵 / 三角鍵(PS) / Y鍵(Xbox)
    note: 蓄力時間較長但傷害更高
  - action: 閃避
    key: Alt / 圓形鍵(PS) / B鍵(Xbox)
    note: 有無敵幀，消耗體力
  - action: 格擋
    key: Ctrl（長按）/ L1(PS) / LB(Xbox)
    note: 長按持續格擋，消耗體力
  - action: 硬鎖定目標
    key: Caps Lock / R3
    note: 建議改映射至 Tab
  - action: 掌擊（Force Palm）
    key: 滑鼠中鍵（長按）
    note: 重要反制技，可打斷敵人動作
  - action: 軸力（Axion Force）
    key: Tab（長按）
    note: 建議改映射至 R
  - action: 遠程瞄準/射擊
    key: Q
    note: 切換遠程武器後使用
  - action: 召喚坐騎
    key: H
    note: ""
  - action: 蹲伏/滑行
    key: C
    note: ""
  - action: 收刀
    key: T
    note: ""
tips:
  - 格擋（Ctrl）和閃避（Alt）是兩個獨立的防禦系統，格擋可觸發招架反制，閃避用於迴避不可格擋攻擊
  - 衝刺、閃避、格擋和攀爬均消耗體力條，體力耗盡會進入大硬直，注意體力管理
  - 鎖定目標後攻擊會自動追蹤，建議對 Boss 戰使用硬鎖定
  - 掌擊（Force Palm）是最重要的反制技之一，可在敵人攻擊前搖時長按中鍵發動
  - 「觀察學習」系統：觀察 Boss 使用特定技能後，可習得該技能供自己使用
relatedPages:
  - text: 連招系統
    link: /guide/beginner/combat-combos
  - text: 防禦與招架
    link: /guide/beginner/combat-defense
---

<CombatGuideTemplate />

## 移動系統詳解

赤血沙漠採用開放世界設計，移動系統是探索的核心。使用 WASD 或左搖桿進行基礎移動，按住 Shift 可進入衝刺狀態。按下 Space 跳躍，按 C 蹲伏或滑行。召喚坐騎使用 H 鍵，可大幅提升移動效率。

### 體力管理

體力值影響衝刺、閃避、格擋和攀爬動作。當體力完全耗盡時，角色將進入大硬直狀態，無法執行任何防禦或閃避動作。體力耗盡在戰鬥中極為危險，合理分配體力是生存的關鍵。與初期概念不同，**體力耗盡的懲罰比一般 ARPG 更嚴重**，需時刻留意體力條。

## 攻擊基礎

赤血沙漠的攻擊系統以方向 + 按鍵的組合技為核心，而非單純的輕重攻擊連擊鏈。

- **輕攻擊**（滑鼠左鍵）：連按可觸發基礎連段，段數依武器類型而異
- **重攻擊**（滑鼠右鍵）：可蓄力，蓄力越充分傷害越高
- **方向組合**：移動方向 + 攻擊鍵會產生不同招式（前進攻擊、側方攻擊等）
- **閃避接攻擊**：閃避後立即按輕攻擊可觸發特殊閃避攻擊招式

不同武器類型有完全不同的連招路線和段數，詳情請參閱[連招系統](/guide/beginner/combat-combos)頁面。

## 觀察學習系統

「觀察學習」（Observe & Learn）是赤血沙漠最獨特的戰鬥機制之一。當 Boss 或特定敵人使用某項技能時，麥克道夫會自動觀察並記錄該技能。在累積足夠觀察次數後，便可習得並使用該技能。

**示例：** 在序幕 Boss 馬提亞斯（Matthias）戰中，觀察其「泵踢（Pump Kick）」攻擊後，便可習得此技能。學成後對馬提亞斯使用泵踢，可造成大量硬直，是攻略該 Boss 的重要策略。

觀察學習的技能會整合進你的連招體系，讓連段選擇更加豐富。

::: tip 掌擊（Force Palm）是關鍵反制技
長按滑鼠中鍵可發動掌擊（Force Palm），在敵人攻擊前搖期間使用可打斷其動作，使敵人硬直。掌擊也是觸發「觀察學習」的必要操作——在敵人使用技能的前搖時發動掌擊，即可開始學習。
:::
