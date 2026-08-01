---
name: feature-manager
description: 管理 feature 全生命周期:登记到 FEATURE_LIST.md、建设计块、指向构建链、完成收尾。
disable-model-invocation: true
argument-hint: "[description] | [id] | [-v version]"
---

# Feature Manager(feature 管理)

用 FEATURE_LIST.md 和 docs/features/ 设计文档追踪、规划、管理软件 feature 的生命周期。

> 报 bug / issue → 转 `issue-manager`;问已有功能(非新需求)→ 不激活。

## File Structure

```
docs/
├── FEATURE_LIST.md        # Feature 索引和状态
├── features/              # Feature 设计文档
│   ├── v1.0.0.md         # v1.0.0 版本所有 feature 设计
│   ├── v1.1.0.md         # v1.1.0 版本所有 feature 设计
│   └── unplanned.md      # 未确定版本的设计草案
└── test-guides/          # 测试指导文档(由 human-test-guide 生成)
```

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

当 Start Next Feature 动作发现目标 feature 缺少 Part B 的独立设计块时，**必须**先从 Part A 版本叙事中抽取本 feature 的 6 节草案，经用户确认后追加到文档末尾，再进入规划。详见 Core Actions #3 Phase 2。

Add Feature 动作向"纯版本级叙事"格式的文档追加新 feature 时，会发出一次性警告，提示同版本已有 feature 会在 Start Next Feature 时被按需抽取。

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

任何操作前先定位或创建文件:

1. **扫描现有文件**: 用 Glob 查找 `**/FEATURE_LIST.md`
2. **找到**: 用现有位置,继续操作
3. **未找到**: 询问用户位置偏好:
   - `docs/FEATURE_LIST.md`（推荐）
   - `.claude/FEATURE_LIST.md`（private）
4. **按需创建目录**,然后初始化空模板
5. **文件损坏**: 尝试恢复并修格式

**完成判据**: FEATURE_LIST.md 存在且可读写,或已确认沿用现有文件位置。

### 2. Add Feature

**输入**: Feature 描述 / 需求(来自文本或文件)

**版本分配逻辑**:
- **用户指定 -v**: 直接用该版本
- **有 Planned 版本**: 用它(通知用户)
- **无 Planned 版本**: 检测当前版本,建议下一版本,请用户确认(版本检测优先级见 `smart-release` 的 Version Detection Priority)

**流程**:
1. 检测版本填入 feature
2. 生成下一个顺序 ID(001, 002, …)
3. 生成 feature 元数据(Title, Description, Category, Priority)
4. 更新 FEATURE_LIST.md(Index + Details 段)
5. 创建/更新设计文档 `docs/features/v{VERSION}.md`:
   - 若文件不存在: 按标准模板创建
   - 若文件存在且已含 `## FEATURE_` 块: 按 ID 顺序追加新 feature 块
   - 若文件存在但为**纯版本级叙事**(有版本目标/范围/验收等章节,但无任何 `## FEATURE_` 块): 发出一次性警告,告知新 feature 将以独立块形式追加,且同版本已列出但无独立块的其他 features 将在 Start Next Feature 时按需抽取,用户确认后继续
6. 更新时间戳

**完成判据**: 新 feature 同时出现在 FEATURE_LIST.md 的 Index 与 Details;设计文档 `docs/features/v{VERSION}.md` 已含该 feature 的 `## FEATURE_{ID}` 块(或纯叙事警告已发);ID 无冲突;时间戳已更新。

### 3. Start Next Feature

**Phase 1 - Select Feature**:
- With ID: Find and validate feature is "Planned"
- Without ID: Auto-select highest priority Planned feature from next release version

**Phase 2 - Ensure Feature Design Block**:

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

*2.3 Point to Build Chain*

设计块就绪后，本 skill 的工作结束。告诉用户按「构建链（人驱动）」节敲构建链，全部完成后运行 `/feature-manager` Complete。

**完成判据**: 设计块已就绪（Case A/B/C 处理完毕）；用户已被告知构建链步骤。

### 4. Complete Feature

1. Find feature by ID
2. Validate status is "InProgress"
3. Auto-detect current version for Released field
4. Update FEATURE_LIST.md and design document
5. Check if version is complete (notify if all features done → 提醒运行 `/smart-release` 发布)

**完成判据**: feature 状态已转 Completed;Released 版本已填;FEATURE_LIST.md 与设计文档两处均已更新;版本完成度已检查(全部完成时已提醒发布)。

### 5. Archive Features

When FEATURE_LIST.md exceeds thresholds:
- **Warning**: > 2000 lines or > 50KB → Notify user
- **Critical**: > 5000 lines or > 100KB → Auto-archive completed features > 30 days old

Archive to `FEATURES_ARCHIVED.md`, grouped by month.

**完成判据**: 归档后 FEATURE_LIST.md 行数/体积降至阈值以下;被归档 feature 在 FEATURES_ARCHIVED.md 中按月分组且详情完整。

## 构建链（人驱动）

本 skill **不自动跑构建链**。Start 登记后，人逐个敲：

```
/to-spec → /to-tickets → /implement → /human-test-guide(可选)
```

- `to-spec`：综合 spec，调 grilling 对齐关键决策，写入设计块 Part B
- `to-tickets`：拆成 tracer-bullet 垂直切片票，写入设计块实现步骤
- `implement`：逐票构建（调 tdd 测试先行 + code-review 双轴评审），提交
- `human-test-guide`：生成测试指导文档

每步产出流入设计块。人 review 后敲下一个。全部完成后 `/feature-manager` Complete，再 `/smart-release` 发布。

## Integration with Other Skills

构建链见上「构建链（人驱动）」节。其余关系:

- `grilling`：to-spec 内部调，对齐关键决策
- `tdd` / `code-review`：implement 内部调
- `issue-manager`：feature 开发中发现的 bug 转交

## Operations

通过 `/feature-manager` 触发以下操作:

| 操作 | 示例 |
|------|------|
| 添加 feature | "添加一个 feature:用户登录" |
| 开始下一个 feature | "开始下一个 feature"(可带 ID:"开始 feature 001") |
| 完成 feature | "完成 feature 001" |
| 归档 | "归档已完成的 features" |
| 列出 | "列出所有 features" / "有哪些 in progress 的 feature" |
