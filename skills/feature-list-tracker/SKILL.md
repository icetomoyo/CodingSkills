---
name: feature-list-tracker
description: Track features with FEATURE_LIST.md. Auto-activates on "feature/functionality/功能/特性" keywords. Use /add-feature, /start-next-feature.
argument-hint: "[description] | [id] | [-v version]"
---

# Feature List Tracker

This skill provides a standardized way to track, plan, and implement software features using a FEATURE_LIST.md file and docs/features/ design documents.

## Automatic Activation Triggers

This skill should be automatically activated when the user message contains:

**Keywords:**
- feature, functionality, capability, 功能, 特性, 新功能
- add, implement, create, build, develop, 添加, 开发, 实现
- support, enable, allow, 支持, 启用
- enhancement, improvement, upgrade, 增强, 改进, 升级
- roadmap, backlog, sprint, milestone, 路线图, 里程碑
- user story, user need, 用户故事, 需求
- "plan to add", "going to", "will add", "should have", 计划添加, 准备开发
- "in the future", "upcoming", "next version", 下一版本, 未来

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

## Design Document Structure（重要）

`docs/features/v{VERSION}.md` 采用**双层结构**，两层必须同时存在：

### Part A - 版本级叙事（可选但常见）

描述"这个版本整体要做什么"：版本目标、本版本范围、MVP 主流程、验收标准、前端/架构基线等。很多项目习惯先手写这部分。

### Part B - Per-Feature 设计块（必须）

每个 feature 一个独立的 `## FEATURE_{ID}: {Title}` 块，含 6 节：
1. 需求概述
2. 影响范围
3. 技术方案
4. 接口契约
5. 实现步骤
6. 验收标准

### 为什么两层都要有

仅有 Part A 的"纯版本级叙事"格式（例如只在 2.1 节列了 feature 标题清单，其余全是整版通用内容）会导致：
- `FEATURE_LIST.md` 中 `docs/features/v{VERSION}.md#{ID}` 锚点不存在
- 实施时 coding agent 只能从散落在多个章节的叙事里推测单个 feature 的意图
- 不同 feature 边界模糊、共享版本级叙事 → **实现明显偏离**

### 自动抽取机制

当 `/start-next-feature` 或 Start Next Feature 动作发现目标 feature 缺少 Part B 的独立设计块时，**必须**先从 Part A 版本叙事中抽取本 feature 的 6 节草案，经用户确认后追加到文档末尾，再进入规划。详见 Core Actions #3 Phase 2。

`/add-feature` 向"纯版本级叙事"格式的文档追加新 feature 时，会发出一次性警告，提示同版本已有 feature 会在 `/start-next-feature` 时被按需抽取。

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
5. Create/update design document at `docs/features/v{VERSION}.md`:
   - 若文件不存在: 按标准模板创建
   - 若文件存在且已含 `## FEATURE_` 块: 按 ID 顺序追加新 feature 块
   - 若文件存在但为**纯版本级叙事**（有版本目标/范围/验收等章节，但无任何 `## FEATURE_` 块）: 发出一次性警告，告知新 feature 将以独立块形式追加，且同版本已列出但无独立块的其他 features 将在 `/start-next-feature` 时按需抽取，用户确认后继续
6. Update timestamp

### 3. Start Next Feature (`/start-next-feature`)

**Phase 1 - Select Feature**:
- With ID: Find and validate feature is "Planned"
- Without ID: Auto-select highest priority Planned feature from next release version

**Phase 2 - Ensure Feature Design Block & Plan Implementation**:

*2.1 Locate Feature Design Block*

在规划前先读 `docs/features/v{VERSION}.md`，查找 `## FEATURE_{ID}` 标题，分三种形态处理：

- **Case A** 设计块存在且 6 节已填充 → 作为规划输入，跳到 2.3
- **Case B** 设计块存在但 6 节为 `_待 ... 填充_` 占位 → 跳到 2.3，在规划后填充
- **Case C** 设计块**不存在**（文档为纯版本级叙事）→ 进入 2.2 抽取

*2.2 Extract Feature Design from Version Narrative（仅 Case C）*

必须执行，不可跳过：

1. 读整份 `docs/features/v{VERSION}.md`
2. 识别与本 feature 相关的内容碎片（feature 标题、点名段落、适用的验收标准、适用的技术基线等）
3. 起草 6 节内容（**不发明、不越界、可归因**）：
   - 需求概述: 从版本范围 + feature 标题 + 点名段落得出本 feature 独立目标
   - 影响范围 / 接口契约: 有就抽，没有就写 `_待 Plan 阶段细化_`
   - 技术方案: 只保留本 feature 用得到的版本技术基线部分
   - 实现步骤: 通常留 `_待 Plan 阶段细化_`
   - 验收标准: 从版本级"验收标准 / 通过标准"中挑出仅适用于本 feature 的条目
4. 展示草案给用户（附**归因章节**列表，便于核验），Y 采纳 / n 终止 / edit 编辑
5. 采纳后追加到 `docs/features/v{VERSION}.md` 末尾（按 ID 排序插入），**不修改原版本级叙事**
6. 更新 `FEATURE_LIST.md` 中 Design 链接确保锚点对应

*2.3 Plan Implementation*

前置: 已有 `## FEATURE_{ID}` 设计块（A / B / 2.2 抽取产物）
输入: 该设计块 6 节 + 版本级叙事中的相关上下文

- Analyze codebase for related code
- Create detailed implementation plan
- Update design document：Case A 不覆盖原内容、Case B/C 补完 Plan 细化后的"影响范围/实现步骤"等
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
- Output: `docs/test-guides/FEATURE_{ID}_{VERSION}_TEST_GUIDE.md`

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
