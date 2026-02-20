---
description: Automatically find and resolve the highest priority issue from KNOWN_ISSUES.md
---

# Resolve Next Issue Command

This command finds and resolves the highest priority open issue from the KNOWN_ISSUES.md file.

## What This Command Does

1. **Read KNOWN_ISSUES.md** - Load the issues file
2. **Find Open Issues** - Collect all issues with status "Open"
3. **Sort by Priority** - Order by High > Medium > Low
4. **Pick Highest** - Select the top priority issue (oldest if tie)
5. **Analyze & Fix** - Investigate and implement a solution
6. **Mark Resolved** - Update KNOWN_ISSUES.md with resolution

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
Extract from Auto-Tracked section:
- ID, Priority, Status, Title, Description, Created

Extract from Manual section:
- ID, Priority (from section header), Status, Title, Description, Created
```

### Step 4: Sort and Select
```
Sort by: Priority (desc) -> Created (asc) -> ID (asc)
Select: First item in sorted list
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

### Step 7: Update KNOWN_ISSUES.md
```
1. Update issue status to "Resolved"
2. Add resolved date
3. Add resolution notes
4. Update summary section
5. Write to the known file path
```

## Example Output

```
Found 5 open issues in KNOWN_ISSUES.md

Selected: A003 (High Priority)
Title: Mobile login button unresponsive
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

=== UPDATING KNOWN_ISSUES.md ===
- Status: Open -> Resolved
- Resolved: 2024-01-20
- Resolution: Added touch-action: manipulation to Button.styles.ts to prevent iOS Safari double-tap zoom interference

Issue A003 resolved successfully!
```

=== IMPLEMENTING ===
Modifying src/components/Button.styles.ts...
Verifying: Code compiles ✓
Running tests: 12 tests passed ✓
Manual check: Original issue addressed ✓
No regressions detected ✓

=== UPDATING KNOWN_ISSUES.md ===
- Status: Open -> Resolved
- Resolved: 2024-01-20
- Resolution: Added touch-action: manipulation to Button.styles.ts

Issue A003 resolved successfully!
```

## Edge Cases

### No Open Issues
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
