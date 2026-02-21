---
description: List all features from FEATURE_LIST.md with optional filtering by status, priority, and version.
---

# List Features

List features from FEATURE_LIST.md with various filtering and sorting options.

## Usage

```
/list-features [options]
```

## Options

| Option | Description |
|--------|-------------|
| --all, -a | Show all features (default) |
| --planned | Show only planned features |
| --in-progress, --inprogress | Show only in-progress features |
| --completed | Show only completed features |
| --critical | Filter to critical priority |
| --high | Filter to high priority |
| --medium | Filter to medium priority |
| --low | Filter to low priority |
| --version | Filter by target release version |
| --category | Filter by category (New, Enhancement, Refactor, Internal) |
| --stats | Show statistics summary only |

## Workflow

### Step 1: Find FEATURE_LIST.md
```
1. Search for FEATURE_LIST.md in project
2. If not found: "No FEATURE_LIST.md found. Use /add-feature to create one."
3. If found: Proceed to read
```

### Step 2: Read and Parse
```
1. Read FEATURE_LIST.md
2. Parse all features from Index and Details sections
3. Parse summary statistics
```

### Step 3: Apply Filters
```
If --planned: Filter Status = "Planned"
If --in-progress: Filter Status = "InProgress"
If --completed: Filter Status = "Completed"
If --critical/--high/--medium/--low: Filter by Priority
If --version: Filter by Planned version
If --category: Filter by Category
```

### Step 4: Sort Results
```
Sort order:
1. Status: InProgress > Planned > Completed
2. Priority: Critical > High > Medium > Low
3. Created date: Oldest first
```

### Step 5: Display Output
```
Format and display features with relevant details
```

## Output Format

```
=== FEATURE LIST ===
Last Updated: 2024-02-21 15:30

--- IN PROGRESS (2) ---

[NEW, CRITICAL] 001: 用户登录系统
  Planned: v1.2.0 | Started: 2024-02-25
  Description: 邮箱密码登录 + OAuth第三方登录

[NEW, HIGH] 004: 支付系统集成
  Planned: v1.2.0 | Started: 2024-02-28
  Description: 支付宝/微信支付，订单管理，退款

--- PLANNED (3) ---

[ENHANCEMENT, MEDIUM] 003: 暗黑模式支持
  Planned: v1.3.0
  Description: 跟随系统主题，手动切换

[NEW, HIGH] 005: 文件上传系统
  Planned: v1.2.0
  Description: 多文件上传，进度显示，断点续传

[REFACTOR, LOW] 006: API响应缓存
  Planned: v1.4.0
  Description: Redis缓存层，可配置TTL

--- COMPLETED (2) ---

[ENHANCEMENT, MEDIUM] 002: 个人资料编辑 (COMPLETED 2024-03-10)
  Planned: v1.2.0 → Released: v1.2.0

[NEW, HIGH] 007: 数据库迁移 (COMPLETED 2024-02-28)
  Planned: v1.2.0 → Released: v1.2.0

=== SUMMARY ===
Total: 7 | In Progress: 2 | Planned: 3 | Completed: 2
By Category: New: 4, Enhancement: 2, Refactor: 1
By Priority: Critical: 1, High: 3, Medium: 2, Low: 1
Next Release (v1.2.0): 5 features (2 in progress, 2 completed)
Highest Priority InProgress: 001 (用户登录系统)
```

## Stats Only Output

```
User: /list-features --stats

=== FEATURE LIST STATISTICS ===

Total Features: 7

By Status:
  In Progress: 2
  Planned: 3
  Completed: 2

By Category:
  New: 4
  Enhancement: 2
  Refactor: 1
  Internal: 0

By Priority:
  Critical: 1
  High: 3
  Medium: 2
  Low: 1

By Version:
  v1.2.0: 5 features (4 pending, 1 completed)
  v1.3.0: 1 feature
  v1.4.0: 1 feature

Next to Implement: 001 (用户登录系统) - Critical, In Progress
```

## Examples

### List All Features
```
/list-features
```

### List Only In-Progress Features
```
/list-features --in-progress
```

### List High Priority Features
```
/list-features --high
```

### List Features for Specific Version
```
/list-features --version v1.2.0
```

### Combine Filters
```
/list-features --planned --high
```

### Show Statistics Only
```
/list-features --stats
```

## Related Commands

- `/add-feature` - Add a new feature
- `/start-next-feature` - Begin implementing highest priority feature
- `/complete-feature [id]` - Mark feature as completed
- `/archive-features` - Archive completed features

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
