# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [0.2.10] - 2026-03-15

### Documentation
- **Skills**: 为所有技能添加 `argument-hint` 字段符合官方规范
  - smart-changelog: `"[--release] [patch|minor|major|vX.Y.Z]"`
  - known-issues-tracker: `"[description] | [id]"`
  - smart-context: `"[keyword] | --snapshot | --load"`
  - human-test-guide: `"[feature-name] | [-f file]"`
  - feature-list-tracker: `"[description] | [id] | [-v version]"`

### Refactoring
- **smart-changelog**: 重构发布流程支持模块化操作
  - 支持自然语言和斜杠命令双重触发方式
  - 添加 Tag 相关触发词
  - Monorepo 检测和版本策略选择
  - 版本号确认机制
  - 文档更新检测

---

## [0.2.9] - 2026-03-15

### Features
- **smart-changelog**: 智能 changelog 管理技能
  - 从 git 历史增量同步到 CHANGELOG.md
  - 支持语义化版本发布 (patch/minor/major)
  - 自动同步版本号、打 Tag、推送

---

## [0.2.8] - 2026-03-14

### Bug Fixes
- **Commands**: 修复 `start-next-feature.md` 的 YAML frontmatter 语法错误
  - 为 `description` 字段添加双引号包裹
  - 避免文本中的冒号 (`: `) 被 YAML 解析器误认为 key-value 分隔符
  - 修复前：`description: ... Runs complete workflow: Plan → ...`
  - 修复后：`description: "... Runs complete workflow: Plan → ..."`

---

## [0.2.7] - 2026-03-14

### Documentation
- **Commands**: 清理过时的命令引用
  - 移除 7 个 command 文件中对已废弃命令 `/list-features` 和 `/list-issues` 的引用
  - 添加 Note 说明列出功能已整合到对应 skill 中
  - 修改的文件：
    - `commands/add-feature.md`
    - `commands/complete-feature.md`
    - `commands/archive-features.md`
    - `commands/start-next-feature.md`
    - `commands/add-issue.md`
    - `commands/archive-issues.md`
    - `commands/resolve-next-issue.md`

---

## [0.2.6] - 2026-03-14

### Features
- **Testing**: 标准化测试指南文件命名规范
  - 测试指南文件名格式统一为 `FEATURE_{ID}_{VERSION}_TEST_GUIDE.md`

---

## [0.2.5] - 2026-03-13

### Performance
- **smart-context**: 添加英文支持和中文关键词
  - skill description 添加英文关键词
  - 支持中英文触发条件

### Documentation
- **Skills**: 精简 skill description 并添加中文关键词支持
  - known-issues-tracker: 添加 "问题/报错/错误" 等中文关键词
  - feature-list-tracker: 添加 "功能/特性" 等中文关键词
  - human-test-guide: 添加 "测试指导/测试用例" 等中文关键词
  - smart-context: 添加 "压缩/上下文/快照" 等中文关键词

- **README**: 更新文档，反映命令合并和路径变更
  - 移除 `/list-features` 和 `/list-issues` 命令说明
  - 添加 skill 整合说明
  - 更新上下文快照路径为 `docs/context`

### Refactoring
- **Context**: 将上下文快照路径从 `.claude/context` 改为 `docs/context`
  - 统一文档结构，所有生成的文档都在 `docs/` 目录下

---

## [0.2.4] - 2026-03-12

### Chores
- 移除 hooks 文件夹
- 移除 Git 追踪中的 `.claude` 目录

---

## [0.2.3] - 2026-03-12

### Refactoring
- **smart-context**: 改为完全手动流程
  - 移除自动触发条件
  - 移除自动归档功能
  - 保留 `/context-snapshot` 和 `/load-context` 手动命令

---

## [0.1.2] - 2026-03-11

### Refactoring
- **Commands**: 合并查询类 command 到对应 skill
  - `/list-features` 功能整合到 `feature-list-tracker` skill
  - `/list-issues` 功能整合到 `known-issues-tracker` skill
  - 用户可以直接对话或调用 skill 来列出 features/issues

---

## [0.1.1] - 2026-03-11

### Refactoring
- **Skills**: 重构 skill 目录结构符合官方规范
  - 将 skill 定义文件从 `skill.md` 重命名为 `SKILL.md`
  - 确保所有 skill 文件名符合 Claude Code 官方规范

---

## [0.2.2] - 2026-03-11

### Features
- **smart-context**: 智能上下文管理技能
  - 双轨制记忆：热轨（< 6k Token）+ 冷轨（无限）
  - 三步清洗法：无损提取 → 有损修剪 → 生成快照
  - 完全手动流程：`/context-snapshot` + `/load-context`
  - 避坑墓碑：记录失败尝试

---

## [0.2.1] - 2026-03-10

### Features
- **human-test-guide**: 人工测试指导生成技能
  - 自动生成包含测试用例和预期效果的测试文档
  - 支持 7 种测试类型
  - 与 `feature-list-tracker` 集成

---

## [0.2.0] - 2026-03-09

### Features
- **feature-list-tracker**: Feature 功能管理技能
  - 自动维护 `FEATURE_LIST.md` 和 `docs/features/` 设计文档
  - 版本规划与管理
  - 自动化开发流程：Plan → TDD → 测试 → 生成测试指导
  - `/add-feature`, `/start-next-feature`, `/complete-feature` 命令

---

## [0.1.0] - 2026-03-08

### Features
- **known-issues-tracker**: Issue 追踪管理技能
  - 自动维护 `KNOWN_ISSUES.md` 文件
  - 版本自动追踪（Introduced/Fixed）
  - `/add-issue`, `/resolve-next-issue`, `/archive-issues` 命令

### Documentation
- 添加 README.md 说明项目结构和使用方法
- 添加 skills 和 commands 的详细文档

---

[Unreleased]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.10...HEAD
[0.2.10]: https://github.com/icetomuyo/CodingSkills/compare/v0.2.9...v0.2.10
[0.2.9]: https://github.com/icetomuyo/CodingSkills/compare/v0.2.8...v0.2.9
[0.2.8]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.7...v0.2.8
[0.2.7]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/icetomoyo/CodingSkills/compare/v0.1.2...v0.2.3
[0.1.2]: https://github.com/icetomoyo/CodingSkills/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.2...v0.1.1
[0.2.2]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/icetomoyo/CodingSkills/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/icetomoyo/CodingSkills/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/icetomoyo/CodingSkills/releases/tag/v0.1.0
