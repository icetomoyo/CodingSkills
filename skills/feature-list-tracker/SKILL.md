---
name: feature-list-tracker
description: Maintain a FEATURE_LIST.md file and docs/features/ directory to track, plan, and implement software features. Features are tracked with lifecycle status (Planned/InProgress/Completed), priority levels, version tracking, and design documentation. Automatically activates when users mention features, functionality, enhancements, or planning. Supports automated development workflow via /start-next-feature command.
---

# Feature List Tracker

This skill provides a standardized way to track, plan, and implement software features using a FEATURE_LIST.md file and docs/features/ design documents.

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

## File Structure

### Main Files

```
docs/
├── FEATURE_LIST.md        # Feature 索引和状态
├── features/              # Feature 设计文档
│   ├── v1.0.0.md         # v1.0.0 版本所有 feature 设计
│   ├── v1.1.0.md         # v1.1.0 版本所有 feature 设计
│   └── unplanned.md      # 未确定版本的设计草案
└── test-guides/          # 测试指导文档（由 human-test-guide 生成）
```

### FEATURE_LIST.md Structure

```markdown
# Feature List

_Last Updated: YYYY-MM-DD HH:MM_

---

## Version Info

| 字段 | 值 | 说明 |
|------|-----|------|
| **Current Release** | v1.0.0 | 最新发布版本（仅供参考） |
| **Planned Version** | v1.1.0 | 当前规划的版本 |

---

## Version Summary

| Version | Status | Features | Progress |
|---------|--------|----------|----------|
| v1.0.0 | Released | 2 | 2/2 (100%) |
| v1.1.0 | InDevelopment | 3 | 1/3 (33%) |
| v1.2.0 | Planned | 1 | 0/1 (0%) |

---

## Feature Index

| ID | Category | Status | Priority | Title | Planned | Released | Design | Created | Started | Completed |
|----|----------|--------|----------|-------|---------|----------|--------|---------|---------|-----------|
| 001 | New | InProgress | High | User authentication | v1.1.0 | - | [Design](features/v1.1.0.md#001) | 2024-02-21 | 2024-02-25 | - |
| 002 | Enhancement | Completed | Medium | Dark mode support | v1.0.0 | v1.0.0 | [Design](features/v1.0.0.md#002) | 2024-02-15 | 2024-02-18 | 2024-03-10 |

---

## Feature Details

### 001: User Authentication System
- **Category**: New
- **Status**: InProgress
- **Priority**: High
- **Planned**: v1.1.0
- **Design**: [v1.1.0.md#001](features/v1.1.0.md#001)
- **Created**: 2024-02-21
- **Started**: 2024-02-21

**Description**:
Implement a complete user authentication system including:
- User registration with email verification
- Password-based login with secure hashing
- Password reset via email
- Session management with JWT tokens

---

## Summary
- Total: X (Y Planned, Z InProgress, A Completed)
- By Priority: Critical: C, High: H, Medium: M, Low: L
- Highest Priority InProgress: [ID] - [Title] (or "None")
```

### Feature Design Document Structure

Located at `docs/features/v{VERSION}.md`:

```markdown
# v1.1.0 Feature Designs

**版本**: v1.1.0
**状态**: InDevelopment
**Feature 数量**: 3

---

## FEATURE_001: 用户登录系统

**Status**: InProgress
**Priority**: High
**Category**: New

### 1. 需求概述
<!-- 从 /add-feature 生成 -->

实现完整的用户登录系统，支持邮箱密码登录和 OAuth 第三方登录。

### 2. 影响范围
<!-- 从 /start-next-feature Phase 2 生成 -->

**需要创建的文件**:
- src/modules/auth/auth.service.ts
- src/modules/auth/auth.controller.ts
- src/modules/auth/jwt.strategy.ts

**需要修改的文件**:
- src/app.module.ts (注册 AuthModule)

**相关现有文件**（参考模式）:
- src/modules/user/user.service.ts

### 3. 技术方案

**依赖**:
- bcrypt: 密码哈希
- jsonwebtoken: JWT 生成
- passport: 认证中间件

**架构模式**:
- Controller-Service-Repository 模式

### 4. 接口契约

**API 端点**:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/oauth/:provider

**数据模型**:
```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  oauthProvider: 'google' | 'github' | null;
  oauthId: string | null;
}
```

### 5. 实现步骤

1. **创建 User 实体** → user.entity.ts
2. **实现 AuthService** → auth.service.ts
3. **实现 AuthController** → auth.controller.ts
4. **配置 JWT 策略** → jwt.strategy.ts

### 6. 验收标准

- [ ] 用户可以用邮箱密码注册
- [ ] 用户可以用邮箱密码登录
- [ ] 用户可以用 OAuth 登录
- [ ] 登录态可以持久化

---

## FEATURE_002: 暗色模式

**Status**: Planned
...

---

## 版本总结

| Feature | Status | 优先级 |
|---------|--------|--------|
| 001 | InProgress | High |
| 002 | Planned | Medium |
| 003 | Planned | Low |
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

## Version Status

| Status | Definition |
|--------|------------|
| **Planned** | 所有 feature 都是 Planned 状态 |
| **InDevelopment** | 至少一个 feature 是 InProgress 状态 |
| **Released** | 所有 feature 都是 Completed，且版本已发布 |

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
| `Design` | Link | Link to design document |
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

## Version Info

| 字段 | 值 | 说明 |
|------|-----|------|
| **Current Release** | - | （从 package.json/git tag 检测） |
| **Planned Version** | - | （待用户定义） |

---

## Version Summary

| Version | Status | Features | Progress |
|---------|--------|----------|----------|
| _No versions yet_ | | | |

---

## Feature Index

| ID | Category | Status | Priority | Title | Planned | Released | Design | Created | Started | Completed |
|----|----------|--------|----------|-------|---------|----------|--------|---------|---------|-----------|
| _No features tracked yet_

---

## Feature Details

_No feature details yet_

---

## Summary
- Total: 0 (0 Planned, 0 InProgress, 0 Completed)
- By Priority: Critical: 0, High: 0, Medium: 0, Low: 0
- Highest Priority InProgress: None
```

### 2. Manage Feature Design Documents

Design documents are stored in `docs/features/` directory.

#### Directory Creation
```
When creating the first feature design:
1. Check if docs/features/ exists
2. If not, create the directory
3. Create the version file (v{VERSION}.md or unplanned.md)
```

#### Version File Naming
| File | Purpose |
|------|---------|
| `v{VERSION}.md` | Features with determined version (e.g., `v1.1.0.md`) |
| `unplanned.md` | Features without determined version |

#### Adding Feature to Design Document
```
1. Check if the version file exists
2. If not, create with header:
   # v{VERSION} Feature Designs
   **版本**: {VERSION}
   **状态**: Planned
   **Feature 数量**: 0
3. Append feature section with:
   - FEATURE_{ID}: {Title}
   - Status, Priority, Category
   - 需求概述 (from user input)
   - Other sections as placeholders (to be filled in Phase 2)
```

#### Moving Feature Between Versions
```
When feature's Planned version changes:
1. Remove feature section from old version file
2. Add feature section to new version file
3. If old version file becomes empty, delete it
4. Update Design link in FEATURE_LIST.md
5. Update Version Summary
```

### 3. Add Feature (General Process)

When adding a feature (via /add-feature command or auto-triggered from conversation):

**Input**: Feature description / requirements (from text or file)

**Version Assignment Logic**:

```
场景 A：用户通过 -v 指定版本
───────────────────────────────
→ 直接使用指定版本

场景 B：有 Planned 状态的版本存在
───────────────────────────────
→ 检测到 Planned 版本: v1.2.0
→ 新 feature 默认加入该版本
→ （提示用户可用 -v 指定其他版本）

场景 C：没有 Planned 版本
───────────────────────────────
→ 显示当前发布版本: v1.0.0（仅供参考）
→ 建议下一版本: v1.1.0（基于语义化版本）
→ 请用户确认版本号
```

**Process**:
1. Read FEATURE_LIST.md and check Version Summary
2. Determine target version (see logic above)
3. Generate the next available sequential ID (001, 002, etc.)
4. Generate feature metadata:
   - **Title**: Concise summary
   - **Description**: Structured breakdown
   - **Category**: Based on feature type
   - **Priority**: Based on content analysis (user can override)
5. **Update FEATURE_LIST.md**:
   - Add to Feature Index table (with Design link)
   - Add to Feature Details section
   - Update Version Summary
   - Update Version Info if this is first Planned version
6. **Create/Update design document**:
   - Create `docs/features/` if not exists
   - Create or update `v{VERSION}.md`
   - Add feature section with 需求概述
7. Update timestamp

### 4. List Features

When listing features:

**Process**:
1. Find FEATURE_LIST.md
2. Read and parse all features
3. Apply filters (status, priority, version)
4. Sort by: Status (InProgress > Planned > Completed) > Priority > Created
5. Format and display

### 5. Start Next Feature (Automated Development Workflow)

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
4. Check version compatibility:
   - Get the "next" Planned version (lowest version with Planned status)
   - If feature's Planned version > next version:
     - Ask user: "FEATURE_{ID} 当前规划版本为 {feature.version}"
                "但下一个发布版本是 {next.version}"
                "是否将 FEATURE_{ID} 移动到 {next.version}？[Y/n]"
     - If user confirms: Move feature to new version
     - If user rejects: Stop and suggest completing {next.version} first
5. If not found/in-progress/completed: Report appropriate error
```

**If no ID specified (auto-select):**
```
1. Read FEATURE_LIST.md
2. Find the "next" Planned version (lowest version with Planned features)
3. Find all Planned features in that version
4. Sort by priority (Critical > High > Medium > Low)
5. Select the highest priority feature (oldest if tie)
6. If no planned features: Report "No planned features found"
```

**After selection:**
```
1. Update status to InProgress
2. Set Started date to today
3. Update both Index and Details sections
4. Update Version Summary (status may change to InDevelopment)
```

#### Phase 2: Plan Implementation & Update Design Doc

```
1. Analyze the feature requirements
2. Search codebase for related code
3. Understand existing architecture and patterns
4. Create detailed implementation plan

5. **Update design document** with:
   - 影响范围 (files to create/modify)
   - 技术方案 (dependencies, architecture)
   - 接口契约 (API, data models)
   - 实现步骤
   - 验收标准

6. Present plan to user for approval
7. Wait for user confirmation before proceeding
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
调用 human-test-guide skill 生成人工测试指导文档

输出: docs/test-guides/FEATURE_XXX_TEST_GUIDE.md
```

### 6. Complete Feature

When a feature is completed:

1. Read the current FEATURE_LIST.md
2. Find the feature by ID in BOTH sections
3. **Detect current version** (for Released field)
4. **Update FEATURE_LIST.md:**
   - Feature Index: Change status to "Completed", add Released version, add Completed date
   - Feature Details: Change status, add Released, Completed, Implementation Notes
   - Version Summary: Update progress
5. **Update design document:**
   - Change feature Status to "Completed"
   - Add any final implementation notes
6. Update timestamp
7. Write the updated files
8. **Check version completion:**
   - If all features in a version are Completed: Notify user that version is ready for release
9. **Check file size and auto-archive if needed:**
   - If file > 5000 lines or > 100KB: Auto-archive completed features older than 30 days
   - If file > 2000 lines or > 50KB: Notify user to consider archiving

### 7. Archive Features

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

### Version Planning

- Use semantic versioning (major.minor.patch)
- New features typically go in minor or major versions
- Bug fixes go in patch versions
- Features in lower versions should be completed first

## Error Handling

- If FEATURE_LIST.md does not exist, create it
- If the file is corrupted, attempt to recover and fix the format
- If an ID conflict occurs, increment to the next available ID
- If both sections are empty, show helpful message
- If docs/features/ directory doesn't exist, create it

## Integration with Other Skills

- Works with /plan for feature implementation planning
- Works with /tdd for test-driven feature development
- Works with known-issues-tracker for related bugs
- Works with human-test-guide for generating test guides
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
| `/add-feature "description"` | Add a new feature with version assignment |
| `/add-feature -f [file]` | Add feature from file content |
| `/add-feature -v [version]` | Add feature with specified version |
| `/list-features` | List features with filtering |
| `/start-next-feature [id]` | Automated workflow: Plan → TDD → Test → Generate Test Guide |
| `/complete-feature [id]` | Mark feature as completed |
| `/archive-features` | Archive completed features to reduce file size |
