# Load Context - 手动加载快照

---
name: load-context
description: 手动加载热轨快照到当前会话
triggers:
  - load-context|加载快照|恢复上下文|load snapshot
---

## 使用方式

```
/load-context
```

## 功能

手动读取并显示热轨快照内容。

**适用场景**：
- 新会话开始时快速恢复上下文
- 查看当前快照内容
- 调试快照生成结果

## 执行步骤

1. 读取 `.claude/context/HOT_TRACK.md`
2. 如果存在，输出快照内容
3. 如果不存在，提示用户先执行 /compact 或 /smart-context

## 输出示例

**成功时**：
```markdown
> 已加载热轨快照（生成时间: 2026-02-23 15:30）

# 热轨快照

## 1. 项目状态

### 当前目标
实现用户登录系统

### 当下阻塞
- **问题**: OAuth-GitHub 403 错误
- **下一步**: 检查回调 URL 配置

## 2. 已确定接口（骨架）

### auth.ts
```typescript
function login(provider: string): Promise<User>
function logout(): void
function validateToken(token: string): boolean
```

## 3. 避坑墓碑

| 死胡同 | 失败原因 | 日期 |
|--------|----------|------|
| Session 存储 | 分布式同步问题 | 2026-02-21 |

## 4. 关键决策

| 决策 | 理由 | 日期 |
|------|------|------|
| 使用 JWT | 无状态，易扩展 | 2026-02-22 |
```

**失败时**：
```
未找到热轨快照。

请先执行以下操作之一：
- /compact - 压缩并自动生成快照
- /smart-context - 仅生成快照（不压缩）
```

## 与自动注入的区别

| 场景 | 自动注入 | /load-context |
|------|----------|---------------|
| 压缩后 | 自动执行 | 不需要 |
| 新会话 | 需手动 | 手动调用 |
| 查看快照 | 不适用 | 适合 |

## 注意事项

- 此命令只显示快照内容，不会修改会话历史
- 快照内容由 PreCompact Agent 生成，质量取决于对话内容
- 如果快照过期，建议重新执行 /compact
