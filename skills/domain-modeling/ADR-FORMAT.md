# ADR 格式

ADR 放在 `docs/adr/`,顺序编号:`0001-slug.md`、`0002-slug.md`……

第一个 ADR 需要时才创建 `docs/adr/` 目录。

## 模板

```md
# {决策的简短标题}

{1-3 句话:背景是什么、决定了什么、为什么。}
```

就这些。ADR 可以只有一段。价值在于记录*做了*什么决定和*为什么*——不是填表。

## 可选章节

仅在确有价值时才加。大多数 ADR 不需要:

- **Status** frontmatter(`proposed | accepted | deprecated | superseded by ADR-NNNN`)——决策被重新审视时有用
- **Considered Options**——仅在被否决的替代方案值得记住时
- **Consequences**——仅在非显而易见的下游影响需要点明时

## 编号

扫 `docs/adr/` 找最大现有编号,加一。

## 什么算数

以下场景通常满足"难逆转 + 无上下文会困惑 + 真正的权衡"三条件,值得记 ADR:

- **架构形态。** "我们用 monorepo。""写模型是 event-sourced,读模型投影到 Postgres。"
- **上下文间的集成模式。** "Ordering 和 Billing 通过 domain events 通信,不是同步 HTTP。"
- **带锁定效应的技术选型。** 数据库、消息总线、认证 provider、部署目标。不是每个库——只是那些换掉要花一个季度的。
- **边界与范围决策。** "Customer 数据归 Customer 上下文拥有;其他上下文只按 ID 引用。"显式的 no 和 yes 一样有价值。
- **对常规路径的刻意偏离。** "我们用手写 SQL 不用 ORM,因为 X。"任何合理读者会假设相反的情况——这些阻止下一个工程师"修好"一个刻意的设计。
- **代码中不可见的约束。** "因合规要求不能用 AWS。""响应时间必须低于 200ms,因为合作方 API 合同。"
- **非显而易见的否决。** 考虑过 GraphQL 但因微妙理由选了 REST,就记下来——否则六个月后又有人提 GraphQL。
