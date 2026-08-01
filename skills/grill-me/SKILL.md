---
name: grill-me
description: 对我当前的想法/计划/设计做一轮质询,直到每个决策分支都收敛。手动触发的无状态质询入口,薄委托 grilling 原语。
disable-model-invocation: true
argument-hint: "[要质询的主题]"
---

# Grill Me(质询我)

用户手动触发的无状态质询入口。你说"grill me / 质询我 / 追问一下我这个想法",本 skill 就对你当前的想法 / 计划 / 设计发起一轮穷追质询。

本 skill 是 `grilling` 原语的**薄包装**——质询纪律全部在 `grilling` 里,本 skill 不重复。本 skill 只负责:把"用户想被质询"这个意图,接上 `grilling` 循环。

## 怎么用

1. 拿到用户要质询的主题(当前对话里的想法 / 计划 / 设计;若有参数用它,否则从最近对话推断)。
2. 调用 `grilling` 原语对其发起质询。
3. 质询结束(共同理解达成、用户确认)即止。无文件产物,纯对话。

## 与流程内质询的区别

`to-spec` 会在其流程内调用 `grilling`。本 skill 是你**脱离那些流程、单纯想被质询**时的手动入口——不限于 feature 开发,任何想法 / 决策 / 设计都能用。

## 与其他 skill 的关系

- `grilling`:本 skill 薄委托的质询原语,纪律全在那。
