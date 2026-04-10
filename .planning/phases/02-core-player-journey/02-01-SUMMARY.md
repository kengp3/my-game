---
phase: 02-core-player-journey
plan: 01
subsystem: ui
tags: [vue, vitepress, sfc, combat-template, story-template, choice-point]

# Dependency graph
requires:
  - phase: 01-site-foundation
    provides: VitePress theme with BossTemplate/EquipmentTemplate/AreaTemplate patterns, custom.css, theme/index.ts
provides:
  - CombatGuideTemplate Vue SFC for combat tutorial pages
  - StoryChapterTemplate Vue SFC for story chapter pages
  - ChoicePoint inline component for branching choice display
  - Global registration of all 6 components in theme/index.ts
  - Combat tutorial difficulty badge levels in custom.css
affects: [02-02-PLAN, 02-03-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns: [props-based inline component (ChoicePoint), details-based consequence toggle]

key-files:
  created:
    - .vitepress/theme/components/CombatGuideTemplate.vue
    - .vitepress/theme/components/StoryChapterTemplate.vue
    - .vitepress/theme/components/ChoicePoint.vue
  modified:
    - .vitepress/theme/index.ts
    - .vitepress/theme/custom.css
    - .vitepress/theme/components/BossTemplate.vue
    - .vitepress/theme/components/AreaTemplate.vue

key-decisions:
  - "info-value font-size updated from 15px to 16px in BossTemplate and AreaTemplate scoped styles (not custom.css) per UI-SPEC revision"
  - "ChoicePoint implemented as props-based component (not frontmatter-based) for inline reuse within StoryChapterTemplate"

patterns-established:
  - "Props-based inline component pattern: ChoicePoint accepts props directly, unlike page templates that use useData()"
  - "Native details element for collapsible content within Vue SFC (not VitePress container syntax)"

requirements-completed: [COMBAT-01, STORY-01, STORY-02]

# Metrics
duration: 3min
completed: 2026-04-10
---

# Phase 2 Plan 01: Component Templates Summary

**Three Vue SFC components (CombatGuideTemplate, StoryChapterTemplate, ChoicePoint) with global registration and combat difficulty badge CSS**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-10T00:39:36Z
- **Completed:** 2026-04-10T00:42:51Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Created CombatGuideTemplate with difficulty badge, prerequisites pills, keybindings table, tips list, and related pages strip
- Created StoryChapterTemplate with chapter number badge, area chips, boss links, and embedded ChoicePoint rendering from frontmatter choices
- Created ChoicePoint as a props-based inline component with collapsible consequence toggle via native details element and recommended badge
- Registered all 6 components globally in theme/index.ts (3 existing + 3 new)
- Added combat tutorial difficulty badge levels (初階/中階/進階) to custom.css
- Updated info-value font-size from 15px to 16px per UI-SPEC typography revision

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CombatGuideTemplate, StoryChapterTemplate, and ChoicePoint Vue SFC components** - `4bf5bd4` (feat)
2. **Task 2: Register new components globally and extend custom.css** - `a4748ad` (feat)

## Files Created/Modified
- `.vitepress/theme/components/CombatGuideTemplate.vue` - Combat tutorial page template (136 lines)
- `.vitepress/theme/components/StoryChapterTemplate.vue` - Story chapter page template (132 lines)
- `.vitepress/theme/components/ChoicePoint.vue` - Inline choice point with consequence toggle (114 lines)
- `.vitepress/theme/index.ts` - Global registration of all 6 components
- `.vitepress/theme/custom.css` - Added 初階/中階/進階 difficulty badge levels
- `.vitepress/theme/components/BossTemplate.vue` - info-value font-size 15px to 16px
- `.vitepress/theme/components/AreaTemplate.vue` - info-value font-size 15px to 16px

## Decisions Made
- Updated info-value font-size in BossTemplate and AreaTemplate scoped styles (where the rule actually lives) rather than custom.css (where the plan specified but rule did not exist) -- the UI-SPEC revision required 16px, and the 15px declarations were in component scoped styles
- ChoicePoint implemented as props-based component per RESEARCH.md Pattern 4 recommendation, with StoryChapterTemplate rendering it from frontmatter choices array

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] info-value update location corrected**
- **Found during:** Task 2 (CSS updates)
- **Issue:** Plan specified updating `.info-value` font-size in `custom.css`, but the `.info-value` rule only exists in BossTemplate.vue and AreaTemplate.vue scoped styles, not in custom.css
- **Fix:** Updated `.info-value` font-size from 15px to 16px in both BossTemplate.vue and AreaTemplate.vue scoped style blocks
- **Files modified:** `.vitepress/theme/components/BossTemplate.vue`, `.vitepress/theme/components/AreaTemplate.vue`
- **Verification:** Build passes, grep confirms 16px in both files
- **Committed in:** a4748ad (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix was necessary because the CSS rule lived in scoped styles, not in the global stylesheet. Same visual outcome achieved.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three component templates are globally registered and ready for use in Markdown content pages
- Plans 02 and 03 can now create combat tutorial and story chapter Markdown pages using these templates
- ChoicePoint is available both within StoryChapterTemplate (via frontmatter choices) and as a standalone global component in any Markdown page

## Self-Check: PASSED

All files found. All commits verified.

---
*Phase: 02-core-player-journey*
*Completed: 2026-04-10*
