# CodingSkills

借鉴 [mattpocock/skills](https://github.com/mattpocock/skills) 的两层架构 + 人驱动构建链 + tracker 文件持久化。

**当前版本：v0.5.0**

## 设计理念

- **调用二分**(对齐 mattpocock):model-invoked(原语,自然语言触发,可被 user-invoked 调)/ user-invoked(人敲 `/name`,不被自然语言触发)。
- **人驱动主链**:构建链 `/to-spec` → `/to-tickets` → `/implement` 人逐个敲,每步产出流入设计块。
- **tracker 持久化**:FEATURE_LIST.md / KNOWN_ISSUES.md / CHANGELOG.md 管理生命周期,构建链产出流入设计块。
- **方法论驱动**:所有 skill 按 `writing-great-skills` 编写与审计——可预测性根原则、完成判据、锚词、no-op/negation 审计、反蔓生。

## 致谢

本仓库的 `implement`、`diagnosing-bugs`、`domain-modeling` skill 改编自 [mattpocock/skills](https://github.com/mattpocock/skills)(MIT License)。感谢 Matt Pocock 的工程纪律启发。

## Skill 清单(16 个)

### Model-invoked(7 个,自然语言触发)

| skill | 用途 |
|------|------|
| grilling | 质询原语(一次一问,附推荐答案,决策才问人) |
| tdd | 测试先行原语(pre-agreed seams,red-green,重构不在循环内) |
| code-review | 双轴代码评审(Standards + Spec) |
| diagnosing-bugs | 诊断原语(反馈循环→复现→假设→探针→修→清理) |
| domain-modeling | 领域建模原语(挑战术语,写 CONTEXT.md / ADR) |
| feature-manager | 管 FEATURE_LIST.md + 设计块生命周期(Add → 指向链 → Complete) |
| issue-manager | 管 KNOWN_ISSUES.md + 修复流程(Add → 指向链 → Archive) |

### User-invoked(9 个,人敲 `/name`)

| skill | 用途 |
|------|------|
| to-spec | 综合 spec → 写入设计块 Part B |
| to-tickets | 拆 tracer-bullet 垂直切片票 → 写入设计块实现步骤 |
| implement | 构建(调 tdd + code-review + 提交) |
| smart-release | 管 CHANGELOG.md + 版本发布 |
| human-test-guide | 人工测试指导生成 |
| grill-me | ad-hoc 质询入口(薄委托 grilling) |
| handoff | 会话交接(替代上下文压缩的轻量方案) |
| router | skill 导航(不知道用哪个时问它) |
| writing-great-skills | 写 / 审计 skill 的方法论(含 GLOSSARY.md) |

## 链路

```
FEATURE: feature-manager(add) → 建设计块
  → /to-spec → /to-tickets → /implement(tdd + code-review) → 提交
  → /human-test-guide(可选) → feature-manager(complete) → /smart-release

ISSUE:   issue-manager(add) → /diagnosing-bugs(hard bug) → /implement → issue-manager(resolve)

META:    router(导航) · grill-me(质询) · handoff(交接) · writing-great-skills(审计)
```

## 项目结构

```
CodingSkills/
├── skills/              # 16 个 skill(每个一个目录,含 SKILL.md)
│   ├── grilling/              # model 原语
│   ├── tdd/                   # model 原语
│   ├── code-review/           # model 原语
│   ├── diagnosing-bugs/       # model 原语
│   ├── domain-modeling/       # model 原语(含 CONTEXT-FORMAT.md, ADR-FORMAT.md)
│   ├── to-spec/               # user
│   ├── to-tickets/            # user
│   ├── implement/             # user
│   ├── feature-manager/       # model(含 DESIGN-BLOCK-FORMAT.md, REFERENCE.md)
│   ├── issue-manager/         # model(含 REFERENCE.md)
│   ├── smart-release/         # user
│   ├── human-test-guide/      # user(含 REFERENCE.md)
│   ├── grill-me/              # user
│   ├── handoff/               # user
│   ├── router/                # user
│   └── writing-great-skills/  # user(含 GLOSSARY.md)
├── agents/              # 自定义 Agents（预留）
├── rules/               # 自定义 Rules（预留）
└── .claude/             # Claude Code 配置
```

## 使用 skill 后生成的文件结构

```
docs/
├── CHANGELOG.md            # 变更日志(smart-release)
├── FEATURE_LIST.md         # Feature 索引和状态(feature-manager)
├── features/               # Feature 设计文档(按版本,Part A 版本叙事 + Part B per-feature 设计块)
│   ├── v1.0.0.md
│   └── unplanned.md
├── test-guides/            # 测试指导文档(human-test-guide)
├── KNOWN_ISSUES.md         # Issue 索引(issue-manager)
└── ISSUES_ARCHIVED.md      # 归档的 issues
CONTEXT.md                  # 领域词汇表(domain-modeling)
docs/adr/                   # 架构决策记录(domain-modeling)
.agent/handoff/HANDOFF.md   # 会话交接文档(handoff)
```

## 安装使用

### 方式一:复制到用户目录
```bash
cp -r skills/* ~/.claude/skills/
```

### 方式二:在项目中使用
直接在项目根目录保持此结构,Claude Code 会自动识别。

## 开发计划

- [x] 两层架构对齐 mattpocock(model-invoked 原语 / user-invoked 其他)
- [x] 人驱动构建链(to-spec → to-tickets → implement → code-review)
- [x] tracker 文件架构保留(FEATURE_LIST.md / KNOWN_ISSUES.md / 设计块 / CHANGELOG.md)
- [x] 新增 implement / diagnosing-bugs / domain-modeling(改编自 mattpocock,致谢)
- [x] 改名 feature-manager / issue-manager / smart-release
- [x] to-spec / to-tickets / human-test-guide / smart-release 改为 user-invoked
- [x] commands/ 移除,操作并入 skill
- [ ] 持续按 writing-great-skills 方法论审计
- [ ] 添加自定义 agents
- [ ] 添加项目特定的 rules

## License

MIT
