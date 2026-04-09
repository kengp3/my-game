# Pitfalls Research — 赤血沙漠 Game Guide Wiki

## Content Pitfalls

### 1. 資訊不準確或過時
- **Warning signs**: 攻略與玩家回饋不符、遊戲更新後數值改變
- **Prevention**: 每頁標註資料來源和遊戲版本、設置「最後更新」時間戳
- **Phase**: 所有內容相關 Phase

### 2. 資料來源不可靠
- **Warning signs**: 不同來源數據矛盾、無法交叉驗證
- **Prevention**: 優先使用官方資料，多來源交叉比對，標註信心等級
- **Phase**: Phase 2-5（所有內容階段）

### 3. 內容範圍失控 (Scope Creep)
- **Warning signs**: 單頁攻略過長、開始收錄瑣碎細節
- **Prevention**: 每頁有明確範圍定義、設立字數/內容深度指引
- **Phase**: Planning（在規劃時設定邊界）

### 4. 攻略結構不一致
- **Warning signs**: 不同 Boss 攻略的格式差異大、資訊找不到
- **Prevention**: 使用模板（Boss 模板、裝備模板、區域模板）
- **Phase**: Phase 1（建立模板系統）

## Technical Pitfalls

### 5. 圖片/媒體過大導致載入慢
- **Warning signs**: 頁面載入超過 3 秒、大量未壓縮圖片
- **Prevention**: 圖片壓縮流程、使用 WebP 格式、lazy loading
- **Phase**: Phase 1（建置流程中加入圖片最佳化）

### 6. 搜尋功能對中文效果差
- **Warning signs**: 搜不到已知內容、分詞錯誤
- **Prevention**: 測試中文搜尋效果、考慮 jieba 分詞、增加同義詞
- **Phase**: Phase 1（搜尋設定）

### 7. URL 設計不當
- **Warning signs**: 中文 URL 被編碼成亂碼、URL 太長
- **Prevention**: 使用英文 slug、保持 URL 簡短有意義
- **Phase**: Phase 1（URL 策略）

## Process Pitfalls

### 8. 完美主義導致進度停滯
- **Warning signs**: 長時間停在某一頁、反覆修改已完成內容
- **Prevention**: 先求完整再求完美、設定每頁時間上限
- **Phase**: 整體流程管控

### 9. 缺乏交叉連結
- **Warning signs**: 頁面孤立、玩家需要手動搜尋相關內容
- **Prevention**: 每頁底部加「相關內容」區塊、建立連結檢查機制
- **Phase**: Phase 4-5（內容夠多時建立連結）

### 10. 版權問題
- **Warning signs**: 直接複製其他攻略網站內容、使用官方截圖
- **Prevention**: 原創撰寫、截圖使用合理使用原則、標註來源
- **Phase**: 整體（從一開始就注意）

## Prevention Strategies Summary

| Priority | Strategy | When |
|----------|----------|------|
| Critical | 建立內容模板 | Phase 1 |
| Critical | 資料來源標註系統 | Phase 1 |
| High | 圖片最佳化流程 | Phase 1 |
| High | 中文搜尋測試 | Phase 1 |
| Medium | 交叉連結規範 | Phase 4+ |
| Medium | 定期內容審查 | 每 Phase 結束 |
| Low | 版本追蹤標記 | 所有 Phase |
