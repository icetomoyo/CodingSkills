---
description: 手动加载热轨快照到当前会话。当需要在压缩后的新会话恢复上下文，或查看当前快照内容时使用。
---

# Load Context - 手动加载快照

手动读取并显示热轨快照内容。

## 使用方式

```
/load-context
```

## 适用场景

- 压缩后的新会话恢复上下文
- 查看当前快照内容
- 调试快照生成结果

## 执行步骤

1. 读取 `docs/context/HOT_TRACK.md`
2. 如果存在，输出快照内容
3. 如果不存在，提示用户先执行 /context-snapshot

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

请先执行 /context-snapshot 生成快照。
```

## 工作流程

```
1. /context-snapshot  →  生成快照
2. /compact           →  执行压缩
3. /load-context      →  新会话需要时加载快照
```

## 注意事项

- 此命令只显示快照内容，不会修改会话历史
- 快照内容由 /context-snapshot 命令生成
- 如果快照过期，建议重新执行 /context-snapshot
