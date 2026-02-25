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

## File Structure

```
docs/
├── FEATURE_LIST.md        # Feature 索引和状态
├── features/              # Feature 设计文档
│   ├── v1.0.0.md         # v1.0.0 版本所有 feature 设计
│   ├── v1.1.0.md         # v1.1.0 版本所有 feature 设计
│   └── unplanned.md      # 未确定版本的设计草案
└── test-guides/          # 测试指导文档（由 human-test-guide 生成）
```

> **格式示例请参考**: [examples/sample.md](examples/sample.md)

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

| Status | Description | Allowed Transitions |
|--------|-------------|---------------------|
| **Planned** | Feature is planned but not started | InProgress |
| **InProgress** | Currently being developed | Completed |
| **Completed** | Feature is done and released | (Terminal state) |

```
Planned ──────► InProgress ──────► Completed
```

## Listing Features

当用户请求列出/查看 features 时（如 "列出所有 features"、"有哪些 in progress 的 feature"），自动执行此功能。

### 过滤选项

| 选项 | 说明 |
|------|------|
| --all, -a | 显示所有 features（默认） |
| --planned | 只显示 Planned 状态 |
| --in-progress, --inprogress | 只显示 InProgress 状态 |
| --completed | 只显示 Completed 状态 |
| --critical | 过滤 Critical 优先级 |
| --high | 过滤 High 优先级 |
| --medium | 过滤 Medium 优先级 |
| --low | 过滤 Low 优先级 |
| --version | 按目标版本过滤 |
| --category | 按类别过滤 (New, Enhancement, Refactor, Internal) |
| --stats | 只显示统计摘要 |

### 输出格式

```markdown
=== FEATURE LIST ===
Last Updated: 2024-02-21 15:30

--- IN PROGRESS (2) ---

[NEW, CRITICAL] 001: 用户登录系统
  Planned: v1.2.0 | Started: 2024-02-25
  Description: 邮箱密码登录 + OAuth第三方登录

--- PLANNED (3) ---

[ENHANCEMENT, MEDIUM] 003: 暗黑模式支持
  Planned: v1.3.0
  Description: 跟随系统主题，手动切换

--- COMPLETED (2) ---

[ENHANCEMENT, MEDIUM] 002: 个人资料编辑 (COMPLETED 2024-03-10)
  Planned: v1.2.0 → Released: v1.2.0

=== SUMMARY ===
Total: 7 | In Progress: 2 | Planned: 3 | Completed: 2
By Priority: Critical: 1, High: 3, Medium: 2, Low: 1
Next Release (v1.2.0): 5 features (2 in progress, 2 completed)
Highest Priority InProgress: 001 (用户登录系统)
```

### 执行步骤

1. 使用 Glob 查找 `**/FEATURE_LIST.md`
2. 读取并解析文件
3. 根据用户请求应用过滤
4. 按状态 → 优先级 → 创建日期排序
5. 格式化输出

---

## Core Actions

### 1. Find or Create FEATURE_LIST.md

**CRITICAL**: Before any operation, locate or create the file:

1. **Scan for existing file**: Use Glob to find `**/FEATURE_LIST.md`
2. **If found**: Use existing location, proceed with operation
3. **If not found**: Ask user for location preference:
   - `docs/FEATURE_LIST.md` (recommended)
   - `.claude/FEATURE_LIST.md` (private)
4. **Create directory if needed**, then initialize with empty template

### 2. Add Feature

**Input**: Feature description / requirements (from text or file)

**Version Assignment Logic**:
- **User specifies -v**: Use that version directly
- **Planned version exists**: Use it (notify user)
- **No Planned version**: Detect current release, suggest next version, ask user to confirm

**Process**:
1. Detect version for the feature
2. Generate next sequential ID (001, 002, etc.)
3. Generate feature metadata (Title, Description, Category, Priority)
4. Update FEATURE_LIST.md (Index + Details sections)
5. Create/update design document at `docs/features/v{VERSION}.md`
6. Update timestamp

### 3. Start Next Feature (`/start-next-feature`)

**Phase 1 - Select Feature**:
- With ID: Find and validate feature is "Planned"
- Without ID: Auto-select highest priority Planned feature from next release version

**Phase 2 - Plan Implementation**:
- Analyze codebase for related code
- Create detailed implementation plan
- Update design document with full details
- Get user approval before proceeding

**Phase 3 - TDD Development**:
- RED: Write tests first (should fail)
- GREEN: Implement minimum code to pass
- REFACTOR: Clean up code
- Verify 80%+ test coverage

**Phase 4 - Automated Testing**:
- Run all tests until 100% pass
- Type check, lint, build

**Phase 5 - Generate Test Guide**:
- Call `human-test-guide` skill
- Output: `docs/test-guides/FEATURE_XXX_TEST_GUIDE.md`

### 4. Complete Feature

1. Find feature by ID
2. Validate status is "InProgress"
3. Auto-detect current version for Released field
4. Update FEATURE_LIST.md and design document
5. Check if version is complete (notify if all features done)

### 5. Archive Features

When FEATURE_LIST.md exceeds thresholds:
- **Warning**: > 2000 lines or > 50KB → Notify user
- **Critical**: > 5000 lines or > 100KB → Auto-archive resolved issues > 30 days old

Archive to `FEATURES_ARCHIVED.md`, grouped by month.

## Error Handling

- If FEATURE_LIST.md does not exist, create it
- If the file is corrupted, attempt to recover and fix the format
- If an ID conflict occurs, increment to the next available ID
- If docs/features/ directory doesn't exist, create it

## Integration with Other Skills

- Works with /plan for feature implementation planning
- Works with /tdd for test-driven feature development
- Works with known-issues-tracker for related bugs
- Works with human-test-guide for generating test guides
- Works with /code-review for reviewing implementations

## Commands Summary

| Command | Purpose |
|---------|---------|
| `/add-feature "description"` | Add a new feature with version assignment |
| `/add-feature -f [file]` | Add feature from file content |
| `/add-feature -v [version]` | Add feature with specified version |
| `/start-next-feature [id]` | Automated workflow: Plan → TDD → Test → Generate Test Guide |
| `/complete-feature [id]` | Mark feature as completed |
| `/archive-features` | Archive completed features to reduce file size |

> **Note**: 列出 features 的功能已整合到此 skill 中。直接说 "列出所有 features" 或调用 `/feature-list-tracker` 即可。
