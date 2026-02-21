---
name: feature-list-tracker
description: Maintain a FEATURE_LIST.md file to track, plan, and implement software features. Features are tracked with lifecycle status (Planned/InProgress/Completed), priority levels, and version tracking. Automatically activates when users mention features, functionality, enhancements, or planning. Supports automated development workflow via /start-next-feature command.
---

# Feature List Tracker

This skill provides a standardized way to track, plan, and implement software features using a FEATURE_LIST.md file.

## Automatic Activation Triggers

This skill should be automatically activated when the user message contains:

**Keywords:**
- feature, functionality, capability
- add, implement, create, build, develop
- support, enable, allow
- enhancement, improvement, upgrade
- roadmap, backlog, sprint, milestone
- user story, user need
- "plan to add", "going to", "will add", "should have"
- "in the future", "upcoming", "next version"

**Example User Messages:**
- "We need to add a feature for user profiles"
- "The app should support dark mode"
- "Can you implement file upload functionality?"
- "Plan to add OAuth login in the next release"
- "Users are requesting password recovery feature"

**When NOT to Activate:**
- User is asking about existing features (questions, not requests)
- User is reporting bugs (use known-issues-tracker)
- User is asking general questions
- User uses "feature" in a non-development context

## When to Activate

- When user requests a new feature or functionality
- When planning roadmap or release backlog
- When managing feature development progress
- When tracking what features are planned for each version

## FEATURE_LIST.md File Structure

The file is divided into THREE sections:

```markdown
# Feature List

_Last Updated: YYYY-MM-DD HH:MM_

---

## Feature Index
<!-- Quick reference table for all features -->

| ID | Category | Status | Priority | Title | Planned | Released | Created | Started | Completed |
|----|----------|--------|----------|-------|---------|----------|---------|---------|-----------|
| 001 | New | InProgress | High | User authentication | v2.0.0 | - | 2024-02-21 | 2024-02-25 | - |
| 002 | Enhancement | Completed | Medium | Dark mode support | v2.0.0 | v2.0.0 | 2024-02-15 | 2024-02-18 | 2024-03-10 |

---

## Feature Details
<!-- Full details for each feature -->

### 001: User Authentication System
- **Category**: New
- **Status**: InProgress
- **Priority**: High
- **Planned**: v2.0.0
- **Created**: 2024-02-21
- **Started**: 2024-02-21

**Description**:
Implement a complete user authentication system including:
- User registration with email verification
- Password-based login with secure hashing
- Password reset via email
- Session management with JWT tokens

---

### 002: Dark Mode Support (COMPLETED)
- **Category**: Enhancement
- **Status**: Completed
- **Priority**: Medium
- **Planned**: v2.0.0
- **Released**: v2.0.0
- **Created**: 2024-02-15
- **Started**: 2024-02-18
- **Completed**: 2024-03-10

**Description**:
Add dark mode theme to the application with system preference detection and manual toggle.

**Implementation Notes**:
- Used CSS custom properties for theme variables
- Added data-theme attribute to body element
- Implemented smooth transition for theme switch

---

## Summary
- Total: X (Y Planned, Z InProgress, A Completed)
- By Priority: Critical: C, High: H, Medium: M, Low: L
- Next Release (v2.0.0): X features planned
- Highest Priority InProgress: [ID] - [Title] (or "None")
```

## Feature Categories

| Category | Description | Example |
|----------|-------------|---------|
| **New** | Brand new functionality | User authentication, File upload |
| **Enhancement** | Improvement to existing feature | Dark mode, Search filters |
| **Refactor** | Code refactoring or optimization | API caching, Database migration |
| **Internal** | Internal tooling or infrastructure | CI/CD improvements, Logging system |

## Priority Levels

| Priority | Description | When to Use |
|----------|-------------|-------------|
| **Critical** | Must-have for release, blocking | Core functionality, security |
| **High** | Important for user experience | Major features, frequently requested |
| **Medium** | Nice to have, adds value | Improvements, optimizations |
| **Low** | Backlog / Future consideration | Nice-to-have, low impact |

## Feature Status Lifecycle

### Status Values

| Status | Description | Allowed Transitions |
|--------|-------------|---------------------|
| **Planned** | Feature is planned but not started | InProgress |
| **InProgress** | Currently being developed | Completed |
| **Completed** | Feature is done and released | (Terminal state) |

### Lifecycle Diagram

```
  Planned ──────► InProgress ──────► Completed
```

## Version Tracking

This skill automatically tracks version information for all features:

### Version Fields

| Field | When Set | Description |
|-------|----------|-------------|
| **Planned** | When feature is added | Target release version |
| **Released** | When feature is completed | Actual release version |

### Automatic Version Detection

Version is **automatically detected** from project configuration files. Users do NOT need to manually specify versions (but can override).

#### Detection Priority (in order)

1. **package.json** → `version` field
2. **VERSION** file (single line, semver format)
3. **pyproject.toml** → `project.version`
4. **Cargo.toml** → `package.version`
5. **Git tag** (nearest tag on current branch)
6. **Fallback**: If no version can be detected, use `unknown`

## Feature Data Model

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `ID` | String | Sequential 3-digit number (001, 002, 003) |
| `Title` | String | Concise feature title |
| `Description` | Text | Detailed feature specification |
| `Status` | Enum | Planned / InProgress / Completed |
| `Category` | Enum | New / Enhancement / Refactor / Internal |
| `Priority` | Enum | Critical / High / Medium / Low |
| `Planned` | Version | Target release version |
| `Created` | Date | Feature creation date (YYYY-MM-DD) |

### Optional Fields (set during lifecycle)

| Field | Type | When Set |
|-------|------|----------|
| `Released` | Version | When completed |
| `Started` | Date | When development begins |
| `Completed` | Date | When feature is done |
| `Implementation Notes` | Text | When completed |

## Actions

### 1. Find or Create FEATURE_LIST.md

**CRITICAL**: Before any operation, locate or create the file following this process:

#### Step 1: Scan for Existing File
```
Search entire project for FEATURE_LIST.md (case-insensitive):
- Use Glob to find **/FEATURE_LIST.md, **/feature_list.md
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
"FEATURE_LIST.md not found. Where should I create it?
1. docs/FEATURE_LIST.md (recommended for project documentation)
2. .claude/FEATURE_LIST.md (keeps it private to Claude Code)

Reply 1 or 2, or specify a custom path."
```

#### Step 4: Create Based on User Choice
```
If user chooses "1" or "docs": Create at docs/FEATURE_LIST.md
If user chooses "2" or ".claude": Create at .claude/FEATURE_LIST.md
If user specifies path: Create at that location
If no response (timeout): Default to .claude/FEATURE_LIST.md
```

#### Step 5: Create Directory If Needed
```
If docs/ doesn't exist: Create docs/ directory first
If .claude/ doesn't exist: Create .claude/ directory first
```

#### Step 6: Initialize with Template
```markdown
# Feature List

_Last Updated: [Current DateTime]_

---

## Feature Index
<!-- Quick reference table for all features -->

| ID | Category | Status | Priority | Title | Planned | Released | Created | Started | Completed |
|----|----------|--------|----------|-------|---------|----------|---------|---------|-----------|
_No features tracked yet_

---

## Feature Details
<!-- Full details for each feature -->

_No feature details yet_

---

## Summary
- Total: 0 (0 Planned, 0 InProgress, 0 Completed)
- By Priority: Critical: 0, High: 0, Medium: 0, Low: 0
- Highest Priority InProgress: None
```

### 2. Add Feature (General Process)

When adding a feature (via /add-feature command or auto-triggered from conversation):

**Input**: Feature description / requirements (from text or file)

**Claude automatically generates**:
1. **Title**: Concise summary
2. **Detailed Description**: Structured breakdown of the feature
3. **Context**: Affected components, scenarios
4. **Priority**: Based on content analysis (user can override)
5. **Planned version**: Auto-detected from project (user can override)
6. **Category**: Based on feature type analysis

**Process**:
1. **Detect current version** for Planned field (suggestion only)
2. Read the current FEATURE_LIST.md
3. Generate the next available sequential ID (001, 002, etc.)
4. **Add to Feature Index table** (quick reference)
5. **Add full details to Feature Details section:**
   - Generated title
   - Category, Status, Priority, Planned, Created
   - **Description**: Structured feature specification
6. Update timestamp and summary
7. Write the updated file

### 3. List Features

When listing features:

**Process**:
1. Find FEATURE_LIST.md
2. Read and parse all features
3. Apply filters (status, priority, version)
4. Sort by: Status (InProgress > Planned > Completed) > Priority > Created
5. Format and display

### 4. Start Next Feature (Automated Development Workflow)

Use the /start-next-feature command for a complete automated workflow:

```
/start-next-feature [id]
```

- **With ID**: Implement the specified feature
- **Without ID**: Auto-select and implement highest priority Planned feature

#### Phase 1: Select Feature

**If ID specified:**
```
1. Read FEATURE_LIST.md
2. Find feature by ID
3. Validate status is "Planned"
4. If not found/in-progress/completed: Report appropriate error
```

**If no ID specified (auto-select):**
```
1. Read FEATURE_LIST.md
2. Find all Planned features
3. Sort by priority (Critical > High > Medium > Low)
4. Select the highest priority feature (oldest if tie)
5. If no planned features: Report "No planned features found"
```

**After selection:**
```
1. Update status to InProgress
2. Set Started date to today
3. Update both Index and Details sections
```

#### Phase 2: Plan Implementation
```
1. Analyze the feature requirements
2. Search codebase for related code
3. Understand existing architecture and patterns
4. Create detailed implementation plan:
   - Files to create/modify
   - Key components/functions needed
   - API design (if applicable)
   - Database changes (if applicable)
5. Present plan to user for approval
6. Wait for user confirmation before proceeding
```

#### Phase 3: TDD Development
```
1. RED Phase - Write tests first:
   - Write unit tests for the feature
   - Run tests to confirm they FAIL
   - Document expected behavior in tests

2. GREEN Phase - Implement minimum code:
   - Write minimum code to pass tests
   - Run tests to confirm they PASS
   - Do not add extra functionality

3. REFACTOR Phase - Improve code:
   - Clean up code structure
   - Remove duplication
   - Improve naming
   - Ensure tests still pass

4. Coverage Check:
   - Verify test coverage is 80%+
   - Add missing tests if needed
```

#### Phase 4: Automated Testing
```
1. Run all unit tests
2. Run integration tests (if applicable)
3. Run type checking (if TypeScript)
4. Run linting
5. Ensure ALL tests pass with 0 errors
6. If any test fails:
   - Fix the issue
   - Re-run tests
   - Repeat until all pass
```

#### Phase 5: Generate Test Guide
```
Create human testing guide at: docs/test-guides/FEATURE_XXX_TEST_GUIDE.md

Include:
1. Feature Overview
   - Feature name and description
   - Version information
   - Test date

2. Test Environment Setup
   - Prerequisites
   - Required data/accounts
   - Environment configuration

3. Test Cases (for each scenario)
   - Test Case ID and Title
   - Preconditions
   - Test Steps (numbered)
   - Expected Results (checkboxes)
   - Actual Results (to be filled)
   - Pass/Fail status

4. Edge Cases
   - Boundary conditions
   - Error scenarios
   - Negative tests

5. Test Summary Template
   - Total cases vs passed/failed
   - Issues found
   - Overall assessment
```

### 5. Complete Feature

When a feature is completed:

1. Read the current FEATURE_LIST.md
2. Find the feature by ID in BOTH sections
3. **Detect current version** (for Released field)
4. **Update Feature Index:** Change status to "Completed", add Released version, add Completed date
5. **Update Feature Details:**
   - Change status to "Completed"
   - Add **Released** version (auto-detected)
   - Add **Completed** date
   - Add **Implementation Notes** (what was done, key decisions)
6. Update timestamp and summary
7. Write the updated file
8. **Check file size and auto-archive if needed:**
   - If file > 5000 lines or > 100KB: Auto-archive completed features older than 30 days
   - If file > 2000 lines or > 50KB: Notify user to consider archiving

### 6. Archive Features

When archiving completed features:

1. Find FEATURE_LIST.md
2. Parse completed features
3. Apply filters (--days, --version, --keep)
4. Check/create FEATURES_ARCHIVED.md
5. Move features to archive (grouped by month)
6. Remove from main file
7. Update summary
8. Confirm with user

## Best Practices

### Writing Good Feature Descriptions

Bad: Add login

Good: User Authentication System
- User registration with email verification
- Password-based login with secure hashing (bcrypt)
- Password reset via email with expiring tokens
- Session management with JWT (15min access, 7d refresh)

### Setting Correct Priority

- **Critical**: Release blocker, security feature, core functionality
- **High**: Major user-facing feature, frequently requested
- **Medium**: Valuable improvement, moderate complexity
- **Low**: Nice-to-have, future consideration

### Planning Versions

- Use semantic versioning (major.minor.patch)
- New features typically go in minor or major versions
- Bug fixes go in patch versions
- Consider dependencies between features

## Error Handling

- If FEATURE_LIST.md does not exist, create it
- If the file is corrupted, attempt to recover and fix the format
- If an ID conflict occurs, increment to the next available ID
- If both sections are empty, show helpful message

## Integration with Other Skills

- Works with /plan for feature implementation planning
- Works with /tdd for test-driven feature development
- Works with known-issues-tracker for related bugs
- Works with /code-review for reviewing implementations

## File Size Management

### Automatic Size Check and Auto-Archive

After each operation, check if FEATURE_LIST.md needs archiving:

#### Size Thresholds

| Threshold | Lines | Size | Action |
|-----------|-------|------|--------|
| Warning | > 2000 | > 50KB | Notify user, suggest archiving |
| Critical | > 5000 | > 100KB | **Auto-archive** completed features older than 30 days |

### Archive File Structure

**Archive File**: `FEATURES_ARCHIVED.md` (same directory as FEATURE_LIST.md)

```markdown
# Archived Features

_Archive Created: YYYY-MM-DD_

---

## 2024-01 Archived Features

### 001: User Authentication (COMPLETED 2024-01-15)
- **Category**: New
- **Status**: Completed
- **Planned**: v1.0.0
- **Released**: v1.0.0
- **Created**: 2024-01-10
- **Completed**: 2024-01-15
[Full feature details preserved]

---

## Summary
- Total Archived: X features
- Archive Started: YYYY-MM-DD
```

## Commands Summary

| Command | Purpose |
|---------|---------|
| `/add-feature "description"` | Add a new feature (Claude generates title, details, suggests priority/version) |
| `/add-feature -f [file]` | Add feature from file content |
| `/list-features` | List features with filtering |
| `/start-next-feature [id]` | Automated workflow: Plan → TDD → Test → Generate Test Guide (omit ID for auto-select) |
| `/complete-feature [id]` | Mark feature as completed with version |
| `/archive-features` | Archive completed features to reduce file size |
