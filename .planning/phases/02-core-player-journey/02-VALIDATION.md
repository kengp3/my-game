---
phase: 02
slug: core-player-journey
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-10
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | VitePress build validation + manual browser verification |
| **Config file** | docs/.vitepress/config.ts |
| **Quick run command** | `npm run docs:build` |
| **Full suite command** | `npm run docs:build && echo "Build OK"` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run docs:build`
- **After every plan wave:** Run `npm run docs:build && echo "Build OK"`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | COMBAT-01 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | COMBAT-01 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | STORY-01 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | STORY-02 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 2 | COMBAT-01, STORY-01, STORY-02 | — | N/A | build | `npm run docs:build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements. VitePress build validation from Phase 1 is sufficient.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Combat guide pages render correctly with template | COMBAT-01 | Visual layout verification | Open combat guide pages in browser, verify template renders |
| Story chapter navigation works (prev/next) | STORY-01 | Navigation flow verification | Click through chapter prev/next links in browser |
| Choice point component displays correctly | STORY-02 | Interactive component verification | Open story chapter with choices, verify ChoicePoint renders |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
