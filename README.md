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
│   └── resolve-next-issue.md # 自动修复最高优先级 issue
├── agents/              # 自定义 Agents（预留）
├── rules/               # 自定义 Rules（预留）
└── .claude/             # Claude Code 配置
```

## 已有 Skills

### known-issues-tracker

项目中 Issue 的追踪和管理技能。

**功能：**
- 自动维护 `KNOWN_ISSUES.md` 文件
- 支持 Claude Code 自动追踪和人工手动添加两种方式
- High/Medium/Low 三级优先级
- 自动检测并解决最高优先级 issue

**自动触发条件：**
- 用户提到 bug, issue, problem, error, crash, failure 等关键词
- 用户说 "doesn't work", "broken", "not working" 等

**Commands：**

| 命令 | 说明 |
|------|------|
| `/add-issue [title] -d [desc] -p [priority]` | 添加新 issue |
| `/list-issues [--open/--resolved/--all]` | 查看 issues |
| `/resolve-next-issue` | 自动修复最高优先级 issue |

**KNOWN_ISSUES.md 文件位置：**
1. 自动扫描项目查找现有文件
2. 未找到时询问用户：`docs/KNOWN_ISSUES.md` 或 `.claude/KNOWN_ISSUES.md`

## 已有 Commands

| 命令 | 说明 |
|------|------|
| `/add-issue` | 精准添加 issue 到 KNOWN_ISSUES.md |
| `/list-issues` | 列出所有 issues，支持过滤 |
| `/resolve-next-issue` | 自动查找并修复最高优先级 issue |

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

## 开发计划

- [ ] 添加更多实用 skills
- [ ] 添加自定义 agents
- [ ] 添加项目特定的 rules

## License

MIT
