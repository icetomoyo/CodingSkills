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

1. 读取 `.agent/HOT_TRACK.md`
2. 如果存在，输出快照内容
3. 如果不存在，提示用户先执行 /context-snapshot

## 输出示例

**成功时**：
```markdown
> 已加载热轨快照（生成时间: 2026-03-28 15:30, 版本: v3）

## 0. 原始意图
> 为 API 添加 JWT 认证，替换当前的 Session 方案

## 1. 项目状态
### 当前进度
| 模块 | 状态 | 说明 |
|------|------|------|
| JWT 签发 | 已完成 | auth.ts |
| Auth 中间件 | 已完成 | middleware.ts |
| 测试 | 进行中 | 14/16 通过 |

### 当下阻塞
- **问题**: 2 个测试因 mock 配置失败
- **下一步**: 修复 mock setup 并重新运行

## 2. 已确定接口（骨架）
### auth.ts
function login(provider: string): Promise<User>
function logout(): void
function validateToken(token: string): boolean

## 3. 文件操作日志
| 文件路径 | 操作 | 关键变更 | 日期 |
|----------|------|----------|------|
| src/auth.ts | 修改 | 添加 JWT 签发逻辑 | 03-28 |
| src/middleware.ts | 修改 | 新增 auth 中间件 | 03-28 |
| tests/auth.test.ts | 创建 | 16 个测试用例 | 03-28 |

## 4. 避坑墓碑
| 死胡同 | 失败原因 | 日期 |
|--------|----------|------|
| Session 存储登录态 | 分布式部署时 Session 同步问题 | 03-26 |

## 5. 关键决策
| 决策 | 理由 | 日期 |
|------|------|------|
| 使用 JWT | 无状态，易扩展 | 03-27 |

## 6. 下一步
1. 修复 auth.test.ts 中的 mock setup
2. 重新运行测试套件
3. 添加错误处理测试
```

**失败时**：
```
未找到热轨快照。

请先执行 /context-snapshot 生成快照。
```

## 工作流程

```
1. /context-snapshot  →  增量合并生成快照（含自验证）
2. /compact           →  执行压缩
3. /load-context      →  新会话需要时加载快照
```

## 注意事项

- 此命令只显示快照内容，不会修改会话历史
- 快照内容由 /context-snapshot 命令生成
- 如果快照过期，建议重新执行 /context-snapshot
- 加载的快照包含原始意图、文件操作日志等结构化信息
