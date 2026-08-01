---
name: issue-manager
description: 管理 issue 全生命周期。当用户想记录/修复 bug,或说"有个 bug/报错/issue/记录问题"时使用。
argument-hint: "[add|resolve|archive|list] [description|id]"
---

# Issue Manager(issue 管理)

用 KNOWN_ISSUES.md 追踪、排序、流转并管理项目中的已知问题。

> 请求新功能(非 bug)→ 转 `feature-manager`;问一般问题或解释代码 → 不激活。

## Issue Status

状态在优先级之外独立流转,标记一个 issue 距离可修复有多远:

| Status | 含义 | 流转到 |
|--------|------|--------|
| **Open** | 新建,尚未判定信息是否齐全 | → needs-info / ready |
| **needs-info** | 缺复现步骤 / 环境 / 期望行为等 | → ready(补全后) |
| **ready** | 信息齐全,可委派修复 | → Resolved(修复后) |
| **Resolved** | 已修复,记录 Fixed 版本与解决方案 | (终态) |

**流转规则:**
- 新建默认 `Open`;录入时若缺关键信息,立即标 `needs-info` 并注明缺什么
- `needs-info` 补全后转 `ready`
- 只有 `ready` 进入 resolve;遇 `Open`/`needs-info` 先补全转 `ready`
- resolve 完成转 `Resolved`

## Core Actions

### 1. Find or Create KNOWN_ISSUES.md

任何操作前先定位或创建文件:

1. 用 Glob 查找 `**/KNOWN_ISSUES.md`
2. 找到 → 用现有位置;未找到 → 询问用户偏好(`docs/`(推荐)或 `.claude/`(private))
3. 按需创建目录,初始化空模板;文件损坏则尝试恢复

**完成判据**: KNOWN_ISSUES.md 存在且含三段结构骨架(Issue Index / Issue Details / Summary),或已确认沿用现有文件位置。

> 文件结构、Priority Levels 见 `REFERENCE.md`。版本检测优先级见 `smart-release` 的 Version Detection Priority(单一源)。

### 2. Add Issue

**输入**: 问题描述 / 实际现象(来自文本或文件)

**生成**: Title(简明摘要)、Detailed description(当前行为/期望行为/复现步骤)、Context、Priority(基于严重度)、Status(默认 Open;缺关键信息标 needs-info)、Introduced version(自动检测)

**流程**:
1. 检测当前版本填入 Introduced
2. 生成下一个顺序 ID(001, 002, …);遇冲突递增
3. 同时写入 Issue Index 表与 Issue Details 段
4. 更新时间戳与 summary

**完成判据**: 新 issue 同时出现在 Issue Index 与 Issue Details;Status 已按信息完整度设为 `Open` 或 `needs-info`;Introduced 版本已填;summary 计数已更新。

> Priority Levels 与 Issue Details 字段要求见 `REFERENCE.md`。

### 3. Resolve Issue

**Selection Logic**:
- 指定 ID: 找到该 issue,确认状态为 `ready`;若为 `Open`/`needs-info`,先补全转 `ready` 再修复
- 未指定 ID: 自动选最高优先级 `ready` issue(Priority → Created date → ID)

**Point to Fix Chain**:

resolve 选定 issue 后,本 skill 的工作暂停。告诉用户按修复链敲,完成后运行 `/issue-manager` 更新 KNOWN_ISSUES.md(转 Resolved)。

**修复后更新 KNOWN_ISSUES.md**:
1. 检测当前版本填入 Fixed
2. 同时更新 Issue Index 与 Issue Details
3. **保留** Original Problem 描述
4. **新增** Resolution 段(含修复说明、Files Changed、Tests Added、Resolution Date)
5. 状态转 `Resolved`

**完成判据**: issue 状态已转 `Resolved`;Fixed 版本已填;Original Problem 保留、Resolution 段已写;Issue Index 与 Issue Details 两处均已更新。

### 4. Archive Issues

KNOWN_ISSUES.md 超过阈值时归档(阈值与规则见 `REFERENCE.md`)。归档到 `ISSUES_ARCHIVED.md`,按月分组。

**完成判据**: 归档后 KNOWN_ISSUES.md 行数/体积降至阈值以下;被归档 issue 在 ISSUES_ARCHIVED.md 中按月分组且详情完整;当前文件中无超过 30 天的 Resolved issue 遗留。

## 修复链（人驱动）

本 skill **不自动跑修复链**。Resolve 选定 issue 后,人敲:

- **hard bug**: `diagnosing-bugs` → 定位根因 → `/implement` → 修复+提交
- **simple bug**: `/implement` → 修复+提交

`/implement` 内部调 tdd(测试先行)+ code-review(双轴评审)。

修复完成后 `/issue-manager` 更新 KNOWN_ISSUES.md(转 Resolved),可选 `/human-test-guide` 生成回归测试指导。

## Operations

通过 `/issue-manager` 触发以下操作:

| 操作 | 示例 |
|------|------|
| **add** | "记录这个 bug" / "有个 issue…" |
| **resolve** | "修一下这个 issue" / "resolve 001" |
| **archive** | "归档旧 issue" |
| **list** | "列出所有 issues" / "有哪些 open 的" |

> 列出功能的输出格式与过滤选项见 `REFERENCE.md`。
