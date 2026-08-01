# CONTEXT.md 格式

## 结构

```md
# {上下文名称}

{一两句话描述这个上下文是什么、为什么存在。}

## Language

**Order**:
{一两句话描述这个术语}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account
```

## 规则

- **要有主见。** 同一概念有多个词时,选最好的一个,其余列在 `_Avoid_` 下。
- **定义要紧凑。** 最多一两句话。定义它*是*什么,不是它*做*什么。
- **只收录本上下文特有的术语。** 通用编程概念(timeout、error type、utility pattern)不属于,即使项目大量使用。加术语前问:这是本上下文独有的概念,还是通用编程概念?只有前者属于。
- **出现自然聚类时,用子标题分组。** 若所有术语属于同一连贯领域,平铺即可。

## 单上下文 vs 多上下文

**单上下文(大多数仓库):** 根目录一个 `CONTEXT.md`。

**多上下文:** 根目录一个 `CONTEXT-MAP.md` 列出各上下文、位置及关系:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

推断结构:

- 有 `CONTEXT-MAP.md` → 读它找上下文
- 只有根 `CONTEXT.md` → 单上下文
- 都没有 → 在第一个术语解决时懒创建根 `CONTEXT.md`

多上下文时,推断当前话题属于哪个上下文。不清楚就问。
