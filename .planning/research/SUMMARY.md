# Research Summary — 赤血沙漠 Game Guide Wiki

## Key Findings

### Stack
- **VitePress** 為最佳選擇：Markdown-first、CJK 支援好、內建搜尋、免費部署到 GitHub Pages
- 內容以 Markdown 撰寫，可嵌入 Vue 元件做互動內容
- 避免 MediaWiki/WordPress 等需要伺服器的方案

### Table Stakes Features
- 全文搜尋（含中文支援）
- 響應式設計（手機/桌面）
- 清晰分類導航（側邊欄 + 麵包屑）
- 完整主線/Boss/角色/裝備/地圖攻略

### Architecture
- 8 大內容分類：新手入門、主線劇情、支線任務、Boss攻略、角色職業、裝備圖鑑、地圖探索、系統機制
- 內容模板化確保一致性
- 交叉連結（Boss → 裝備掉落 → 地圖位置）

### Critical Pitfalls
1. **資訊準確性** — 資料來自網路，需交叉比對、標註來源
2. **中文搜尋** — 需測試分詞效果，可能需要額外配置
3. **內容模板** — 必須在 Phase 1 建立，否則後續格式不一致
4. **Scope creep** — 攻略內容可以無限擴展，需設定邊界

## Recommended Build Order

| Phase | Focus | Rationale |
|-------|-------|-----------|
| 1 | VitePress 站台骨架 + 模板 | 基礎建設，所有內容依賴此 |
| 2 | 新手入門 + 系統機制 | 無依賴，可獨立完成 |
| 3 | 主線劇情 + 角色職業 | 攻略核心內容 |
| 4 | Boss 攻略 + 裝備圖鑑 | 互相關聯，需要角色/劇情支撐 |
| 5 | 地圖探索 + 支線任務 | 需要前面內容支撐交叉連結 |
| 6 | 優化 + 部署 | 搜尋調校、效能優化、正式上線 |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 遊戲資訊不足/不準確 | High | 多來源交叉比對、標註信心等級 |
| 中文搜尋效果差 | Medium | 早期測試、備選 Algolia |
| 內容規模過大 | Medium | 分 Phase 執行、先完成核心 |
| 圖片版權 | Low | 原創截圖或合理使用 |

## Inputs for Requirements

From this research, the following should be formalized as requirements:
1. VitePress 靜態站台（非動態伺服器）
2. 8 大內容分類的完整攻略
3. 內容模板系統（Boss、裝備、區域模板）
4. 繁體中文全文搜尋
5. 響應式設計
6. GitHub Pages 部署
7. 資料來源標註
8. 交叉連結系統
