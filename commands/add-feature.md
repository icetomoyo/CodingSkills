---
description: Add a new feature to FEATURE_LIST.md. Provide a feature description (text or file), and Claude will automatically generate title, detailed description, suggest priority and version.
---

# Add Feature

Add a new feature to the FEATURE_LIST.md file.

## Usage

```
/add-feature "feature description"
/add-feature "feature description" -c [category] -p [priority] -v [version]
/add-feature -f [filepath]
```

## Parameters

| Option | Description | Required |
|--------|-------------|----------|
| description | Feature description / requirements | Yes (unless -f) |
| -f, --file | Path to file containing feature description | No |
| -c, --category | Category: New, Enhancement, Refactor, Internal | No (auto-suggested) |
| -p, --priority | Priority: Critical, High, Medium, Low | No (auto-suggested) |
| -v, --version | Target release version | No (auto-detected) |

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
5. **Auto-Detect Version** - Detect current version for Planned field from:
   - package.json → version
   - VERSION file
   - pyproject.toml → project.version
   - Cargo.toml → package.version
   - Git tag (nearest)
   - Fallback: "unknown"

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

### Step 2: Process Input
```
If text: Parse feature description
If file (-f): Read and parse file content
```

### Step 3: Analyze and Generate
```
1. Generate Title from description
2. Structure Description with details
3. Suggest Category based on feature type
4. Suggest Priority based on importance keywords
5. Detect version for Planned field
```

### Step 4: Confirm with User
```
Display generated feature:
---
Title: [Generated Title]
Category: [Suggested Category]
Priority: [Suggested Priority]
Planned: [Detected Version]

Description:
[Structured description]
---

Add this feature? (Y/n/edit):
```

### Step 5: Add to FEATURE_LIST.md
```
1. Read current file
2. Generate next sequential ID (001, 002, etc.)
3. Add to Feature Index table:
| ### | [Category] | Planned | [Priority] | [Title] | [Version] | - | YYYY-MM-DD | - | - |

4. Add to Feature Details section:
### ###: [Title]
- **Category**: [Category]
- **Status**: Planned
- **Priority**: [Priority]
- **Planned**: [Version]
- **Created**: YYYY-MM-DD

**Description**:
[Structured description]

5. Update Summary section
6. Write file
```

### Step 6: Confirm
```
"Added ###: [Title] ([Category], [Priority])
 Planned for: [version]
 Use /start-next-feature to begin implementation."
```

## Output Example

### Text Input
```
User: /add-feature "需要添加用户登录功能，支持邮箱密码登录和OAuth第三方登录（Google、GitHub）"

Analyzing feature description...
Detecting version... Found: v1.2.0 (from package.json)

Generated Feature:
---
Title: 用户登录系统
Category: New (suggested)
Priority: High (suggested - core functionality)
Planned: v1.2.0

Description:
实现完整的用户登录系统，包括：
- 邮箱密码注册/登录
- 密码安全加密存储（bcrypt）
- OAuth2 第三方登录集成
  - Google 登录
  - GitHub 登录
- 登录态管理（JWT Token）
- 记住登录状态功能
---

Add this feature? (Y/n/edit): Y

Added 001: 用户登录系统 (New, High)
Planned for: v1.2.0
Use /start-next-feature to begin implementation.
```

### File Input
```
User: /add-feature -f ./docs/payment-feature-spec.md

Reading file: ./docs/payment-feature-spec.md
---
Content: "支付功能需求：
1. 支持支付宝和微信支付
2. 订单创建后30分钟未支付自动取消
3. 支付成功后发送通知
4. 支持退款功能"
---

Detecting version... Found: v1.2.0 (from package.json)

Generated Feature:
---
Title: 支付系统集成
Category: New (suggested)
Priority: Critical (suggested - core business feature)
Planned: v1.2.0

Description:
集成第三方支付系统，支持多种支付方式：
- 支付渠道
  - 支付宝支付
  - 微信支付
- 订单管理
  - 订单创建
  - 30分钟未支付自动取消
- 通知机制
  - 支付成功通知
- 退款功能
  - 全额退款
  - 部分退款
---

Add this feature? (Y/n/edit): Y

Added 002: 支付系统集成 (New, Critical)
Planned for: v1.2.0
```

### With Override Options
```
User: /add-feature "暗黑模式支持" -c Enhancement -p Medium -v v1.3.0

Detecting version... Found: v1.2.0 (from package.json)
User override: v1.3.0

Generated Feature:
---
Title: 暗黑模式支持
Category: Enhancement (user specified)
Priority: Medium (user specified)
Planned: v1.3.0 (user specified)

Description:
为应用添加暗黑模式主题支持：
- 跟随系统主题设置
- 手动切换开关
- 持久化用户偏好设置
- 所有 UI 组件适配暗黑主题
---

Add this feature? (Y/n/edit): Y

Added 003: 暗黑模式支持 (Enhancement, Medium)
Planned for: v1.3.0
```

## Related Commands

- `/list-features` - View all features
- `/start-next-feature` - Begin implementing highest priority feature
- `/complete-feature [id]` - Mark feature as completed
- `/archive-features` - Archive completed features

## Related Skills

- [known-issues-tracker](../skills/known-issues-tracker/SKILL.md) - For tracking bugs and issues
