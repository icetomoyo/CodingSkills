---
name: issue-manager
description: 管理 issue 全生命周期:登记到 KNOWN_ISSUES.md、分类流转、指向修复链、归档收尾。
disable-model-invocation: true
argument-hint: "[add|resolve|archive|list] [description|id]"
---

# Issue Manager(issue 管理)

用 KNOWN_ISSUES.md 追踪、排序、流转并管理项目中的已知问题。

> 请求新功能(非 bug)→ 转 `feature-manager`;问一般问题或解释代码 → 不激活。

## KNOWN_ISSUES.md File Structure

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

## Issue Status

状态在优先级之外独立流转,标记一个 issue 距离可修复有多远:

| Status | 含义 | 流转到 |
|--------|------|--------|
| **Open** | 新建,尚未判定信息是否齐全 | → needs-info / ready |
| **needs-info** | 缺复现步骤 / 环境 / 期望行为等,待补全后才能委派修复 | → ready(补全后) |
| **ready** | 信息齐全,可委派修复 | → Resolved(修复后) |
| **Resolved** | 已修复,记录 Fixed 版本与解决方案 | (终态) |

**流转规则:**
- 新建 issue 默认 `Open`;录入时若发现缺关键信息,立即标 `needs-info` 并注明缺什么。
- `needs-info` 补全所缺信息后转 `ready`。
- 只有 `ready` 的 issue 进入 resolve 操作;遇 `Open`/`needs-info` 先补全转 `ready`。
- resolve 完成转 `Resolved`。

## Version Tracking

版本从项目配置文件自动检测,检测优先级与实现见 `smart-release` 的 **Version Detection Priority**(单一源)。本 skill 只在 add 时填 Introduced、resolve 时填 Fixed,不重复维护检测逻辑。

## Listing Issues

当用户请求列出/查看 issues 时（如 "列出所有 issues"、"有哪些 open 的 issue"），自动执行此功能。

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

---

## Core Actions

### 1. Find or Create KNOWN_ISSUES.md

任何操作前先定位或创建文件:

1. **扫描现有文件**: 用 Glob 查找 `**/KNOWN_ISSUES.md`
2. **找到**: 用现有位置,继续操作
3. **未找到**: 询问用户位置偏好:
   - `docs/KNOWN_ISSUES.md`(推荐)
   - `.claude/KNOWN_ISSUES.md`(private）
4. **按需创建目录**,然后初始化空模板
5. **文件损坏**: 尝试恢复并修格式

**完成判据**: KNOWN_ISSUES.md 存在且含三段结构骨架(Issue Index / Issue Details / Summary),或已确认沿用现有文件位置。

### 2. Add Issue

**输入**: 问题描述 / 实际现象(来自文本或文件)

**生成**:
1. **Title**: 简明摘要
2. **Detailed description**: 当前行为、期望行为、复现步骤
3. **Context**: 受影响组件、场景、环境
4. **Priority**: 基于严重度分析
5. **Status**: 默认 `Open`;若描述缺复现步骤 / 期望行为 / 环境,标 `needs-info` 并注明缺什么
6. **Introduced version**: 从项目自动检测

**流程**:
1. 检测当前版本填入 Introduced
2. 生成下一个顺序 ID(001, 002, …);遇 ID 冲突递增到下一个可用
3. 同时写入 Issue Index 表与 Issue Details 段
4. 更新时间戳与 summary

**完成判据**: 新 issue 同时出现在 Issue Index 与 Issue Details;Status 已按信息完整度设为 `Open` 或 `needs-info`;Introduced 版本已填;summary 计数已更新。

### 3. Resolve Issue

**Selection Logic**:
- 指定 ID: 找到该 issue,确认状态为 `ready`;若为 `Open`/`needs-info`,先补全信息转 `ready` 再修复
- 未指定 ID: 自动选最高优先级 `ready` issue(按 Priority → Created date → ID)

**Point to Fix Chain**:

resolve 选定 issue 后,本 skill 的工作暂停。告诉用户按「修复链（人驱动）」节敲修复链,完成后运行 `/issue-manager` 更新 KNOWN_ISSUES.md(转 Resolved)。

**修复后更新 KNOWN_ISSUES.md**:
1. 检测当前版本填入 Fixed
2. 同时更新 Issue Index 与 Issue Details
3. **保留** Original Problem 描述
4. **新增** Resolution 段(含修复说明、Files Changed、Tests Added、Resolution Date)
5. 状态转 `Resolved`

**完成判据**: issue 状态已转 `Resolved`;Fixed 版本已填;Original Problem 保留、Resolution 段已写;Issue Index 与 Issue Details 两处均已更新。

### 4. Archive Issues

KNOWN_ISSUES.md 超过阈值时归档:
- **警告**: > 2000 lines or > 50KB → 通知用户
- **强制**: > 5000 lines or > 100KB → 自动归档超过 30 天的 Resolved issue

归档到 `ISSUES_ARCHIVED.md`,按月分组。

**归档规则**:
- 只归档 `Resolved` 且超过 30 天的 issue;`Open`/`needs-info`/`ready` 一律保留。
- 保留最近 30 天内的 Resolved issue。
- 归档保留全部详情。

**完成判据**: 归档后 KNOWN_ISSUES.md 行数/体积降至阈值以下;被归档 issue 在 ISSUES_ARCHIVED.md 中按月分组且详情完整;当前文件中无超过 30 天的 Resolved issue 遗留。

## 修复链（人驱动）

本 skill **不自动跑修复链**。Resolve 选定 issue 后,人敲:

- **hard bug**: `diagnosing-bugs` → 定位根因 → `/implement` → 修复+提交
- **simple bug**: `/implement` → 修复+提交

`/implement` 内部调 tdd(测试先行)+ code-review(双轴评审)。

修复完成后 `/issue-manager` 更新 KNOWN_ISSUES.md(转 Resolved),可选 `/human-test-guide` 生成回归测试指导。

## CRITICAL: Issue Details Maintenance

**每个 issue 都必须在 "Issue Details" 段有对应条目。**

### 未 Resolved 的 issue(Open / needs-info / ready）

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

## Integration with Other Skills

修复链见上「修复链（人驱动）」节。其余关系:

- `tdd` / `code-review`：implement 内部调
- `smart-release`：版本检测的单一源
- `feature-manager`：feature 开发中发现的 bug 转交

## Operations

通过 `/issue-manager` 触发以下操作:

| 操作 | 示例 |
|------|------|
| **add** | "记录这个 bug" / "有个 issue…" |
| **resolve** | "修一下这个 issue" / "resolve 001" |
| **archive** | "归档旧 issue" |
| **list** | "列出所有 issues" / "有哪些 open 的" |
