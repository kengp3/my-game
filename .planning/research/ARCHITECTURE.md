# Architecture Research — 赤血沙漠 Game Guide Wiki

## Content Taxonomy

```
赤血沙漠攻略 Wiki
├── 首頁 (總覽 + 快速連結)
├── 新手入門/
│   ├── 遊戲介紹
│   ├── 操作指南
│   └── 新手建議
├── 主線劇情/
│   ├── 序章
│   ├── 第一章
│   ├── ...
│   └── 結局
├── 支線任務/
│   ├── 按區域分類
│   └── 按類型分類
├── Boss 攻略/
│   ├── 主線 Boss
│   ├── 支線 Boss
│   └── 隱藏 Boss
├── 角色與職業/
│   ├── 職業總覽
│   ├── 技能樹
│   └── 推薦建構
├── 裝備圖鑑/
│   ├── 武器
│   ├── 防具
│   ├── 飾品
│   └── 消耗品
├── 地圖探索/
│   ├── 區域一覽
│   ├── 隱藏區域
│   └── 收集品指南
└── 系統機制/
    ├── 戰鬥系統
    ├── 強化/製作
    └── 其他系統
```

## File Structure (VitePress)

```
my-game/
├── .vitepress/
│   ├── config.ts          # 站台設定、導航、側邊欄
│   └── theme/
│       └── index.ts       # 自訂主題擴展
├── public/
│   ├── images/
│   │   ├── bosses/        # Boss 圖片
│   │   ├── equipment/     # 裝備圖片
│   │   └── maps/          # 地圖圖片
│   └── favicon.ico
├── guide/
│   ├── index.md           # 首頁
│   ├── beginner/
│   │   ├── introduction.md
│   │   ├── controls.md
│   │   └── tips.md
│   ├── story/
│   │   ├── index.md       # 劇情總覽
│   │   ├── prologue.md
│   │   ├── chapter-1.md
│   │   └── ...
│   ├── sidequests/
│   │   ├── index.md
│   │   └── [area-name].md
│   ├── bosses/
│   │   ├── index.md       # Boss 列表
│   │   └── [boss-name].md
│   ├── characters/
│   │   ├── index.md       # 職業總覽
│   │   └── [class-name].md
│   ├── equipment/
│   │   ├── index.md
│   │   ├── weapons.md
│   │   ├── armor.md
│   │   └── accessories.md
│   ├── maps/
│   │   ├── index.md
│   │   └── [area-name].md
│   └── systems/
│       ├── combat.md
│       ├── crafting.md
│       └── enhancement.md
├── package.json
└── .planning/             # GSD planning (not deployed)
```

## Navigation Design

### Top Nav
- 首頁 | 新手入門 | 主線劇情 | Boss攻略 | 角色職業 | 裝備圖鑑 | 地圖探索 | 系統機制

### Sidebar (per section)
- 每個頂級分類有獨立側邊欄
- 自動從目錄結構生成
- 支援展開/收合

### Cross-linking
- Boss 頁面連結到掉落裝備
- 裝備頁面連結到取得地點/Boss
- 任務頁面連結到相關區域
- 區域頁面連結到該區域 Boss 和任務

## Content Dependencies

| 內容 | 依賴 | Build Order |
|------|------|-------------|
| 站台骨架 | 無 | Phase 1 |
| 新手入門 | 站台骨架 | Phase 2 |
| 系統機制 | 站台骨架 | Phase 2 |
| 主線劇情 | 站台骨架 | Phase 3 |
| 角色/職業 | 系統機制 | Phase 3 |
| Boss 攻略 | 角色/職業, 主線劇情 | Phase 4 |
| 裝備圖鑑 | Boss 攻略 (掉落) | Phase 4 |
| 地圖探索 | 主線劇情, 裝備圖鑑 | Phase 5 |
| 支線任務 | 地圖探索, 主線劇情 | Phase 5 |

## Build Order Rationale

1. **Phase 1 — 基礎建設**: VitePress 設定、主題、部署流程
2. **Phase 2 — 基礎內容**: 新手入門 + 系統機制（無依賴，可獨立）
3. **Phase 3 — 核心攻略**: 主線劇情 + 角色職業（攻略核心）
4. **Phase 4 — 戰鬥裝備**: Boss 攻略 + 裝備圖鑑（互相關聯）
5. **Phase 5 — 探索內容**: 地圖探索 + 支線任務（需要前面內容支撐交叉連結）
