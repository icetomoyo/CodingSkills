---
name: router
description: CodingSkills 导航。不知道该用哪个 skill 时,描述你的场景,我告诉你该用哪个 skill 或操作。
disable-model-invocation: true
---

# Router(导航)

CodingSkills 的 skill 导航中心。说出你想做什么,我指向对应的 skill。

## 怎么用

直接描述场景或意图(如"我要加个功能"、"有个 bug 要修"、"想发布版本"),我告诉你该用哪个 skill。

## 场景 → skill

### 我要开发一个新功能
人驱动构建链:
1. `/feature-manager`(add)—— 登记 FEATURE_LIST.md + 建设计块
2. `/to-spec` —— 综合 spec → 设计块 Part B
3. `/to-tickets` —— 拆票 → 设计块实现步骤
4. `/implement` —— 构建(调 tdd + code-review)→ 提交
5. `/human-test-guide`(可选)—— 生成测试指导
6. `/feature-manager`(complete)—— 更新状态
7. `/smart-release` —— 发布

### 我要修一个 bug
1. `/issue-manager`(add)—— 登记 KNOWN_ISSUES.md + 分类
2. hard bug: `/diagnosing-bugs` —— 定位根因
3. `/implement` —— 修复(调 tdd + code-review)→ 提交
4. `/issue-manager`(resolve)—— 更新状态

### 我要对齐需求 / 理清思路
`/grill-me` —— ad-hoc 质询(脱离 feature 流程)

### 我要评审代码改动
`code-review` —— 双轴评审(Standards + Spec)(自然语言触发)

### 我要测试先行开发
`tdd` —— red-green 循环(pre-agreed seams,重构不在循环内)(自然语言触发)

### 我要诊断一个 bug
`diagnosing-bugs` —— 建反馈循环→复现→假设→探针→修(自然语言触发)

### 我要建/磨领域模型
`domain-modeling` —— 挑战术语,写 CONTEXT.md / ADR(自然语言触发)

### 我要发布版本 / 更新 changelog
`/smart-release` —— 同步 CHANGELOG + 版本发布

### 对话太长 / 要换会话继续
`/handoff` —— 压成交接文档

### 我要写 / 审计一个 skill
`/writing-great-skills` —— 方法论参考

## skill 速查

| skill | 调用 | 一句话 |
|------|------|--------|
| **Model-invoked 原语(自然语言触发)** | | |
| grilling | model | 质询原语 |
| tdd | model | 测试先行原语 |
| code-review | model | 双轴代码评审 |
| diagnosing-bugs | model | 诊断原语(反馈循环→复现→假设→修) |
| domain-modeling | model | 领域建模原语(术语,CONTEXT.md / ADR) |
| **User-invoked(人敲 /name)** | | |
| to-spec | user | 综合 spec → 设计块 Part B |
| to-tickets | user | 拆票 → 设计块实现步骤 |
| implement | user | 构建(调 tdd + code-review + 提交) |
| feature-manager | user | 管 FEATURE_LIST.md + feature 生命周期 |
| issue-manager | user | 管 KNOWN_ISSUES.md + issue 生命周期 |
| smart-release | user | 管 CHANGELOG.md + 发布 |
| human-test-guide | user | 人工测试指导生成 |
| grill-me | user | ad-hoc 质询入口 |
| handoff | user | 会话交接 |
| router | user | 本 skill,导航 |
| writing-great-skills | user | 写 / 审计 skill 的方法论 |

## 维护

本表是 skill 速查的权威映射。新增 / 重命名 / 删除任何 skill 时,必须同步更新本表与场景映射,避免"说谎的路由器"——一个指向已删或不存在 skill 的路由器比没有还糟。
