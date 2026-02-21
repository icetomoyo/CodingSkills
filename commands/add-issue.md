---
description: Add a new issue to KNOWN_ISSUES.md. Provide a problem description (text or file), and Claude will automatically generate title, detailed description, and context.
---

# Add Issue Command

This command adds a new issue to the KNOWN_ISSUES.md file. Simply describe the problem, and Claude handles the rest.

## Core Philosophy

**User provides**: Problem description / Actual phenomenon (REQUIRED)
**Claude handles**: Title, detailed description, context analysis, priority suggestion

## Usage

### Text Input
```
/add-issue "问题描述/实际现象"
/add-issue "问题描述/实际现象" -p [priority]
```

### File Input
```
/add-issue -f [filepath]
/add-issue -f [filepath] -p [priority]
```

## Parameters

| Parameter | Short | Description | Required |
|-----------|-------|-------------|----------|
| description | - | Problem description / actual phenomenon | Yes (unless -f is used) |
| -f, --file | -f | Path to file containing problem description | No |
| -p, --priority | -p | High, Medium, or Low (optional override) | No |

## What Claude Does Automatically

When you provide a problem description, Claude will:

1. **Generate Title** - Summarize the problem into a concise title
2. **Structure Description** - Organize into:
   - Current behavior (what's happening)
   - Expected behavior (what should happen)
   - Reproduction steps (if inferable)
3. **Analyze Context** - Identify affected components, scenarios, environments
4. **Suggest Priority** - Based on severity keywords:
   - **High**: "critical", "blocking", "crash", "security", "data loss", "production down"
   - **Medium**: Default for most bugs
   - **Low**: "minor", "cosmetic", "nice to fix", "when you have time"
5. **Auto-Detect Version** - Detect current version for "Introduced" field from:
   - package.json → version
   - VERSION file
   - pyproject.toml → project.version
   - Cargo.toml → package.version
   - Git tag (nearest)
   - Fallback: "unknown"

## Examples

### Simple Text Input
```
/add-issue "登录页面的提交按钮点击后没反应，只在Safari浏览器上出现这个问题"
```
Claude generates:
- Title: Safari 登录页面提交按钮无响应
- Description: 当前行为、预期行为、涉及浏览器
- Context: 登录页面、Safari 浏览器
- Priority: Medium (功能性问题)

### Text with Priority Override
```
/add-issue "生产环境的支付接口经常超时，导致用户订单失败" -p High
```

### File Input
```
/add-issue -f ./notes/bug-report.txt
```
Claude reads the file and extracts the problem description.

### File with Priority Override
```
/add-issue -f ./logs/error.log -p High
```

## File Input Mode

When using `-f` or `--file`:

1. **Read the file** using Read tool
2. **Extract problem description** from:
   - Plain text notes
   - Markdown files
   - Error logs / stack traces
   - Code comments
3. **Generate structured issue** with title, description, context
4. **Confirm with user** before adding

## Priority Guide

| Priority | When Claude Suggests |
|----------|---------------------|
| High | "critical", "blocking", "crash", "security", "data loss", "production" |
| Medium | Default for most bugs |
| Low | "minor", "cosmetic", "nice to fix", "technical debt" |

Use `-p` to override Claude's suggestion.

## Workflow

### Step 1: Find or Create KNOWN_ISSUES.md
```
Search project for KNOWN_ISSUES.md
If not found: Ask user for location (docs/ or .claude/)
```

### Step 2: Process Input
```
Text Input:
- Parse problem description
- Generate title (concise summary)
- Structure detailed description
- Analyze context

File Input:
- Read file content
- Extract problem description
- Generate title, description, context
- Show parsed result for confirmation
```

### Step 3: Determine Priority
```
If -p specified: Use user's priority
Otherwise: Suggest based on severity analysis
```

### Step 4: Auto-Detect Version
```
Search for version source files in order:
1. package.json → version field
2. VERSION file (single line)
3. pyproject.toml → project.version
4. Cargo.toml → package.version
5. Git tag (git describe --tags --abbrev=0)
6. Fallback: "unknown"

Log detected version to user
```

### Step 5: Add to KNOWN_ISSUES.md
```
1. Add to Issue Index table:
| ### | [Priority] | Open | [Title] | [Introduced] | - | YYYY-MM-DD | - |

2. Add to Issue Details section:
### ###: [Title]
- **Priority**: High / Medium / Low
- **Status**: Open
- **Introduced**: [Auto-detected version]
- **Created**: YYYY-MM-DD
- **Original Problem**:
  - Current behavior: [What's happening]
  - Expected behavior: [What should happen]
  - Steps to reproduce: [If known]
- **Context**: [Where/when this occurs, affected components]
- **Root Cause**: [If known]
- **Proposed Solution**: [Optional]
```

### Step 6: Confirm
```
"Added ###: [Title] ([Priority])
 Introduced in: [detected version]
 Use /resolve-next-issue to work on this issue."
```

## Output Example

### Text Input
```
User: /add-issue "搜索功能在数据量大的时候很慢，超过10万条记录的时候搜索要等5秒以上"

Analyzing problem description...
Detecting version... Found: v1.2.0 (from package.json)

Generated Issue:
---
Title: 搜索功能在大数据量下性能缓慢
Priority: Medium (suggested)
Introduced: v1.2.0
Description:
  - Current: Search takes 5+ seconds on 100k+ records
  - Expected: Search should complete within 1 second
  - Affected: Search functionality with large datasets
Context: Search feature, datasets > 100k records
---

Add this issue? (Y/n/edit): Y

Added 005: 搜索功能在大数据量下性能缓慢 (Medium)
Introduced in: v1.2.0
```

### File Input
```
User: /add-issue -f ./notes/mobile-login-issue.txt

Reading file: ./notes/mobile-login-issue.txt
---
Content: "手机上登录有时候会失败，特别是密码里有特殊字符的时候。
用户说输入了正确的密码但是提示'密码错误'。
大概影响5%左右的手机登录。iOS Safari 和 Android Chrome 都有这个问题。"
---

Detecting version... Found: v1.2.0 (from package.json)

Generated Issue:
---
Title: 手机端密码含特殊字符时登录失败
Priority: High (login functionality affected)
Introduced: v1.2.0
Description:
  - Current: Users with special characters in password get 'Invalid credentials' error
  - Expected: All valid passwords should work
  - Reproduction: Use password with special chars on mobile browser
Context: Mobile browsers (iOS Safari, Android Chrome), ~5% of mobile logins
---

Add this issue? (Y/n/edit): Y

Added 006: 手机端密码含特殊字符时登录失败 (High)
Introduced in: v1.2.0
```

## Related Commands

- `/resolve-next-issue` - Fix the highest priority issue
- `/list-issues` - View all issues
- `/archive-issues` - Archive resolved issues

## Related Skills

This command works with the `known-issues-tracker` skill located at:
`skills/known-issues-tracker/SKILL.md`
