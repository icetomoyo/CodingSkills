---
name: known-issues-tracker
description: Maintain a KNOWN_ISSUES.md file to track, prioritize, and resolve issues in any project. All issues are tracked uniformly with Claude's assistance for comprehensive documentation. Automatically activates when users mention bugs, issues, errors, or problems.
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

## KNOWN_ISSUES.md File Structure

The file is divided into THREE sections:

1. **Issue Index** - Quick reference table for all issues
2. **Issue Details** - Full details for each issue (REQUIRED for all issues)
3. **Summary** - Total counts and highest priority open issue

> **格式示例请参考**: [examples/sample.md](examples/sample.md)

## Priority Levels

| Priority | Description | Action |
|----------|-------------|--------|
| **High** | Critical bugs, breaking issues, security vulnerabilities | Resolve immediately |
| **Medium** | Functional issues, performance problems, workarounds exist | Resolve within session if possible |
| **Low** | Minor issues, cosmetic problems, technical debt | Schedule for future work |

## Version Tracking

Version is **automatically detected** from project configuration files:

**Detection Priority**:
1. `package.json` → `version` field
2. `VERSION` file (single line, semver format)
3. `pyproject.toml` → `project.version`
4. `Cargo.toml` → `package.version`
5. Git tag (`git describe --tags --abbrev=0`)
6. Fallback: `unknown`

## Core Actions

### 1. Find or Create KNOWN_ISSUES.md

**CRITICAL**: Before any operation, locate or create the file:

1. **Scan for existing file**: Use Glob to find `**/KNOWN_ISSUES.md`
2. **If found**: Use existing location, proceed with operation
3. **If not found**: Ask user for location preference:
   - `docs/KNOWN_ISSUES.md` (recommended)
   - `.claude/KNOWN_ISSUES.md` (private)
4. **Create directory if needed**, then initialize with empty template

### 2. Add Issue

**Input**: Problem description / actual phenomenon (from text or file)

**Claude automatically generates**:
1. **Title**: Concise summary
2. **Detailed description**: Current behavior, expected behavior, reproduction steps
3. **Context**: Affected components, scenarios, environments
4. **Priority**: Based on severity analysis
5. **Introduced version**: Auto-detected from project

**Process**:
1. Detect current version for Introduced field
2. Generate next sequential ID (001, 002, etc.)
3. Add to BOTH Issue Index table AND Issue Details section
4. Update timestamp and summary

### 3. Resolve Issue (`/resolve-next-issue`)

**Selection Logic**:
- With ID: Find and validate issue is "Open"
- Without ID: Auto-select highest priority Open issue (by Priority → Created date → ID)

**Implementation Guidelines (CRITICAL)**:

**Before Any Modification**:
1. Read ALL related code thoroughly
2. Understand the exact root cause
3. Identify ALL files that need changes
4. Check for existing tests
5. Plan the MINIMAL fix needed

**For Each File - Document**:
- Changes summary, Reason, Expected outcome, Risks, Affected components, Tests to run

**Mandatory Checklist Per File**:
- [ ] Expected outcome is clearly defined
- [ ] No existing functionality will break
- [ ] All callers/dependents are considered
- [ ] Edge cases are handled
- [ ] This is the MINIMAL change needed
- [ ] Error handling is preserved

**FORBIDDEN Actions**:
- Change unrelated code "while you're at it"
- Refactor code not directly related to the fix
- Add features beyond the issue scope
- Modify tests to make them pass (fix the code!)

**After Resolution**:
1. Detect current version for Fixed field
2. Update BOTH sections in KNOWN_ISSUES.md
3. **PRESERVE** Original Problem description
4. **ADD** Resolution section with details

### 4. Archive Issues

When KNOWN_ISSUES.md exceeds thresholds:
- **Warning**: > 2000 lines or > 50KB → Notify user
- **Critical**: > 5000 lines or > 100KB → Auto-archive resolved issues > 30 days old

Archive to `ISSUES_ARCHIVED.md`, grouped by month.

**Important**:
- Never auto-archive OPEN issues
- Always keep recent resolutions (last 30 days)
- Preserve all details in archive

## CRITICAL: Issue Details Maintenance

**Every issue MUST have a corresponding entry in the "Issue Details" section.**

### For OPEN Issues (Unresolved)

Required fields:
- Priority, Status, Introduced, Created
- **Original Problem** (REQUIRED): Current behavior, expected behavior, reproduction steps
- Context, Root Cause (if known), Proposed Solution (optional)

### For RESOLVED Issues

**MUST preserve** the original problem AND add:
- Fixed version (auto-detected)
- Resolution (detailed explanation of the fix)
- Resolution Date
- Files Changed
- Tests Added

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

## Commands Summary

| Command | Purpose |
|---------|---------|
| `/add-issue "problem description"` | Add a new issue (Claude generates title, details, context) |
| `/add-issue -f [file]` | Add issue from file content |
| `/list-issues` | List issues with filtering |
| `/resolve-next-issue [id]` | Resolve issue (omit ID for auto-select highest priority) |
| `/archive-issues` | Archive resolved issues to reduce file size |
