---
description: Mark a feature as completed with auto-detected release version. Updates status in FEATURE_LIST.md and design document, sets completion date, and adds implementation notes.
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
4. **Update FEATURE_LIST.md** - Status, dates, notes
5. **Update Design Document** - Change feature status to Completed
6. **Check Version Completion** - Notify if all features in version are completed
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
3. Get feature's Planned version and Design link
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
3. If not found: Use Planned version as Released version
```

### Step 5: Update FEATURE_LIST.md
```
Feature Index:
- Status: InProgress → Completed
- Released: - → [detected version]
- Completed: - → [today's date]

Feature Details:
- Status: Completed
- Released: [detected version]
- Completed: [today's date]
- Implementation Notes: [user notes or auto-generated summary]

Version Summary:
- Update progress for the version
- If all features completed: status → Released
```

### Step 6: Update Design Document
```
1. Parse Design link to get file path and anchor
   e.g., docs/features/v1.1.0.md#001

2. Read the design file

3. Find the feature section (## FEATURE_001: ...)

4. Update Status: InProgress → Completed

5. Add completion info:
   **Completed**: [date]
   **Released**: [version]

6. Write the updated file
```

### Step 7: Check Version Completion
```
1. Check Version Summary for the feature's version
2. Count completed vs total features
3. If all features are Completed:
   "🎉 版本 {version} 所有 features 已完成！"
   "建议执行以下操作："
   "1. 更新 package.json 版本号为 {version}"
   "2. 创建 git tag {version}"
   "3. 推送代码和 tag"
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
Planned version: v1.1.0

Detecting version... Found: v1.1.0 (from package.json)

Updating FEATURE_LIST.md...
Updating design document: docs/features/v1.1.0.md...

=== FEATURE COMPLETED ===

ID: 001
Title: 用户登录系统
Status: InProgress → Completed
Released: v1.1.0
Completed: 2024-02-21

Feature Index updated.
Feature Details updated.
Design document updated.

Version v1.1.0 progress: 1/3 (33%)
=========================

Feature 001 marked as completed!
Released in: v1.1.0
```

### With Implementation Notes
```
User: /complete-feature 001 -n "使用 JWT 认证，支持 Google 和 GitHub OAuth。测试覆盖率 91%。"

Finding feature 001...
Current status: InProgress
Planned version: v1.1.0

Detecting version... Found: v1.1.0 (from package.json)

Updating FEATURE_LIST.md...
Updating design document: docs/features/v1.1.0.md...

=== FEATURE COMPLETED ===

ID: 001
Title: 用户登录系统
Status: InProgress → Completed
Released: v1.1.0
Completed: 2024-02-21

Implementation Notes Added:
使用 JWT 认证，支持 Google 和 GitHub OAuth。测试覆盖率 91%。

Version v1.1.0 progress: 1/3 (33%)
=========================

Feature 001 marked as completed!
Released in: v1.1.0
```

### Version Complete Notification
```
User: /complete-feature 003

... (normal completion output) ...

🎉 版本 v1.1.0 所有 features 已完成！

建议执行以下操作：
1. 更新 package.json 版本号为 v1.1.0
2. 创建 git tag v1.1.0
3. 推送代码和 tag

Version Summary:
| v1.1.0 | Released | 3 | 3/3 (100%) |
```

### Error Cases

#### Feature Not Found
```
User: /complete-feature 999

Finding feature 999...
✗ Feature 999 not found in FEATURE_LIST.md

直接说 "列出所有 features" 或调用 `/feature-list-tracker` 即可。
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
- **Planned**: v1.1.0
- **Released**: v1.1.0
- **Design**: [v1.1.0.md#001](features/v1.1.0.md#001)
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
- 人工测试指导: docs/test-guides/FEATURE_001_v1.1.0_TEST_GUIDE.md
```

## Design Document After Completion

```markdown
## FEATURE_001: 用户登录系统

**Status**: Completed
**Priority**: Critical
**Category**: New
**Completed**: 2024-02-21
**Released**: v1.1.0

### 1. 需求概述
...

### 6. 验收标准
- [x] 用户可以用邮箱密码注册
- [x] 用户可以用邮箱密码登录
- [x] 用户可以用 OAuth 登录
- [x] 登录态可以持久化
```

## Related Commands

- `/add-feature` - Add a new feature
- `/start-next-feature` - Begin implementing a feature
- `/archive-features` - Archive completed features

> **Note**: 列出 features 的功能已整合到 skill 中，直接说 "列出所有 features" 或调用 `/feature-list-tracker` 即可。

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
