# Smart Context Hooks

本目录包含 smart-context skill 的 Hooks 配置和脚本。

## 文件说明

| 文件 | 用途 |
|------|------|
| `hooks-config.json` | Hooks 配置模板，需要合并到 settings.json |
| `inject-hot-track.js` | SessionStart Hook 脚本，压缩后自动注入热轨快照 |

## 安装步骤

### Step 1: 复制脚本

```bash
# 创建 hooks 目录（如果不存在）
mkdir -p ~/.claude/hooks

# 复制脚本
cp skills/smart-context/hooks/inject-hot-track.js ~/.claude/hooks/

# 赋予执行权限
chmod +x ~/.claude/hooks/inject-hot-track.js
```

### Step 2: 配置 Hooks

将 `hooks-config.json` 中的内容合并到你的 settings.json：

**项目级**（只对当前项目生效）：
```bash
# 编辑 .claude/settings.json
# 将 hooks-config.json 中的 "hooks" 部分合并进去
```

**用户级**（对所有项目生效）：
```bash
# 编辑 ~/.claude/settings.json
# 将 hooks-config.json 中的 "hooks" 部分合并进去
```

## 目录结构

```
# 用户目录（全局配置）
~/.claude/
├── settings.json          # Hooks 配置（从 hooks-config.json 合并）
└── hooks/
    └── inject-hot-track.js  # 从本 skill 复制

# 项目目录（每个项目独立）
your-project/
└── .claude/
    └── context/           # 运行时生成，每个项目独立
        ├── HOT_TRACK.md   # 热轨快照（< 6k Token）
        ├── COLD_TRACK.md  # 冷轨归档（完整历史）
        └── COMPACT_LOG.md # 压缩日志（可选）
```

## 环境变量说明

| 变量 | 说明 |
|------|------|
| `${CLAUDE_CONFIG_DIR}` | Claude Code 配置目录（通常是 `~/.claude`） |

## 工作原理

```
用户执行 /compact
       │
       ▼
1. PreCompact Hook 触发
   • Agent 执行三步清洗法
   • 生成 HOT_TRACK.md 和 COLD_TRACK.md
       │
       ▼
2. 压缩执行（Claude Code 内置）
       │
       ▼
3. SessionStart Hook 触发
   • inject-hot-track.js 检测 compact_session: true
   • 读取 HOT_TRACK.md 并输出到 stdout
   • stdout 内容自动注入到新会话
       │
       ▼
   压缩完成，热轨快照已自动注入
```

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| 压缩后没有注入快照 | 检查 HOT_TRACK.md 是否存在 |
| 脚本执行失败 | 检查 Node.js 是否安装，路径是否正确 |
| Hook 未触发 | 检查 settings.json 配置是否正确合并 |
