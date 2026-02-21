---
description: Add a new feature to FEATURE_LIST.md. Provide a feature description (text or file), and Claude will automatically generate title, detailed description, suggest priority, and handle version assignment.
---

# Add Feature

Add a new feature to the FEATURE_LIST.md file and create design document entry.

## Usage

```
/add-feature "feature description"
/add-feature "feature description" -c [category] -p [priority] -v [version]
/add-feature -f [filepath]
/add-feature -f [filepath] -v [version]
```

## Parameters

| Option | Description | Required |
|--------|-------------|----------|
| description | Feature description / requirements | Yes (unless -f) |
| -f, --file | Path to file containing feature description | No |
| -c, --category | Category: New, Enhancement, Refactor, Internal | No (auto-suggested) |
| -p, --priority | Priority: Critical, High, Medium, Low | No (auto-suggested) |
| -v, --version | Target release version | No (see version logic below) |

## What Claude Does Automatically

When you provide a feature description, Claude will:

1. **Generate Title** - Summarize the feature into a concise title
2. **Structure Description** - Organize into:
   - What the feature does
   - Key components/functionality
   - User scenarios (if inferable)
3. **Analyze Category** - Suggest based on content:
   - **New**: Brand new functionality
   - **Enhancement**: Improvement to existing feature
   - **Refactor**: Code optimization/restructuring
   - **Internal**: Internal tooling/infrastructure
4. **Suggest Priority** - Based on content analysis:
   - **Critical**: Core functionality, security, release blocker
   - **High**: Major user-facing feature
   - **Medium**: Valuable improvement
   - **Low**: Nice-to-have
5. **Handle Version Assignment** - See version logic below

## Version Assignment Logic

### Scenario A: User specifies version with -v
```
/add-feature "搜索功能" -v v1.2.0
→ Use v1.2.0 directly, no questions asked
```

### Scenario B: Planned version exists
```
/add-feature "搜索功能"

Check FEATURE_LIST.md Version Summary:
- Found Planned version: v1.1.0 (status: Planned)

→ "检测到规划版本: v1.1.0"
→ "新 feature 将加入 v1.1.0"
→ "（使用 -v 可指定其他版本）"
→ Proceed with v1.1.0
```

### Scenario C: No Planned version
```
/add-feature "搜索功能"

Check FEATURE_LIST.md Version Summary:
- No Planned versions found
- Current Release: v1.0.0 (from package.json/git tag)

→ "当前发布版本: v1.0.0"
→ "建议下一版本: v1.1.0（新 feature，建议 minor 升级）"
→ "请确认版本号 [输入版本号或回车使用 v1.1.0]:"

User input: v1.2.0 (or Enter for v1.1.0)
→ Use confirmed version
```

## Workflow

### Step 1: Find or Create FEATURE_LIST.md
```
1. Scan project for existing FEATURE_LIST.md
2. If found: Use existing file
3. If not found: Ask user
   "FEATURE_LIST.md not found. Where should I create it?
   1. docs/FEATURE_LIST.md (recommended)
   2. .claude/FEATURE_LIST.md (private)"
```

### Step 2: Determine Version
```
1. If -v specified: Use that version
2. Else check Version Summary in FEATURE_LIST.md
3. If Planned version exists: Use it (notify user)
4. If no Planned version:
   - Detect current release version (package.json/git tag)
   - Suggest next version based on semantic versioning
   - Ask user to confirm
```

### Step 3: Process Input
```
If text: Parse feature description
If file (-f): Read and parse file content
```

### Step 4: Analyze and Generate
```
1. Generate Title from description
2. Structure Description with details
3. Suggest Category based on feature type
4. Suggest Priority based on importance keywords
```

### Step 5: Confirm with User
```
Display generated feature:
---
Title: [Generated Title]
Category: [Suggested Category]
Priority: [Suggested Priority]
Planned: [Determined Version]

Description:
[Structured description]
---

Add this feature? (Y/n/edit):
```

### Step 6: Add to FEATURE_LIST.md
```
1. Read current file
2. Generate next sequential ID (001, 002, etc.)
3. Create Design link: docs/features/v{VERSION}.md#{ID}
4. Add to Feature Index table:
| ID | Category | Status | Priority | Title | Planned | Released | Design | Created | Started | Completed |

5. Add to Feature Details section:
### ID: [Title]
- **Category**: [Category]
- **Status**: Planned
- **Priority**: [Priority]
- **Planned**: [Version]
- **Design**: [Link]
- **Created**: YYYY-MM-DD

**Description**:
[Structured description]

6. Update Version Summary (add version if new)
7. Update Version Info if this is first Planned version
8. Write file
```

### Step 7: Create/Update Design Document
```
1. Check if docs/features/ directory exists
   - If not, create it

2. Determine design file:
   - If version specified: docs/features/v{VERSION}.md
   - If no version: docs/features/unplanned.md

3. If file doesn't exist, create with header:
   # v{VERSION} Feature Designs
   **版本**: {VERSION}
   **状态**: Planned
   **Feature 数量**: 0

4. Append feature section:
   ## FEATURE_{ID}: {Title}

   **Status**: Planned
   **Priority**: {Priority}
   **Category**: {Category}

   ### 1. 需求概述
   {Description}

   ### 2. 影响范围
   _待 /start-next-feature Phase 2 填充_

   ### 3. 技术方案
   _待 /start-next-feature Phase 2 填充_

   ### 4. 接口契约
   _待 /start-next-feature Phase 2 填充_

   ### 5. 实现步骤
   _待 /start-next-feature Phase 2 填充_

   ### 6. 验收标准
   _待 /start-next-feature Phase 2 填充_

5. Update feature count in header
```

### Step 8: Confirm
```
"Added {ID}: {Title} ({Category}, {Priority})"
"Planned for: {version}"
"Design: docs/features/v{version}.md#{ID}"
"Use /start-next-feature to begin implementation."
```

## Output Example

### Scenario: Planned Version Exists
```
User: /add-feature "需要添加用户登录功能，支持邮箱密码登录和OAuth第三方登录"

Analyzing feature description...
Checking version planning...
检测到规划版本: v1.1.0
新 feature 将加入 v1.1.0
（使用 -v 可指定其他版本）

Generated Feature:
---
Title: 用户登录系统
Category: New (suggested)
Priority: High (suggested - core functionality)
Planned: v1.1.0

Description:
实现完整的用户登录系统，包括：
- 邮箱密码注册/登录
- OAuth2 第三方登录（Google、GitHub）
- 登录态管理（JWT Token）
---

Add this feature? (Y/n/edit): Y

Added 001: 用户登录系统 (New, High)
Planned for: v1.1.0
Design: docs/features/v1.1.0.md#001
Use /start-next-feature to begin implementation.
```

### Scenario: No Planned Version
```
User: /add-feature "支付功能，支持支付宝和微信支付"

Analyzing feature description...
Checking version planning...
No Planned versions found.

当前发布版本: v1.0.0 (from package.json)
建议下一版本: v1.1.0（新 feature，建议 minor 升级）
请确认版本号 [输入版本号或回车使用 v1.1.0]: v1.2.0

Generated Feature:
---
Title: 支付系统集成
Category: New (suggested)
Priority: Critical (suggested - core business feature)
Planned: v1.2.0

Description:
集成第三方支付系统：
- 支付渠道：支付宝、微信支付
- 订单管理与自动取消
- 支付通知
- 退款功能
---

Add this feature? (Y/n/edit): Y

Added 001: 支付系统集成 (New, Critical)
Planned for: v1.2.0
Design: docs/features/v1.2.0.md#001
Use /start-next-feature to begin implementation.
```

### Scenario: User Specifies Version
```
User: /add-feature "暗黑模式支持" -v v1.3.0

Analyzing feature description...
User specified version: v1.3.0

Generated Feature:
---
Title: 暗黑模式支持
Category: Enhancement (suggested)
Priority: Medium (suggested)
Planned: v1.3.0

Description:
为应用添加暗黑模式主题支持：
- 跟随系统主题设置
- 手动切换开关
- 持久化用户偏好
---

Add this feature? (Y/n/edit): Y

Added 002: 暗黑模式支持 (Enhancement, Medium)
Planned for: v1.3.0
Design: docs/features/v1.3.0.md#002
```

## Related Commands

- `/list-features` - View all features
- `/start-next-feature [id]` - Begin implementing a feature
- `/complete-feature [id]` - Mark feature as completed
- `/archive-features` - Archive completed features

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
- [known-issues-tracker](../skills/known-issues-tracker/SKILL.md) - For tracking bugs and issues
