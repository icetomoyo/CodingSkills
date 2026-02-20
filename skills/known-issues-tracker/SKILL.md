---
name: known-issues-tracker
description: Maintain a KNOWN_ISSUES.md file to track, prioritize, and resolve issues in any project. Supports auto-tracking by Claude Code and manual entries by humans. Automatically activates when users mention bugs, issues, errors, or problems.
---

# Known Issues Tracker

This skill provides a standardized way to track, prioritize, and resolve known issues in any project using a KNOWN_ISSUES.md file.

## Automatic Activation Triggers

This skill should be automatically activated when the user message contains:

**Keywords:**
- bug, issue, problem, error, crash, failure
- doesn't work, broken, not working, failing
- there is a, we have a, I found a (followed by bug/issue/problem)
- need to fix, should fix, have to fix
- workaround, temporary fix, hack
- technical debt, TODO, FIXME (when describing problems)

**Example User Messages:**
- "There is a bug in the login flow"
- "I found an issue with the API"
- "The button doesn't work on mobile"
- "We have a problem with memory leaks"
- "Need to fix the database connection error"

**When NOT to Activate:**
- User is asking general questions
- User is requesting new features (not bugs)
- User is asking for code explanation
- User uses "issue" in a different context (e.g., "git issue" meaning GitHub issue)

## When to Activate

- When you discover a bug or issue in the codebase
- When a user reports a problem (auto-trigger from conversation)
- When you need to track technical debt
- When you want to automatically resolve the highest priority issue
- When starting a new session to check for known issues

## KNOWN_ISSUES.md File Structure

The file is divided into THREE sections:

```markdown
# Known Issues

_Last Updated: YYYY-MM-DD HH:MM_

---

## Issue Index
<!-- Quick reference table for all issues -->

| ID | Priority | Status | Title | Created | Resolved |
|----|----------|--------|-------|---------|----------|
| A001 | High | Open | [Issue title] | YYYY-MM-DD | - |
| M001 | Medium | Resolved | [Issue title] | YYYY-MM-DD | YYYY-MM-DD |

---

## Issue Details
<!-- Full details for each issue - REQUIRED for all issues -->

### A001: [Issue Title]
- **Type**: Auto-Tracked
- **Priority**: High
- **Status**: Open
- **Created**: YYYY-MM-DD
- **Original Problem**: [DETAILED description of what was wrong - MUST be preserved]
- **Context**: [Where/when this occurs, affected components]
- **Root Cause**: [Analysis of why this happens - if known]
- **Proposed Solution**: [Optional: how to fix it]
- **Resolution**: [How it was fixed - ONLY for resolved issues]
- **Resolved**: YYYY-MM-DD [ONLY for resolved issues]

### M001: [Issue Title] (RESOLVED)
- **Type**: Manual
- **Priority**: Medium
- **Status**: Resolved
- **Created**: YYYY-MM-DD
- **Original Problem**: [DETAILED description of what was wrong - MUST be preserved]
- **Context**: [Where/when this occurs, affected components]
- **Root Cause**: [Analysis of why this happens]
- **Resolution**: [DETAILED explanation of how it was fixed - REQUIRED for resolved issues]
- **Resolution Date**: YYYY-MM-DD
- **Files Changed**: [List of files modified to fix this issue]
- **Tests Added**: [Any tests added to prevent regression]

---

## Summary
- Total: X (Y Open, Z Resolved)
- Auto-Tracked: A (B Open, C Resolved)
- Manual: D (E Open, F Resolved)
- Highest Priority Open: [Issue ID] - [Title]
```

## CRITICAL: Issue Details Maintenance

**Every issue MUST have a corresponding entry in the "Issue Details" section.**

### For OPEN Issues (Unresolved)

The issue detail MUST include:

```markdown
### [ID]: [Issue Title]
- **Type**: Auto-Tracked / Manual
- **Priority**: High / Medium / Low
- **Status**: Open
- **Created**: YYYY-MM-DD
- **Original Problem**: [REQUIRED - Detailed description of what's wrong]
  - What is the current (broken) behavior?
  - What is the expected behavior?
  - How to reproduce the issue?
- **Context**: [Where/when this occurs]
- **Root Cause**: [If known - analysis of why this happens]
- **Proposed Solution**: [Optional - suggested fix approach]
```

### For RESOLVED Issues

The issue detail MUST preserve the original problem AND add resolution info:

```markdown
### [ID]: [Issue Title] (RESOLVED)
- **Type**: Auto-Tracked / Manual
- **Priority**: High / Medium / Low
- **Status**: Resolved
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

### IMPORTANT: Never Delete Original Problem

When resolving an issue:
- **PRESERVE** the Original Problem description completely
- **DO NOT** summarize or shorten it
- **ADD** Resolution section below it
- This ensures future readers understand both the problem AND the solution

## Priority Levels

| Priority | Description | Action |
|----------|-------------|--------|
| **High** | Critical bugs, breaking issues, security vulnerabilities | Resolve immediately |
| **Medium** | Functional issues, performance problems, workarounds exist | Resolve within session if possible |
| **Low** | Minor issues, cosmetic problems, technical debt | Schedule for future work |

## Issue ID Convention

- **A###** = Auto-tracked (e.g., A001, A002)
- **M###** = Manual (e.g., M001, M002)

IDs are sequential and never reused.

## Actions

### 1. Find or Create KNOWN_ISSUES.md

**CRITICAL**: Before any operation, locate or create the file following this process:

#### Step 1: Scan for Existing File
```
Search entire project for KNOWN_ISSUES.md (case-insensitive):
- Use Glob to find **/KNOWN_ISSUES.md, **/known_issues.md
- Also check docs/, documentation/, .claude/ directories
```

#### Step 2: If File Exists
```
Use the existing file location
No need to ask user
Proceed with the operation
```

#### Step 3: If File Does NOT Exist - Ask User
```
Ask user:
"KNOWN_ISSUES.md not found. Where should I create it?
1. docs/KNOWN_ISSUES.md (recommended for project documentation)
2. .claude/KNOWN_ISSUES.md (keeps it private to Claude Code)

Reply 1 or 2, or specify a custom path."
```

#### Step 4: Create Based on User Choice
```
If user chooses "1" or "docs": Create at docs/KNOWN_ISSUES.md
If user chooses "2" or ".claude": Create at .claude/KNOWN_ISSUES.md
If user specifies path: Create at that location
If no response (timeout): Default to .claude/KNOWN_ISSUES.md
```

#### Step 5: Create Directory If Needed
```
If docs/ doesn't exist: Create docs/ directory first
If .claude/ doesn't exist: Create .claude/ directory first
```

#### Step 6: Initialize with Template
```markdown
# Known Issues

_Last Updated: [Current DateTime]_

---

## Issue Index
<!-- Quick reference table for all issues -->

| ID | Priority | Status | Title | Created | Resolved |
|----|----------|--------|-------|---------|----------|
_No issues tracked yet_

---

## Issue Details
<!-- Full details for each issue - REQUIRED for all issues -->

_No issue details yet_

---

## Summary
- Total: 0 (0 Open, 0 Resolved)
- Auto-Tracked: 0 (0 Open, 0 Resolved)
- Manual: 0 (0 Open, 0 Resolved)
- Highest Priority Open: None
```

### 2. Auto-Add Issue from Conversation

When triggered by user conversation (automatic activation):

1. **Parse the user's message** to extract:
   - Issue title (brief summary)
   - Issue description (what's wrong)
   - Context (where/when it happens, if mentioned)
   - Priority (infer from severity, or ask user)

2. **Determine priority automatically:**
   - **High**: User mentions "critical", "blocking", "urgent", "crash", "security", "data loss"
   - **Medium**: Default for most bugs
   - **Low**: User mentions "minor", "cosmetic", "nice to fix", "when you have time"

3. **Add to KNOWN_ISSUES.md (BOTH sections required):**
   - Read current file (create if not exists)
   - Generate next A### ID
   - Add entry to **Issue Index** table
   - Add full details to **Issue Details** section with:
     - Type: Auto-Tracked
     - Priority, Status, Created
     - **Original Problem** (detailed description)
     - Context, Root Cause (if known)
   - Update timestamp and summary
   - Write the file

4. **Confirm with user:**
   ```
   Added issue A###: [Title] (Priority)
   Use /add-issue for more control, or /resolve-next-issue to fix it.
   ```

### 3. Add Auto-Tracked Issue (Claude Discovered)

When Claude discovers an issue during code analysis:

1. Read the current KNOWN_ISSUES.md
2. Generate the next available A### ID
3. **Add to Issue Index table** (quick reference)
4. **Add full details to Issue Details section:**
   - Type: Auto-Tracked
   - Priority, Status, Created
   - **Original Problem**: Detailed description of what's wrong
   - Context: Where/when this occurs
   - Root Cause: Analysis (if known)
5. Update timestamp and summary
6. Write the updated file

### 4. Add Manual Issue (Human Entry)

When a human wants to add an issue (via /add-issue command):

1. Read the current KNOWN_ISSUES.md
2. Generate the next available M### ID
3. **Add to Issue Index table** (quick reference)
4. **Add full details to Issue Details section:**
   - Type: Manual
   - Priority, Status, Created
   - **Original Problem**: Detailed description of what's wrong
   - Context: Where/when this occurs
   - Proposed Solution (optional)
5. Update timestamp and summary
6. Write the updated file

### 5. Mark Issue as Resolved

When an issue is fixed:

1. Read the current KNOWN_ISSUES.md
2. Find the issue by ID in BOTH sections
3. **Update Issue Index:** Change status to "Resolved", add resolved date
4. **Update Issue Details (CRITICAL):**
   - Change status to "Resolved"
   - **PRESERVE** Original Problem description (do NOT delete)
   - **ADD** Resolution section with:
     - Detailed explanation of the fix
     - Why this approach was chosen
     - Any trade-offs
   - Add Resolution Date
   - Add Files Changed list
   - Add Tests Added (if any)
5. Update timestamp and summary
6. Write the updated file

### 6. Auto-Resolve Highest Priority Issue

Use the /resolve-next-issue command to:

1. Read KNOWN_ISSUES.md
2. Find all Open issues (both auto-tracked and manual)
3. Sort by priority (High > Medium > Low)
4. Select the highest priority issue (oldest if tie)
5. Analyze the issue and implement a fix
6. **Mark resolved in BOTH sections:**
   - Update Issue Index: status → Resolved, add resolved date
   - Update Issue Details: **PRESERVE** Original Problem, **ADD** Resolution details
   - Include: what was fixed, why, files changed, tests added

## CRITICAL: Cautious Fix Implementation

When implementing any fix, you MUST follow these strict guidelines:

### Before Making Any Change

1. **Understand the Problem Completely**
   - Read all related code thoroughly
   - Identify the exact root cause
   - Understand the expected behavior vs actual behavior
   - Check if there are any tests related to this code

2. **Plan the Fix**
   - Document what needs to change and why
   - Identify ALL files that need modification
   - Consider edge cases and potential side effects
   - Think about backward compatibility

### For Every File Modified

**MANDATORY CHECKLIST** - Before modifying each file, document:

```markdown
## File: [path/to/file.ts]

- **Changes summary**: [What will be changed in this file]
- **Reason**: [Why this file needs modification]
- **Expected outcome**: [What this should achieve]
- **Risk assessment**: [Potential side effects or issues]
- **Affected components**: [Other code/modules that depend on this file]
- **Tests to run**: [Which tests cover this file]
```

**Before proceeding, verify:**
```
[ ] Expected outcome is clearly defined
[ ] No existing functionality will break
[ ] All callers/dependents are considered
[ ] Edge cases are handled
[ ] This is the MINIMAL change needed
[ ] Error handling is preserved
```

### Verification After Each File

After modifying each file:

1. **Immediate verification:**
   - Does the code compile/transpile without errors?
   - Are there any type errors?
   - Does the syntax look correct?

2. **Run related tests:**
   - Run any tests for the modified file
   - Run integration tests if the change affects multiple components
   - If no tests exist, manually verify the fix works

3. **Check for regressions:**
   - Does the original issue still need to be fixed?
   - Did any new issues appear?
   - Are all existing features still working?

### Forbidden Actions During Fix

**NEVER:**
- Make changes to unrelated code "while you're at it"
- Refactor code that isn't directly related to the fix
- Add features or improvements beyond the scope of the issue
- Change formatting or style in unrelated areas
- Update dependencies unless the fix requires it
- Remove code comments unless they're factually wrong
- Modify test expectations to make tests pass (fix the code, not the tests)

### If the Fix Is Complex

If the fix requires changes to more than 3 files or is architecturally significant:

1. **STOP and plan first:**
   - Use `/plan` command to create a detailed plan
   - Get user approval before proceeding
   - Consider breaking into smaller, safer changes

2. **Implement incrementally:**
   - Make one file change at a time
   - Verify after each file
   - Commit working states if using version control

3. **Request review:**
   - After implementing, use `/code-review` to review changes
   - Address any issues found before marking resolved

## Workflow Integration

### During Development

1. **Before starting work**: Check KNOWN_ISSUES.md for relevant issues
2. **When finding a bug**: Add it to auto-tracked issues
3. **After fixing a bug**: Mark the issue as resolved
4. **At session end**: Review open issues and priorities

## File Location Priority

When looking for or creating KNOWN_ISSUES.md, follow this order:

1. **Existing file**: Use the current location if file already exists
2. **docs/KNOWN_ISSUES.md**: Preferred for team visibility (ask user first)
3. **.claude/KNOWN_ISSUES.md**: Default fallback, private to Claude Code

**Important**: Always scan the entire project first before asking to create.

## Best Practices

### Writing Good Issue Descriptions

Bad: Bug - Doesn't work

Good: API returns 500 on /users endpoint - GET /api/users fails with 500 when query param filter contains special characters

### Setting Correct Priority

- **High**: Blocks users, security risk, data loss possible
- **Medium**: Feature broken but workaround exists, performance degraded
- **Low**: Cosmetic, nice-to-have fix, technical debt

## Error Handling

- If KNOWN_ISSUES.md does not exist, create it
- If the file is corrupted, attempt to recover and fix the format
- If an ID conflict occurs, increment to the next available ID
- If both sections are empty, show helpful message

## Integration with Other Skills

- Works with /plan for planning issue resolution
- Works with /tdd for test-driven bug fixes
- Works with /code-review for reviewing fixes
- Works with /security-scan for security-related issues

## File Size Management

### Automatic Size Check

After each operation, check if KNOWN_ISSUES.md needs archiving:

```
If file size > 2000 lines OR > 50KB:
  - Notify user: "KNOWN_ISSUES.md is getting large ([size]). Consider using /archive-issues to archive resolved issues."

If file size > 5000 lines OR > 100KB:
  - Strongly recommend: "KNOWN_ISSUES.md is too large. Archiving is recommended to maintain performance."
```

### Archiving Strategy

Resolved issues should be archived to maintain file size:

**Archive File**: `ISSUES_ARCHIVED.md` (same directory as KNOWN_ISSUES.md)

**Archive Structure**:
```markdown
# Archived Issues

_Archive Created: YYYY-MM-DD_

---

## 2024-01 Archived Issues

### A001: [Issue Title] (RESOLVED 2024-01-15)
[Full issue details preserved]

### M003: [Issue Title] (RESOLVED 2024-01-18)
[Full issue details preserved]

---

## 2024-02 Archived Issues
...
```

### Retention Policy

When archiving:
1. **Keep in KNOWN_ISSUES.md**:
   - All OPEN issues (never archive)
   - Recently resolved issues (last 7 days)
   - Issues resolved in current month (configurable)

2. **Move to ISSUES_ARCHIVED.md**:
   - Issues resolved more than [X] days ago
   - Default: 30 days

### Manual Archive Command

Use `/archive-issues` to manually trigger archiving:
- Archive all resolved issues older than [days]
- Default: archive all resolved issues
- Option to keep recent ones

### After Archiving

Update KNOWN_ISSUES.md:
1. Remove archived issues from Issue Index table
2. Remove archived issues from Issue Details section
3. Update Summary counts
4. Add note: "X issues archived to ISSUES_ARCHIVED.md on [date]"

## Context Optimization

### For Large Projects

If the project has many issues, consider:

1. **Use focused commands**: `/list-issues --open` instead of reading full file
2. **Regular archiving**: Archive resolved issues weekly/monthly
3. **Separate by component**: For very large projects, consider component-specific issue files

### Future: Dedicated Agent (Optional)

For projects with heavy issue tracking needs, a dedicated agent could:
- Handle all KNOWN_ISSUES.md operations
- Keep main conversation context clean
- Manage archiving automatically

Currently not required, but can be added if needed.

## Commands Summary

| Command | Purpose |
|---------|---------|
| `/add-issue` | Add a new issue with full details |
| `/list-issues` | List issues with filtering |
| `/resolve-next-issue` | Auto-fix highest priority issue |
| `/archive-issues` | Archive resolved issues to reduce file size |
