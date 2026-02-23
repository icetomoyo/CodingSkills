# Smart Context Hooks

本目录包含 smart-context skill 的 Hooks 配置。

## 当前状态

**无 Hooks 配置** - 采用完全手动流程。

## 工作流程

```
1. /context-snapshot  →  手动生成快照
2. /compact           →  执行压缩
3. /load-context      →  手动加载快照（新会话需要时）
```

## 为什么采用手动流程

1. **PreCompact Agent Hook 不支持** - 在非 REPL 环境下无法使用
2. **避免污染** - 自动注入旧快照可能污染新会话
3. **可靠性** - 手动流程让用户明确知道快照状态

## 文件说明

| 文件 | 用途 |
|------|------|
| `hooks-config.json` | Hooks 配置模板（当前为空） |

## 目录结构

```
# 项目目录（每个项目独立）
your-project/
└── .claude/
    └── context/           # 手动生成
        ├── HOT_TRACK.md   # 热轨快照（< 6k Token）
        └── COLD_TRACK.md  # 冷轨归档（完整历史）
```

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| 压缩后没有快照 | 压缩前先执行 /context-snapshot |
| 快照内容过时 | 重新执行 /context-snapshot 生成新快照 |
| 想恢复上下文 | 执行 /load-context 加载快照 |
