---
phase: 3
slug: characters-equipment
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | VitePress build (vite + vue) |
| **Config file** | `.vitepress/config.ts` |
| **Quick run command** | `npm run docs:build 2>&1 | tail -20` |
| **Full suite command** | `npm run docs:build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run docs:build 2>&1 | tail -20`
- **After every plan wave:** Run `npm run docs:build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CHAR-01 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | CHAR-02 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | CHAR-03 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | CHAR-04 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. VitePress build validates Vue SFC compilation, frontmatter parsing, and cross-link resolution.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 角色頁面視覺呈現正確 | CHAR-01 | Vue 元件渲染需瀏覽器驗證 | Open character page in browser, verify all sections render |
| 裝備圖鑑索引分類正確 | CHAR-02 | 側邊欄結構需視覺確認 | Navigate equipment index, verify category grouping |
| Cross-link 可正確跳轉 | CHAR-04 | 連結功能需瀏覽器互動驗證 | Click equipment source links, verify navigation to boss/area pages |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
