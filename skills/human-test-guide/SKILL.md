---
name: human-test-guide
description: 为功能实现或 issue 修复生成人工测试指导文档。
disable-model-invocation: true
argument-hint: "[feature-name] | [-f file]"
---

# Human Test Guide(人工测试指导)

为软件功能、issue 修复、功能验证生成人工测试指导文档——含测试用例、步骤、预期效果。

## 何时用

- 新功能实现完成后(生成功能测试指导)
- issue 修复后(生成回归测试指导)
- 为已有功能补充测试文档
- QA 评审或团队 onboarding 准备

> 问自动化测试框架 / 工具(unit / integration test、测试工具选型)→ 不激活,转 `tdd`。

## 生成流程

### 输入
1. **功能描述**——这个功能做什么
2. **实现上下文**(可选)——代码改动、API endpoint、UI 组件
3. **已有自动化测试**(可选)——可提示人工测试重点

### 步骤
1. **分析功能需求**——理解功能目标、识别用户场景、确定测试范围。
2. **设计测试用例**——正向(主流程)、负向(异常处理)、边界(极限情况),按功能类型补充特定测试(类型表见 `REFERENCE.md`)。
3. **编写测试步骤**——每步清晰可执行、预期结果具体可验证、前置条件明确。
4. **生成测试文档**——用标准模板(见 `REFERENCE.md`),输出到 `docs/test-guides/`。

## 完成判据

测试指导生成完毕的标志(全部满足):

- [ ] 7 种测试类型(正向/负向/边界/UI/性能/安全/兼容性,详见 REFERENCE.md)均有用例
- [ ] 文件名符合 `{TYPE}_{ID}_{VERSION}_{SUFFIX}.md`(TYPE=FEATURE|ISSUE,SUFFIX=TEST_GUIDE|REGRESSION_GUIDE)
- [ ] 输出到 `docs/test-guides/` 目录
- [ ] 每个用例含:优先级、类型、前置条件、步骤、预期效果

## 与其他 skill 的关系

- `feature-manager`:构建链完成后人敲本 skill 生成测试指导。
- `issue-manager`:修复后人敲本 skill 生成回归测试指导。
- `tdd`:与自动化测试互补,补充人工验证维度。

> 测试用例模板、7 种测试类型详解、按功能类型的测试重点、文件命名详细规则、Good/Bad 示例与优先级指南,见 `REFERENCE.md`。
