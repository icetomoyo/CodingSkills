# CodingSkills

Claude Code 自定义 Skills、Commands、Agents 和 Rules 仓库。

## 项目结构

```
CodingSkills/
├── skills/              # 自定义技能
│   └── known-issues-tracker/  # Issue 追踪管理
├── commands/            # 自定义命令
│   ├── add-issue.md          # 添加 issue
│   ├── list-issues.md        # 列出 issues
│   ├── resolve-next-issue.md # 自动修复最高优先级 issue
│   └── archive-issues.md     # 归档已解决的 issues
├── agents/              # 自定义 Agents（预留）
├── rules/               # 自定义 Rules（预留）
└── .claude/             # Claude Code 配置
```

## 已有 Skills

### known-issues-tracker

项目中 Issue 的追踪和管理技能。

**功能：**
- 自动维护 `KNOWN_ISSUES.md` 文件
- 统一的 Issue 格式（通过 `/add-issue` 命令添加）
- High/Medium/Low 三级优先级
- **版本自动追踪**：自动检测并记录 Introduced/Fixed 版本
- 自动检测并解决最高优先级 issue
- **Issue 详情保留**：完整记录原问题和解决方案
- **文件大小管理**：自动检测文件大小，支持归档

**自动触发条件：**
- 用户提到 bug, issue, problem, error, crash, failure 等关键词
- 用户说 "doesn't work", "broken", "not working" 等

**Commands：**

| 命令 | 说明 |
|------|------|
| `/add-issue "问题描述"` | 添加新 issue（Claude 自动生成标题和详情） |
| `/add-issue -f [filepath]` | 从文件读取问题并添加为 issue |
| `/list-issues [--open/--resolved/--all]` | 查看 issues |
| `/resolve-next-issue` | 自动修复最高优先级 issue |
| `/archive-issues [--days N]` | 归档已解决的 issues |

**KNOWN_ISSUES.md 文件结构：**
```
## Issue Index        # 快速索引表（含版本信息）
## Issue Details      # 完整详情（包含原问题和解决方案）
## Summary            # 统计摘要
```

**版本追踪：**
- **Introduced**：Issue 添加时自动检测当前版本
- **Fixed**：Issue 修复时自动检测当前版本
- 支持从 package.json、VERSION、pyproject.toml、Cargo.toml、Git tag 自动检测
- 无需用户手动填写版本信息

**文件位置：**
1. 自动扫描项目查找现有文件
2. 未找到时询问用户：`docs/KNOWN_ISSUES.md` 或 `.claude/KNOWN_ISSUES.md`

## 已有 Commands

| 命令 | 说明 |
|------|------|
| `/add-issue` | 精准添加 issue 到 KNOWN_ISSUES.md |
| `/list-issues` | 列出所有 issues，支持过滤 |
| `/resolve-next-issue` | 自动查找并修复最高优先级 issue |
| `/archive-issues` | 归档已解决的 issues 到 ISSUES_ARCHIVED.md |

## 安装使用

### 方式一：复制到用户目录

```bash
# 复制 skills
cp -r skills/* ~/.claude/skills/

# 复制 commands
cp -r commands/* ~/.claude/commands/
```

### 方式二：在项目中使用

直接在项目根目录保持此结构，Claude Code 会自动识别。

## 修复 Issue 的谨慎性要求

在使用 `/resolve-next-issue` 时，Claude Code 会遵循严格的谨慎性要求：

**每个文件修改前需要填写：**
```markdown
## File: [path/to/file.ts]

- **Changes summary**: [这个文件会改什么]
- **Reason**: [为什么需要改这个文件]
- **Expected outcome**: [预期达到什么效果]
- **Risk assessment**: [潜在风险]
- **Affected components**: [依赖此文件的其他模块]
- **Tests to run**: [需要运行的测试]
```

**禁止操作：**
- 禁止"顺手"修改无关代码
- 禁止重构与修复无关的代码
- 禁止添加超出 issue 范围的功能
- 禁止修改测试让它通过（应该修代码）

## 文件大小管理

KNOWN_ISSUES.md 会随着时间变大，影响 LLM 上下文效率：

**自动检测：**
- 文件 > 2000 行或 > 50KB：提示用户归档
- 文件 > 5000 行或 > 100KB：强烈建议归档

**归档策略：**
- 使用 `/archive-issues` 归档已解决的 issues
- 归档文件：`ISSUES_ARCHIVED.md`（与 KNOWN_ISSUES.md 同目录）
- 默认保留最近 30 天内解决的 issues

## 开发计划

- [x] 版本追踪功能（Introduced/Fixed 自动检测）
- [ ] 添加更多实用 skills
- [ ] 添加自定义 agents
- [ ] 添加项目特定的 rules
- [ ] 考虑为 issue 追踪添加专门的 agent（可选）

## License

MIT
