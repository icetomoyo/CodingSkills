---
description: Archive completed features from FEATURE_LIST.md to FEATURES_ARCHIVED.md to reduce file size and optimize LLM context usage.
---

# Archive Features

Move completed features from FEATURE_LIST.md to FEATURES_ARCHIVED.md to keep the main file manageable.

## Usage

```
/archive-features [options]
```

## Options

| Option | Description |
|--------|-------------|
| --all, -a | Archive ALL completed features (default) |
| --days N, -d N | Only archive features completed > N days ago |
| --keep N, -k N | Keep last N completed features in main file |
| --version V | Only archive features released in version V |
| --dry-run | Preview what would be archived without making changes |

## Workflow

### Step 1: Find FEATURE_LIST.md
```
1. Search for FEATURE_LIST.md in project
2. If not found: "No FEATURE_LIST.md found."
3. If found: Proceed to read
```

### Step 2: Parse Completed Features
```
1. Read FEATURE_LIST.md
2. Find all features with Status = "Completed"
3. Parse completion date and version info
```

### Step 3: Apply Filters
```
If --days 30: Keep features completed within last 30 days
If --keep 5: Keep 5 most recently completed features
If --version v1.0.0: Only archive features with Released = v1.0.0
If --all: Archive all completed features (no filter)
```

### Step 4: Dry Run (if --dry-run)
```
Display what would be archived:
"This would archive 3 features:
 - 001: 用户登录系统 (Completed 2024-01-15)
 - 002: 暗黑模式 (Completed 2024-01-20)
 - 005: 支付系统 (Completed 2024-02-01)"

Ask: "Proceed with archive? (Y/n)"
```

### Step 5: Create/Update FEATURES_ARCHIVED.md
```
1. Check if FEATURES_ARCHIVED.md exists
2. If not, create with header
3. Group features by completion month:
   ## 2024-01 Archived Features
   ## 2024-02 Archived Features
4. Append archived features to appropriate month section
5. Preserve ALL feature details
```

### Step 6: Update FEATURE_LIST.md
```
1. Remove archived features from Feature Index table
2. Remove archived features from Feature Details section
3. Update Summary counts
4. Add archive note:
   > X features archived to FEATURES_ARCHIVED.md on YYYY-MM-DD
5. Update Last Updated timestamp
```

### Step 7: Confirm Results
```
Display summary of what was archived
```

## Archive File Structure

**File**: `FEATURES_ARCHIVED.md` (same directory as FEATURE_LIST.md)

```markdown
# Archived Features

_Archive Created: 2024-02-21_

---

## 2024-01 Archived Features

### 001: 用户登录系统 (COMPLETED 2024-01-15)
- **Category**: New
- **Status**: Completed
- **Priority**: Critical
- **Planned**: v1.0.0
- **Released**: v1.0.0
- **Created**: 2024-01-10
- **Started**: 2024-01-12
- **Completed**: 2024-01-15

**Description**:
实现完整的用户登录系统，包括邮箱密码登录和OAuth第三方登录。

**Implementation Notes**:
- JWT认证，15分钟access token
- Google和GitHub OAuth支持
- 测试覆盖率91%

---

### 002: 暗黑模式支持 (COMPLETED 2024-01-20)
- **Category**: Enhancement
- **Status**: Completed
- **Priority**: Medium
- **Planned**: v1.0.0
- **Released**: v1.0.0
- **Created**: 2024-01-15
- **Started**: 2024-01-18
- **Completed**: 2024-01-20

**Description**:
为应用添加暗黑模式主题支持，包括系统主题跟随和手动切换。

**Implementation Notes**:
- CSS自定义属性实现主题切换
- localStorage持久化用户偏好

---

## 2024-02 Archived Features

### 005: 支付系统集成 (COMPLETED 2024-02-01)
- **Category**: New
- **Status**: Completed
- **Priority**: Critical
- **Planned**: v1.1.0
- **Released**: v1.1.0
- **Created**: 2024-01-20
- **Started**: 2024-01-25
- **Completed**: 2024-02-01

**Description**:
集成支付宝和微信支付，支持订单管理和退款功能。

**Implementation Notes**:
- 支付宝SDK v3.0
- 微信支付SDK v3.1
- 订单30分钟未支付自动取消

---

## Summary
- Total Archived: 3 features
- Archive Started: 2024-01-15
- Last Archived: 2024-02-21
```

## Output Examples

### Archive All Completed Features
```
User: /archive-features

Finding FEATURE_LIST.md...
Parsing completed features...

Found 5 completed features:
| ID | Title | Completed | Released |
|----|-------|-----------|----------|
| 001 | 用户登录系统 | 2024-01-15 | v1.0.0 |
| 002 | 暗黑模式支持 | 2024-01-20 | v1.0.0 |
| 005 | 支付系统集成 | 2024-02-01 | v1.1.0 |
| 007 | 文件上传 | 2024-02-10 | v1.1.0 |
| 010 | 搜索功能 | 2024-02-15 | v1.2.0 |

Archive all 5 completed features? (Y/n): Y

Creating/updating FEATURES_ARCHIVED.md...
Updating FEATURE_LIST.md...

=== ARCHIVE COMPLETE ===

Archived: 5 features
- 2024-01: 2 features
- 2024-02: 3 features

FEATURE_LIST.md size: 15KB → 8KB
Remaining: 3 Planned, 2 InProgress

Archive location: docs/FEATURES_ARCHIVED.md
```

### Archive Features Older Than 30 Days
```
User: /archive-features --days 30

Finding FEATURE_LIST.md...
Parsing completed features...

Current date: 2024-02-21
Cutoff date: 2024-01-22 (30 days ago)

Features to archive (completed before 2024-01-22):
| ID | Title | Completed | Days Old |
|----|-------|-----------|----------|
| 001 | 用户登录系统 | 2024-01-15 | 37 |
| 002 | 暗黑模式支持 | 2024-01-20 | 32 |

Features to keep (completed after 2024-01-22):
| ID | Title | Completed |
|----|-------|-----------|
| 005 | 支付系统集成 | 2024-02-01 |
| 007 | 文件上传 | 2024-02-10 |
| 010 | 搜索功能 | 2024-02-15 |

Archive 2 features? (Y/n): Y

=== ARCHIVE COMPLETE ===

Archived: 2 features (older than 30 days)
Kept: 3 features (recent)

FEATURE_LIST.md size: 15KB → 12KB
```

### Keep Last N Features
```
User: /archive-features --keep 3

Finding FEATURE_LIST.md...
Parsing completed features...

Found 5 completed features.
Keeping 3 most recent, archiving 2 older ones.

To Archive:
| ID | Title | Completed |
|----|-------|-----------|
| 001 | 用户登录系统 | 2024-01-15 |
| 002 | 暗黑模式支持 | 2024-01-20 |

To Keep:
| ID | Title | Completed |
|----|-------|-----------|
| 005 | 支付系统集成 | 2024-02-01 |
| 007 | 文件上传 | 2024-02-10 |
| 010 | 搜索功能 | 2024-02-15 |

Archive 2 features? (Y/n): Y

=== ARCHIVE COMPLETE ===

Archived: 2 features
Kept: 3 most recent completed features
```

### Dry Run
```
User: /archive-features --days 30 --dry-run

Finding FEATURE_LIST.md...
Parsing completed features...

=== DRY RUN (No changes will be made) ===

Would archive 2 features:
- 001: 用户登录系统 (Completed 2024-01-15, 37 days ago)
- 002: 暗黑模式支持 (Completed 2024-01-20, 32 days ago)

Would keep 3 features:
- 005: 支付系统集成 (Completed 2024-02-01, 20 days ago)
- 007: 文件上传 (Completed 2024-02-10, 11 days ago)
- 010: 搜索功能 (Completed 2024-02-15, 6 days ago)

Estimated size reduction: 15KB → 12KB

Run without --dry-run to perform the archive.
```

## When to Archive

### Automatic Suggestions

The system will automatically suggest archiving when:

| Condition | Message |
|-----------|---------|
| File > 2000 lines or > 50KB | "File is getting large. Consider /archive-features." |
| File > 5000 lines or > 100KB | "File is too large. Auto-archiving features older than 30 days." |

### Manual Archiving

Good times to manually archive:
- After a major release
- When starting a new sprint
- When file becomes hard to navigate
- Before important presentations/reviews

## Best Practices

1. **Keep Recent Features**: Use `--keep 5` or `--days 30` to keep recently completed features visible
2. **Archive by Version**: Use `--version v1.0.0` to clean up after releases
3. **Preview First**: Use `--dry-run` to see what will be archived
4. **Regular Maintenance**: Archive monthly or after each release
5. **Keep Archive File**: Never delete FEATURES_ARCHIVED.md - it's your feature history

## Related Commands

- `/add-feature` - Add a new feature
- `/list-features` - View all features
- `/start-next-feature` - Begin implementing highest priority feature
- `/complete-feature [id]` - Mark feature as completed

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
