---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a CONTEXT.md, or recording or editing an ADR.
---

# Domain Modeling(领域建模)

主动建立并磨利项目的**领域模型**。这是一门*主动*的纪律——挑战术语、造边界场景、术语一定型就即时写进词汇表。(仅仅*读* `CONTEXT.md` 查词汇不是本 skill——那是一行习惯,任何 skill 都能做。本 skill 用于你正在*改变*模型,而非消费它。)

## 文件结构

大多数仓库只有一个上下文:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

懒创建——只在有东西要写时才建文件。没有 `CONTEXT.md`,在第一个术语解决时建;没有 `docs/adr/`,在第一个 ADR 需要时建。多上下文仓库(根目录有 `CONTEXT-MAP.md`)的结构与推断规则见 [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md)。

## 会话中

### 对照词汇表挑战

用户使用的术语与 `CONTEXT.md` 已有语言冲突时,立即指出:"你的词汇表把 'cancellation' 定义为 X,但你似乎在说 Y——哪个对?"

### 锐化模糊术语

用户使用模糊或重载的词时,提出精确的规范术语:"你说 'account'——指 Customer 还是 User?这是两个不同的东西。"

### 讨论具体场景

领域关系被讨论时,用具体场景压力测试——构造探查边界的场景,逼用户精确表述概念之间的分界。

### 与代码交叉验证

用户陈述某事如何工作时,检查代码是否同意。发现矛盾就浮现:"你的代码取消整个 Order,但你刚说部分取消是可能的——哪个对?"

### 即时更新 CONTEXT.md

术语一定型就当场写进 `CONTEXT.md`——不攒着批量写,随发生随记。格式见 [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md)。

`CONTEXT.md` 是纯词汇表,仅此而已。

### 谨慎提 ADR

仅当以下三者**同时**为真,才提议创建 ADR:

1. **难逆转**——事后改主意的代价有意义
2. **无上下文会困惑**——未来的读者会想"他们为什么这么做?"
3. **真正的权衡**——存在真实的替代方案,你因具体理由选了其中一个

三者缺一,跳过 ADR。格式与适用场景见 [ADR-FORMAT.md](./ADR-FORMAT.md)。

## 完成判据

- 术语冲突已解决——每个冲突术语都有明确定义,或被显式标为"暂不决定"
- `CONTEXT.md` 已更新——新定型的术语已写入,冲突已修正
- ADR 仅在满足上述三条件时创建——不满足时不建

---

> Adapted from [mattpocock/skills](https://github.com/mattpocock/skills) — domain-modeling skill.
