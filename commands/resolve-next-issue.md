---
description: Resolve an issue from KNOWN_ISSUES.md. Specify an issue ID to resolve that specific issue, or omit to automatically resolve the highest priority issue.
---

# Resolve Next Issue Command

This command resolves an issue from the KNOWN_ISSUES.md file.

## Usage

```
/resolve-next-issue [id]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| id | Issue ID to resolve (e.g., 001) | No |

## Behavior

| Scenario | Action |
|----------|--------|
| **With ID** (e.g., `/resolve-next-issue 003`) | Resolve the specified issue |
| **Without ID** (e.g., `/resolve-next-issue`) | Auto-select and resolve highest priority issue |

## What This Command Does

1. **Read KNOWN_ISSUES.md** - Load the issues file
2. **Select Issue** - Use specified ID or auto-select highest priority
3. **Analyze & Fix** - Investigate and implement a solution
4. **Detect Version** - Auto-detect current version for Fixed field
5. **Mark Resolved** - Update KNOWN_ISSUES.md with resolution and Fixed version

## Priority Order

1. **High** - Critical/blocking issues first
2. **Medium** - Important but not blocking
3. **Low** - Minor issues and technical debt

## Tie-Breaking

When multiple issues have the same priority:
- Pick the one with the earliest **Created** date
- If still tied, pick the one with the lower ID number

## Workflow

### Step 1: Find KNOWN_ISSUES.md
```
Scan entire project using Glob:
- **/KNOWN_ISSUES.md
- **/known_issues.md
- Check docs/, documentation/, .claude/ directories

If found: Use the found path
If not found: Report "No KNOWN_ISSUES.md found. Use /add-issue to create one first."
```

### Step 2: Load Issues
```
Read KNOWN_ISSUES.md from the found path
Parse content
```

### Step 3: Parse Open Issues
```
Extract from Issue Index and Issue Details sections:
- ID, Priority, Status, Title, Description, Created
```

### Step 4: Select Issue

**If ID specified:**
```
1. Find issue by ID in Issue Index and Issue Details
2. Validate status is "Open"
3. If not found: Report "Issue [id] not found"
4. If already Resolved: Report "Issue [id] is already resolved"
```

**If no ID specified (auto-select):**
```
1. Find all issues with status "Open"
2. Sort by: Priority (desc) -> Created (asc) -> ID (asc)
3. Select: First item in sorted list
4. If no open issues: Report "No open issues found"
```

### Step 5: Analyze Issue
```
1. Display the selected issue details
2. Search codebase for related files
3. Identify root cause
4. Plan the fix
```

### Step 6: Implement Fix (CRITICAL - Be Extremely Cautious)

**YOU MUST follow these guidelines for EVERY file modified:**

#### Before Any Modification
```
1. Read ALL related code thoroughly
2. Understand the exact root cause
3. Identify ALL files that need changes
4. Check for existing tests
5. Plan the MINIMAL fix needed
```

#### For Each File - Document:
```
File: [path]

- Changes summary: [What will be changed]
- Reason: [Why this file needs modification]
- Expected outcome: [What this achieves]
- Risks: [Potential side effects]
- Affected: [Other code that depends on this file]
- Tests to run: [Which tests cover this file]
```

#### Mandatory Checklist Per File
```
[ ] Expected outcome is clearly defined
[ ] No existing functionality will break
[ ] All callers/dependents are considered
[ ] Edge cases are handled
[ ] This is the MINIMAL change needed
[ ] Error handling is preserved
```

#### After Each File Modification
```
1. Verify: Does code compile without errors?
2. Verify: Are there type errors?
3. Run: Tests for the modified file
4. Run: Integration tests if applicable
5. Check: Original issue still needs fixing?
6. Check: Any new issues introduced?
```

#### FORBIDDEN Actions
```
NEVER:
- Change unrelated code "while you're at it"
- Refactor code not directly related to the fix
- Add features beyond the issue scope
- Change formatting in unrelated areas
- Update dependencies unless required
- Modify tests to make them pass (fix the code!)
```

#### If Fix Is Complex (>3 files or architectural)
```
1. STOP - Use /plan to create a detailed plan first
2. Get user approval before proceeding
3. Implement incrementally, one file at a time
4. Verify after each file modification
5. Use /code-review after implementation
```

### Step 7: Detect Current Version
```
Search for version source files in order:
1. package.json → version field
2. VERSION file (single line)
3. pyproject.toml → project.version
4. Cargo.toml → package.version
5. Git tag (git describe --tags --abbrev=0)
6. Fallback: "unknown"

Log detected version to user
```

### Step 8: Update KNOWN_ISSUES.md (BOTH sections)

```
1. Update Issue Index table:
   - Change status to "Resolved"
   - Add Fixed version
   - Add resolved date

2. Update Issue Details section (CRITICAL):
   - Change status to "Resolved"
   - Add **Fixed** version (auto-detected)
   - **PRESERVE** Original Problem (do NOT delete or summarize)
   - **ADD** Resolution section with:
     * Detailed explanation of the fix
     * Why this approach was chosen
     * Any trade-offs or limitations
   - Add Resolution Date
   - Add Files Changed list
   - Add Tests Added (if any)

3. Update Summary section

4. Write to the known file path
```

## Example Output

### Auto-Select (No ID)

```
/resolve-next-issue

Found 5 open issues in KNOWN_ISSUES.md
Auto-selecting highest priority...

Selected: 003 (High Priority)
Title: Mobile login button unresponsive
Introduced: v1.1.0
Created: 2024-01-20
Description: Touch event not firing on iOS Safari

=== ANALYSIS ===
- Found Button.tsx component (src/components/Button.tsx)
- Found Button.styles.ts (src/components/Button.styles.ts)
- Root cause: iOS Safari double-tap zoom interferes with touch events
- Fix plan: Add touch-action CSS property to button styles

=== FILE CHANGE PLAN ===

File: src/components/Button.styles.ts

- Changes summary: Add touch-action: manipulation to button base styles
- Reason: Prevents iOS Safari double-tap zoom delay on touch
- Expected outcome: Touch events fire immediately on iOS Safari
- Risks: None - manipulation is widely supported (iOS 9.3+, Android 4+)
- Affected components: All Button component instances
- Tests to run: Button.test.tsx, TouchEvents.test.ts

=== PRE-CHECK ===
[ ] Expected outcome: Touch events fire immediately ✓
[ ] No existing functionality will break ✓
[ ] All dependents considered: All Button instances ✓
[ ] Edge cases handled: Fallback for unsupported browsers ✓
[ ] Minimal change: Yes - single CSS property ✓
[ ] Error handling: N/A for CSS ✓

=== IMPLEMENTING ===
Modifying src/components/Button.styles.ts...

=== POST-MODIFICATION CHECK ===
Verifying: Code compiles ✓
Type check: No errors ✓
Running tests: 12 tests passed ✓
Integration check: Original issue addressed ✓
Regression check: No new issues detected ✓

=== VERSION DETECTION ===
Detecting version... Found: v1.3.0 (from package.json)

=== UPDATING KNOWN_ISSUES.md ===

Issue Index updated:
| 003 | High | Resolved | Mobile login button unresponsive | v1.1.0 | v1.3.0 | 2024-01-20 | 2024-01-20 |

Issue Details updated:
### 003: Mobile login button unresponsive (RESOLVED)
- **Priority**: High
- **Status**: Resolved
- **Introduced**: v1.1.0
- **Fixed**: v1.3.0
- **Created**: 2024-01-20
- **Original Problem**: (PRESERVED)
  - Touch event not firing on iOS Safari
  - Users cannot tap the login button on iPhone/iPad
  - Expected: Button should respond to touch immediately
- **Context**: Login page on iOS Safari mobile browsers
- **Root Cause**: iOS Safari has a 300ms delay for double-tap zoom detection
- **Resolution**:
  - Added `touch-action: manipulation` CSS property to button base styles
  - This tells iOS Safari to bypass the 300ms double-tap detection
  - Touch events now fire immediately without delay
- **Resolution Date**: 2024-01-20
- **Files Changed**: src/components/Button.styles.ts
- **Tests Added**: None (CSS-only change, manually verified on iOS Simulator)

Issue 003 resolved successfully!
Fixed in: v1.3.0
```

### Specify Issue ID

```
/resolve-next-issue 005

Finding issue 005 in KNOWN_ISSUES.md...

=== SELECTED ISSUE ===
ID: 005
Title: Database connection timeout
Priority: Medium
Status: Open
Introduced: v1.2.0
Created: 2024-02-15
Description: Connection to database times out after 30 seconds of inactivity

=== ANALYSIS ===
... (continues with fix workflow)
```

## Edge Cases

### Issue Not Found (When ID Specified)
```
If the specified ID doesn't exist:
- Report "Issue [id] not found in KNOWN_ISSUES.md"
- Suggest using /list-issues to see available issues
```

### Issue Already Resolved (When ID Specified)
```
If the specified issue is already resolved:
- Report "Issue [id] is already resolved"
- Show resolution date and fixed version
```

### No Open Issues (Auto-Select)
```
If all issues are resolved:
- Report "No open issues found"
- Suggest checking for new issues or adding technical debt
```

### No KNOWN_ISSUES.md
```
If file doesn't exist:
- Report "KNOWN_ISSUES.md not found"
- Suggest running issue tracker initialization
```

### Fix Requires Discussion
```
If the fix is complex or ambiguous:
- Present analysis and proposed approach
- Ask user for confirmation before proceeding
- Then implement and mark resolved
```

## Related Commands

- Use `/plan` for complex issues requiring planning
- Use `/tdd` to write tests for the fix
- Use `/code-review` after fixing

## Related Skills

This command works with the `known-issues-tracker` skill located at:
`skills/known-issues-tracker/SKILL.md`
