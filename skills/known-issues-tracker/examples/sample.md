# Known Issues Tracker - Sample Formats

This file contains sample formats used by the known-issues-tracker skill.

---

## KNOWN_ISSUES.md Sample

```markdown
# Known Issues

_Last Updated: YYYY-MM-DD HH:MM_

---

## Issue Index

| ID | Priority | Status | Title | Introduced | Fixed | Created | Resolved |
|----|----------|--------|-------|------------|-------|---------|----------|
| 001 | High | Open | [Issue title] | v1.2.0 | - | YYYY-MM-DD | - |
| 002 | Medium | Resolved | [Issue title] | v1.1.0 | v1.3.0 | YYYY-MM-DD | YYYY-MM-DD |

---

## Issue Details

### 001: [Issue Title]
- **Priority**: High
- **Status**: Open
- **Introduced**: v1.2.0 (auto-detected)
- **Created**: YYYY-MM-DD
- **Original Problem**: [DETAILED description of what was wrong]
- **Context**: [Where/when this occurs, affected components]
- **Root Cause**: [Analysis of why this happens - if known]
- **Proposed Solution**: [Optional: how to fix it]

### 002: [Issue Title] (RESOLVED)
- **Priority**: Medium
- **Status**: Resolved
- **Introduced**: v1.1.0 (auto-detected)
- **Fixed**: v1.3.0 (auto-detected)
- **Created**: YYYY-MM-DD
- **Original Problem**: [DETAILED description of what was wrong]
- **Context**: [Where/when this occurs, affected components]
- **Root Cause**: [Analysis of why this happens]
- **Resolution**: [DETAILED explanation of how it was fixed]
- **Resolution Date**: YYYY-MM-DD
- **Files Changed**: [List of files modified to fix this issue]
- **Tests Added**: [Any tests added to prevent regression]

---

## Summary
- Total: X (Y Open, Z Resolved)
- Highest Priority Open: [Issue ID] - [Title] (or "None")
```

---

## Empty KNOWN_ISSUES.md Sample

```markdown
# Known Issues

_Last Updated: [Current DateTime]_

---

## Issue Index

| ID | Priority | Status | Title | Introduced | Fixed | Created | Resolved |
|----|----------|--------|-------|------------|-------|---------|----------|
| _No issues tracked yet_

---

## Issue Details

_No issue details yet_

---

## Summary
- Total: 0 (0 Open, 0 Resolved)
- Highest Priority Open: None
```

---

## Open Issue Detail Sample

```markdown
### [ID]: [Issue Title]
- **Priority**: High / Medium / Low
- **Status**: Open
- **Introduced**: [Auto-detected version, e.g., v1.2.0]
- **Created**: YYYY-MM-DD
- **Original Problem**: [REQUIRED - Detailed description of what's wrong]
  - What is the current (broken) behavior?
  - What is the expected behavior?
  - How to reproduce the issue?
- **Context**: [Where/when this occurs]
- **Root Cause**: [If known - analysis of why this happens]
- **Proposed Solution**: [Optional - suggested fix approach]
```

---

## Resolved Issue Detail Sample

```markdown
### [ID]: [Issue Title] (RESOLVED)
- **Priority**: High / Medium / Low
- **Status**: Resolved
- **Introduced**: [Auto-detected version when issue was added]
- **Fixed**: [Auto-detected version when issue was resolved]
- **Created**: YYYY-MM-DD
- **Original Problem**: [MUST be preserved - do NOT delete or summarize]
  - What was wrong?
  - What was the expected behavior?
- **Context**: [Where/when it occurred]
- **Root Cause**: [Analysis of why it happened]
- **Resolution**: [REQUIRED - Detailed explanation of the fix]
  - What was changed?
  - Why this approach was chosen?
  - Any trade-offs or limitations?
- **Resolution Date**: YYYY-MM-DD
- **Files Changed**: [List of files modified]
- **Tests Added**: [Any tests to prevent regression]
```

---

## Archive File Sample

**File**: `ISSUES_ARCHIVED.md`

```markdown
# Archived Issues

_Archive Created: YYYY-MM-DD_

---

## 2024-01 Archived Issues

### 001: [Issue Title] (RESOLVED 2024-01-15)
- **Priority**: High
- **Status**: Resolved
- **Introduced**: v1.1.0
- **Fixed**: v1.2.0
- **Created**: 2024-01-10
- **Original Problem**: Touch event not firing on iOS Safari...
- **Resolution**: Added touch-action: manipulation...
- **Resolution Date**: 2024-01-15
- **Files Changed**: src/components/Button.styles.ts

### 003: [Issue Title] (RESOLVED 2024-01-18)
[Full issue details preserved]

---

## 2024-02 Archived Issues

### 005: Memory leak in websocket handler (RESOLVED 2024-02-05)
- **Introduced**: v1.2.0
- **Fixed**: v1.4.0
...

---

## Summary
- Total Archived: X issues
- Archive Started: YYYY-MM-DD
- Last Archived: YYYY-MM-DD
```

---

## New Issue Entry Sample (for adding to Index)

```markdown
| [ID] | [Priority] | Open | [Title] | [Introduced] | - | YYYY-MM-DD | - |
```

---

## New Issue Detail Sample (for adding to Details)

```markdown
### [ID]: [Title]
- **Priority**: High / Medium / Low
- **Status**: Open
- **Introduced**: [Auto-detected version]
- **Created**: YYYY-MM-DD
- **Original Problem**:
  - Current behavior: [What's happening]
  - Expected behavior: [What should happen]
  - Steps to reproduce: [If known]
- **Context**: [Where/when this occurs, affected components]
- **Root Cause**: [If known]
- **Proposed Solution**: [Optional]
```
