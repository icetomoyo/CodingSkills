---
description: Mark a feature as completed with auto-detected release version. Updates status, sets completion date, and adds implementation notes.
---

# Complete Feature

Mark a feature as completed after implementation and testing are done.

## Usage

```
/complete-feature [id]
/complete-feature [id] -n "implementation notes"
```

## Parameters

| Option | Description | Required |
|--------|-------------|----------|
| id | Feature ID (e.g., 001) | Yes |
| -n, --notes | Implementation notes | No |

## What This Command Does

1. **Find Feature** - Locate feature by ID
2. **Validate Status** - Must be InProgress
3. **Detect Version** - Auto-detect current version for Released field
4. **Update Status** - Change to Completed
5. **Set Dates** - Record completion date
6. **Add Notes** - Document implementation details
7. **Check Archive** - Notify if file size exceeds threshold

## Workflow

### Step 1: Find FEATURE_LIST.md
```
1. Search for FEATURE_LIST.md
2. If not found: "No FEATURE_LIST.md found."
```

### Step 2: Parse Feature
```
1. Find feature by ID in both Index and Details sections
2. If not found: "Feature [id] not found."
```

### Step 3: Validate Status
```
1. Check current status
2. If Completed: "Feature [id] is already completed."
3. If Planned: "Feature [id] has not been started. Use /start-next-feature first."
4. If InProgress: Proceed
```

### Step 4: Detect Version
```
1. Search for version source files:
   - package.json → version
   - VERSION file
   - pyproject.toml → project.version
   - Cargo.toml → package.version
   - Git tag
2. If found: Use detected version for Released field
3. If not found: Use "unknown"
```

### Step 5: Update Feature Index
```
Change:
- Status: InProgress → Completed
- Released: - → [detected version]
- Completed: - → [today's date]
```

### Step 6: Update Feature Details
```
Change:
- Status: Completed
- Released: [detected version]
- Completed: [today's date]

Add (if provided):
- Implementation Notes: [user notes or summary]
```

### Step 7: Update Summary
```
Update counts:
- InProgress: -1
- Completed: +1
```

### Step 8: Check File Size
```
If file > 5000 lines or > 100KB:
  "File is large. Consider /archive-features to reduce size."
If file > 2000 lines or > 50KB:
  Notify user about size
```

## Output Example

### Basic Completion
```
User: /complete-feature 001

Finding feature 001...
Current status: InProgress

Detecting version... Found: v1.2.0 (from package.json)

Updating FEATURE_LIST.md...

=== FEATURE COMPLETED ===

ID: 001
Title: 用户登录系统
Status: InProgress → Completed
Released: v1.2.0
Completed: 2024-02-21

Feature Index updated:
| 001 | New | Completed | Critical | 用户登录系统 | v1.2.0 | v1.2.0 | 2024-02-15 | 2024-02-18 | 2024-02-21 |

Feature Details updated:
### 001: 用户登录系统 (COMPLETED)
- **Category**: New
- **Status**: Completed
- **Priority**: Critical
- **Planned**: v1.2.0
- **Released**: v1.2.0
- **Created**: 2024-02-15
- **Started**: 2024-02-18
- **Completed**: 2024-02-21

=========================

Feature 001 marked as completed!
Released in: v1.2.0
```

### With Implementation Notes
```
User: /complete-feature 001 -n "使用 JWT 认证，支持 Google 和 GitHub OAuth。测试覆盖率 91%。"

Finding feature 001...
Current status: InProgress

Detecting version... Found: v1.2.0 (from package.json)

Updating FEATURE_LIST.md...

=== FEATURE COMPLETED ===

ID: 001
Title: 用户登录系统
Status: InProgress → Completed
Released: v1.2.0
Completed: 2024-02-21

Implementation Notes Added:
使用 JWT 认证，支持 Google 和 GitHub OAuth。测试覆盖率 91%。

=========================

Feature 001 marked as completed!
Released in: v1.2.0
```

### Error Cases

#### Feature Not Found
```
User: /complete-feature 999

Finding feature 999...
✗ Feature 999 not found in FEATURE_LIST.md

Use /list-features to see all available features.
```

#### Feature Already Completed
```
User: /complete-feature 002

Finding feature 002...
Current status: Completed

✗ Feature 002 is already completed.
Completed on: 2024-02-15
Released in: v1.1.0
```

#### Feature Not Started
```
User: /complete-feature 003

Finding feature 003...
Current status: Planned

✗ Feature 003 has not been started yet.
Use /start-next-feature to begin implementation first.
```

### File Size Warning
```
User: /complete-feature 004

... (normal completion output) ...

⚠️  WARNING: FEATURE_LIST.md is getting large (52KB).
   Consider using /archive-features to reduce file size.
```

## Feature Details After Completion

```markdown
### 001: 用户登录系统 (COMPLETED)
- **Category**: New
- **Status**: Completed
- **Priority**: Critical
- **Planned**: v1.2.0
- **Released**: v1.2.0
- **Created**: 2024-02-15
- **Started**: 2024-02-18
- **Completed**: 2024-02-21

**Description**:
实现完整的用户登录系统，包括：
- 邮箱密码注册/登录
- OAuth2 第三方登录（Google、GitHub）
- 登录态管理（JWT Token）

**Implementation Notes**:
- 使用 JWT 认证，access token 有效期 15 分钟
- 支持 Google 和 GitHub OAuth
- 测试覆盖率 91%，30 个测试用例全部通过
- 人工测试指导: docs/test-guides/FEATURE_001_TEST_GUIDE.md
```

## Related Commands

- `/add-feature` - Add a new feature
- `/list-features` - View all features
- `/start-next-feature` - Begin implementing highest priority feature
- `/archive-features` - Archive completed features

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
