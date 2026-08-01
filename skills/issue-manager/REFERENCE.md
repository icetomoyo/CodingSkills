# Issue Manager — 参考文档

本文件是 `issue-manager` skill 的披露参考,存放文件结构、优先级、列表格式、字段要求、归档规则等详细参考。SKILL.md 只保留流程与完成判据。

## KNOWN_ISSUES.md 文件结构

文件分三段:

1. **Issue Index** - 所有 issue 的速查表
2. **Issue Details** - 每个 issue 的完整详情(所有 issue 必填)
3. **Summary** - 总数与最高优先级 open issue

## Priority Levels

| Priority | Description | Action |
|----------|-------------|--------|
| **High** | Critical bugs, breaking issues, security vulnerabilities | Resolve immediately |
| **Medium** | Functional issues, performance problems, workarounds exist | Resolve within session if possible |
| **Low** | Minor issues, cosmetic problems, technical debt | Schedule for future work |

## 列出 Issues

当用户请求列出/查看 issues 时(如 "列出所有 issues"、"有哪些 open 的 issue"),自动执行。

### 过滤选项

| 选项 | 说明 |
|------|------|
| --open, -o | 只显示未 Resolved(Open / needs-info / ready,默认) |
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

[HIGH] 001: API returns 500 on /users endpoint  [ready]
  Introduced: v1.2.0
  Created: 2024-01-15
  Description: GET /api/users fails with 500 when query param filter contains special characters

[MEDIUM] 002: Search results slow on large datasets  [needs-info: missing repro steps]
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
Next to resolve: 001 (High priority, ready)
```

### 执行步骤

1. 使用 Glob 查找 `**/KNOWN_ISSUES.md`
2. 读取并解析文件
3. 根据用户请求应用过滤
4. 按状态(未 Resolved 优先)→ 优先级 → 创建日期排序
5. 格式化输出

## Issue Details 字段要求

**每个 issue 都必须在 "Issue Details" 段有对应条目。**

### 未 Resolved 的 issue(Open / needs-info / ready)

必填字段:
- Priority, Status, Introduced, Created
- **Original Problem**(必填): 当前行为、期望行为、复现步骤
- Context, Root Cause(if known), Proposed Solution(optional)
- `needs-info` 的 issue 须注明缺什么信息

### Resolved issue

**保留** original problem 并**新增**:
- Fixed version(自动检测)
- Resolution(修复的详细说明)
- Resolution Date
- Files Changed
- Tests Added

## 归档规则

KNOWN_ISSUES.md 超过阈值时归档:
- **警告**: > 2000 lines or > 50KB → 通知用户
- **强制**: > 5000 lines or > 100KB → 自动归档超过 30 天的 Resolved issue

归档到 `ISSUES_ARCHIVED.md`,按月分组,保留全部详情。只归档 `Resolved` 且超过 30 天的 issue;`Open`/`needs-info`/`ready` 一律保留。
