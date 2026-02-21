# CodingSkills

Claude Code 自定义 Skills、Commands、Agents 和 Rules 仓库。

## 项目结构

```
CodingSkills/
├── skills/              # 自定义技能
│   ├── known-issues-tracker/  # Issue 追踪管理
│   └── feature-list-tracker/  # Feature 功能管理
├── commands/            # 自定义命令
│   ├── add-issue.md          # 添加 issue
│   ├── list-issues.md        # 列出 issues
│   ├── resolve-next-issue.md # 自动修复最高优先级 issue
│   ├── archive-issues.md     # 归档已解决的 issues
│   ├── add-feature.md        # 添加 feature
│   ├── list-features.md      # 列出 features
│   ├── start-next-feature.md # 自动开发下一个 feature
│   ├── complete-feature.md   # 完成 feature
│   └── archive-features.md   # 归档已完成的 features
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
| `/resolve-next-issue [id]` | 修复 issue（指定 ID 或自动选择最高优先级） |
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

### feature-list-tracker

项目功能的追踪、规划和自动化开发技能。

**功能：**
- 自动维护 `FEATURE_LIST.md` 文件
- 统一的 Feature 格式（通过 `/add-feature` 命令添加）
- Critical/High/Medium/Low 四级优先级
- Planned/InProgress/Completed 三状态生命周期
- **版本自动追踪**：自动检测并记录 Planned/Released 版本
- **自动化开发流程**：Plan → TDD → 测试 → 生成测试指导
- **人工测试指导**：自动生成包含测试用例和预期效果的测试文档
- **文件大小管理**：自动检测文件大小，支持归档

**自动触发条件：**
- 用户提到 feature, functionality, enhancement 等关键词
- 用户说 "add", "implement", "build" 等动词
- 用户讨论 roadmap, backlog, sprint 等规划内容

**Commands：**

| 命令 | 说明 |
|------|------|
| `/add-feature "功能描述"` | 添加新 feature（LLM 细化描述，建议优先级/版本） |
| `/add-feature -f [filepath]` | 从文件读取功能需求 |
| `/list-features [--planned/--in-progress/--completed]` | 查看 features |
| `/start-next-feature [id]` | **自动化开发流程**：Plan → TDD → 测试 → 生成测试指导（指定 ID 或自动选择） |
| `/complete-feature [id]` | 完成 feature（自动检测版本） |
| `/archive-features [--days N]` | 归档已完成的 features |

**FEATURE_LIST.md 文件结构：**
```
## Feature Index    # 快速索引表（含版本、状态、优先级）
## Feature Details  # 完整详情（包含描述和实现笔记）
## Summary          # 统计摘要
```

**/start-next-feature 自动化流程：**
1. **Phase 1**: 选择最高优先级的 Planned feature
2. **Phase 2**: 自动进入 Plan 模式，生成实现计划
3. **Phase 3**: TDD 开发（RED → GREEN → REFACTOR）
4. **Phase 4**: 运行自动化测试，确保 100% 通过
5. **Phase 5**: 生成人工测试指导文档（`docs/test-guides/FEATURE_XXX_TEST_GUIDE.md`）

**文件位置：**
1. 自动扫描项目查找现有文件
2. 未找到时询问用户：`docs/FEATURE_LIST.md` 或 `.claude/FEATURE_LIST.md`

### human-test-guide

人工测试指导生成技能。

**功能：**
- 生成完整的人工测试指导文档
- 包含测试用例、测试步骤、预期效果
- 支持 7 种测试类型：正向/负向/边界/UI/性能/安全/兼容性
- 针对不同功能类型提供测试重点建议

**自动触发条件：**
- 用户提到"测试指导"、"测试用例"、"人工测试"、"手动测试"
- 用户说"怎么测试"、"帮我写测试"、"如何验证"

**使用场景：**
- 新功能开发完成后
- Bug 修复后生成回归测试
- 为已有功能补充测试文档
- QA 准备和代码审查

**输出格式：**
```markdown
# [功能名称] - 人工测试指导

## 功能概述
## 测试环境
## 测试用例（每个包含：优先级、类型、前置条件、步骤、预期效果）
## 边界用例
## 测试总结
```

**与其他 Skill 的关系：**
- 被 `feature-list-tracker` 的 `/start-next-feature` 命令调用
- 可与 `known-issues-tracker` 配合生成 Bug 回归测试

## 已有 Commands

### Issue 管理

| 命令 | 说明 |
|------|------|
| `/add-issue` | 精准添加 issue 到 KNOWN_ISSUES.md |
| `/list-issues` | 列出所有 issues，支持过滤 |
| `/resolve-next-issue [id]` | 修复 issue（指定 ID 或自动选择最高优先级） |
| `/archive-issues` | 归档已解决的 issues 到 ISSUES_ARCHIVED.md |

### Feature 管理

| 命令 | 说明 |
|------|------|
| `/add-feature` | 添加新 feature（LLM 细化描述和建议） |
| `/list-features` | 列出所有 features，支持状态/优先级过滤 |
| `/start-next-feature [id]` | 自动化开发：Plan → TDD → 测试 → 生成测试指导（指定 ID 或自动选择） |
| `/complete-feature` | 完成 feature，记录版本和实现笔记 |
| `/archive-features` | 归档已完成的 features 到 FEATURES_ARCHIVED.md |

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
- [x] Feature 管理技能（feature-list-tracker）
- [x] 自动化开发流程（/start-next-feature）
- [x] 人工测试指导文档生成
- [ ] 添加更多实用 skills
- [ ] 添加自定义 agents
- [ ] 添加项目特定的 rules

## License

MIT
