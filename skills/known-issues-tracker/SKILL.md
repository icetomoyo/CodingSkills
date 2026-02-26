---
name: known-issues-tracker
description: Track issues with KNOWN_ISSUES.md. Auto-activates on "bug/issue/error/问题/报错/错误" keywords. Use /add-issue, /resolve-next-issue.
---

# Known Issues Tracker

This skill provides a standardized way to track, prioritize, and resolve known issues in any project using a KNOWN_ISSUES.md file.

## Automatic Activation Triggers

This skill should be automatically activated when the user message contains:

**Keywords:**
- bug, issue, problem, error, crash, failure, 问题, 报错, 错误, 崩溃, 故障
- doesn't work, broken, not working, failing, 不工作, 坏了, 失败
- there is a, we have a, I found a, 有个, 发现一个
- need to fix, should fix, have to fix, 需要修复, 修复
- workaround, temporary fix, hack, 临时方案, 绕过
- technical debt, TODO, FIXME, 技术债

**Example User Messages:**
- "There is a bug in the login flow"
- "I found an issue with the API"
- "The button doesn't work on mobile"
- "We have a problem with memory leaks"
- "Need to fix the database connection error"

**When NOT to Activate:**
- User is asking general questions
- User is requesting new features (not bugs)
- User is asking for code explanation
- User uses "issue" in a different context (e.g., "git issue" meaning GitHub issue)

## KNOWN_ISSUES.md File Structure

The file is divided into THREE sections:

1. **Issue Index** - Quick reference table for all issues
2. **Issue Details** - Full details for each issue (REQUIRED for all issues)
3. **Summary** - Total counts and highest priority open issue

> **格式示例请参考**: [examples/sample.md](examples/sample.md)

## Priority Levels

| Priority | Description | Action |
|----------|-------------|--------|
| **High** | Critical bugs, breaking issues, security vulnerabilities | Resolve immediately |
| **Medium** | Functional issues, performance problems, workarounds exist | Resolve within session if possible |
| **Low** | Minor issues, cosmetic problems, technical debt | Schedule for future work |

## Version Tracking

Version is **automatically detected** from project configuration files:

**Detection Priority**:
1. `package.json` → `version` field
2. `VERSION` file (single line, semver format)
3. `pyproject.toml` → `project.version`
4. `Cargo.toml` → `package.version`
5. Git tag (`git describe --tags --abbrev=0`)
6. Fallback: `unknown`

## Listing Issues

当用户请求列出/查看 issues 时（如 "列出所有 issues"、"有哪些 open 的 issue"），自动执行此功能。

### 过滤选项

| 选项 | 说明 |
|------|------|
| --open, -o | 只显示 Open 状态（默认） |
| --resolved, -r | 只显示 Resolved 状态 |
| --all, -a | 显示所有 issues |
| --high | 过滤 High 优先级 |
| --medium | 过滤 Medium 优先级 |
| --low | 过滤 Low 优先级 |
| --stats | 只显示统计摘要 |

### 输出格式

```markdown
=== KNOWN ISSUES ===
Last Updated: 2024-01-20 15:30

--- OPEN ISSUES (5) ---

[HIGH] 001: API returns 500 on /users endpoint
  Introduced: v1.2.0
  Created: 2024-01-15
  Description: GET /api/users fails with 500 when query param filter contains special characters

[MEDIUM] 002: Search results slow on large datasets
  Introduced: v1.0.0
  Created: 2024-01-16
  Description: Search takes 5+ seconds when filtering 100k+ records

--- RESOLVED ISSUES (2) ---

[MEDIUM] 006: Mobile login button unresponsive (RESOLVED 2024-01-20)
  Introduced: v1.1.0 → Fixed: v1.3.0
  Resolution: Added touch-action CSS property

=== SUMMARY ===
Total: 7 | Open: 5 | Resolved: 2
High: 2 | Medium: 2 | Low: 1
Next to resolve: 001 (High priority, oldest)
```

### 执行步骤

1. 使用 Glob 查找 `**/KNOWN_ISSUES.md`
2. 读取并解析文件
3. 根据用户请求应用过滤
4. 按状态（Open 优先）→ 优先级 → 创建日期排序
5. 格式化输出

---

## Core Actions

### 1. Find or Create KNOWN_ISSUES.md

**CRITICAL**: Before any operation, locate or create the file:

1. **Scan for existing file**: Use Glob to find `**/KNOWN_ISSUES.md`
2. **If found**: Use existing location, proceed with operation
3. **If not found**: Ask user for location preference:
   - `docs/KNOWN_ISSUES.md` (recommended)
   - `.claude/KNOWN_ISSUES.md` (private)
4. **Create directory if needed**, then initialize with empty template

### 2. Add Issue

**Input**: Problem description / actual phenomenon (from text or file)

**Claude automatically generates**:
1. **Title**: Concise summary
2. **Detailed description**: Current behavior, expected behavior, reproduction steps
3. **Context**: Affected components, scenarios, environments
4. **Priority**: Based on severity analysis
5. **Introduced version**: Auto-detected from project

**Process**:
1. Detect current version for Introduced field
2. Generate next sequential ID (001, 002, etc.)
3. Add to BOTH Issue Index table AND Issue Details section
4. Update timestamp and summary

### 3. Resolve Issue (`/resolve-next-issue`)

**Selection Logic**:
- With ID: Find and validate issue is "Open"
- Without ID: Auto-select highest priority Open issue (by Priority → Created date → ID)

**Implementation Guidelines (CRITICAL)**:

**Before Any Modification**:
1. Read ALL related code thoroughly
2. Understand the exact root cause
3. Identify ALL files that need changes
4. Check for existing tests
5. Plan the MINIMAL fix needed

**For Each File - Document**:
- Changes summary, Reason, Expected outcome, Risks, Affected components, Tests to run

**Mandatory Checklist Per File**:
- [ ] Expected outcome is clearly defined
- [ ] No existing functionality will break
- [ ] All callers/dependents are considered
- [ ] Edge cases are handled
- [ ] This is the MINIMAL change needed
- [ ] Error handling is preserved

**FORBIDDEN Actions**:
- Change unrelated code "while you're at it"
- Refactor code not directly related to the fix
- Add features beyond the issue scope
- Modify tests to make them pass (fix the code!)

**After Resolution**:
1. Detect current version for Fixed field
2. Update BOTH sections in KNOWN_ISSUES.md
3. **PRESERVE** Original Problem description
4. **ADD** Resolution section with details

### 4. Archive Issues

When KNOWN_ISSUES.md exceeds thresholds:
- **Warning**: > 2000 lines or > 50KB → Notify user
- **Critical**: > 5000 lines or > 100KB → Auto-archive resolved issues > 30 days old

Archive to `ISSUES_ARCHIVED.md`, grouped by month.

**Important**:
- Never auto-archive OPEN issues
- Always keep recent resolutions (last 30 days)
- Preserve all details in archive

## CRITICAL: Issue Details Maintenance

**Every issue MUST have a corresponding entry in the "Issue Details" section.**

### For OPEN Issues (Unresolved)

Required fields:
- Priority, Status, Introduced, Created
- **Original Problem** (REQUIRED): Current behavior, expected behavior, reproduction steps
- Context, Root Cause (if known), Proposed Solution (optional)

### For RESOLVED Issues

**MUST preserve** the original problem AND add:
- Fixed version (auto-detected)
- Resolution (detailed explanation of the fix)
- Resolution Date
- Files Changed
- Tests Added

## Error Handling

- If KNOWN_ISSUES.md does not exist, create it
- If the file is corrupted, attempt to recover and fix the format
- If an ID conflict occurs, increment to the next available ID
- If both sections are empty, show helpful message

## Integration with Other Skills

- Works with /plan for planning issue resolution
- Works with /tdd for test-driven bug fixes
- Works with /code-review for reviewing fixes
- Works with /security-scan for security-related issues

## Commands Summary

| Command | Purpose |
|---------|---------|
| `/add-issue "problem description"` | Add a new issue (Claude generates title, details, context) |
| `/add-issue -f [file]` | Add issue from file content |
| `/resolve-next-issue [id]` | Resolve issue (omit ID for auto-select highest priority) |
| `/archive-issues` | Archive resolved issues to reduce file size |

> **Note**: 列出 issues 的功能已整合到此 skill 中。直接说 "列出所有 issues" 或调用 `/known-issues-tracker` 即可。
