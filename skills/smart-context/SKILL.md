---
name: smart-context
description: 智能上下文管理，通过双轨记忆（热轨/冷轨）和三步清洗法解决注意力稀释问题。手动生成高信噪比快照，压缩后自动注入到新会话。自动激活于压缩相关场景。
---

# Smart Context - 智能上下文管理

通过双轨记忆和三步清洗法解决长对话中的注意力稀释问题。

## 核心理念

**问题**：增量日志积累 → 90% 噪音 → 注意力稀释 → 忘记目标 / 重复踩坑

**解法**：折叠 + 快照，而非简单压缩

```
增量日志（几万 Token）──Squash──▶ 热轨快照（< 6k Token）
```

## Automatic Activation Triggers

This skill should be automatically activated when:

**Keywords:**
- compact, 压缩, 上下文, context
- 快照, snapshot, checkpoint
- 墓碑, tombstone, 死胡同, 避坑
- 注意力稀释, context window
- 热轨, 冷轨, hot track, cold track
- 之前试过, 历史方案, 为什么不行, 失败原因

**Example User Messages:**
- "上下文太长了" / "执行压缩" / "/compact"
- "生成一个快照" / "/context-snapshot"
- "之前试过什么方案？" / "我们尝试过什么？"
- "那个方案为什么不行？" / "XX方案失败的原因是？"
- "查一下冷轨" / "/query-cold"

**When NOT to Activate:**
- 用户只是问问题，不涉及上下文管理或历史查询
- 用户在讨论其他不相关的话题

## 双轨制记忆

### 热轨 (Hot Track)
- **容量**：< 6,000 Token
- **形式**：`.claude/context/HOT_TRACK.md`
- **内容**：项目状态 + 接口骨架 + 避坑墓碑 + 关键决策
- **特点**：压缩后自动注入（通过 SessionStart Hook）

### 冷轨 (Cold Track)
- **容量**：无限
- **形式**：`.claude/context/COLD_TRACK.md`
- **内容**：完整历史 + 墓碑详情
- **特点**：按需查询（通过 /query-cold）

## 文件结构

```
# 用户目录（全局，需手动安装）
~/.claude/
├── settings.json              # Hooks 配置（从 hooks-config.json 合并）
└── hooks/
    └── inject-hot-track.js    # SessionStart Hook 脚本

# 项目目录（每个项目独立，运行时自动创建）
your-project/.claude/
└── context/                   # 首次压缩时自动创建
    ├── HOT_TRACK.md           # 热轨快照（手动生成）
    ├── COLD_TRACK.md          # 冷轨归档（手动生成）
    └── COMPACT_LOG.md         # 压缩日志（自动生成，可选）
```

> **注意**：用户只需安装 hooks 配置，context 目录及其文件会在首次执行 `/compact` 时自动创建。

## 工作流程

### 推荐流程

```
用户执行 /context-snapshot（手动生成快照）
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. 三步清洗法执行                                           │
│    • 读取对话历史                                           │
│    • 无损提取接口骨架                                       │
│    • 有损修剪生成墓碑                                       │
│    • 生成热轨快照 → HOT_TRACK.md                            │
│    • 追加冷轨归档 → COLD_TRACK.md                           │
└─────────────────────────────────────────────────────────────┘
       │
       ▼
用户执行 /compact
       │
       ▼
   压缩执行（Claude Code 内置）
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. SessionStart Hook 触发（Command Hook）                   │
│                                                             │
│    inject-hot-track.js 脚本执行：                           │
│    • 检测 compact_session: true                             │
│    • 读取 HOT_TRACK.md                                      │
│    • 输出到 stdout → 自动注入到压缩后的会话                  │
└─────────────────────────────────────────────────────────────┘
       │
       ▼
   压缩完成，热轨快照已自动注入
```

> **注意**：由于 PreCompact Agent Hook 在非 REPL 环境下不支持，快照生成改为手动触发。

## 三步清洗法

### Step 1: 无损提取 — 抽骨架

**目标**：从杂乱对话中提取"沉淀下来的资产"

**提取规则**：

| 内容类型 | 提取方式 | 保留 |
|----------|----------|------|
| 函数定义 | 只保留签名 | `def calc(a: int, b: int) -> int` |
| 类定义 | 只保留属性和方法签名 | 删除方法体 |
| API 端点 | 只保留路由和参数定义 | 删除处理逻辑 |
| 数据模型 | 只保留字段定义 | 删除默认值逻辑 |

**执行过程**：
1. 扫描所有代码相关内容（工具调用、代码块）
2. 识别最终版本的接口（中间版本丢弃）
3. 提取函数签名、类型定义、API 路由
4. 生成骨架，不包含实现细节

### Step 2: 有损修剪 — 立墓碑

**目标**：识别失败尝试，生成避坑指南

**死胡同识别模式**：

```markdown
信号词：
- 假设提出："试试"、"也许"、"尝试一下"
- 尝试实施："我改了"、"修改为"、"实现了一下"
- 明确失败："不行"、"还是报错"、"没解决"
- 放弃方案："换一种"、"改用"、"算了"

匹配模式：[假设] + [尝试] + [失败] + [放弃] = 死胡同
```

**墓碑格式**：

```markdown
| 死胡同 | 失败原因 | 日期 |
|--------|----------|------|
| [方案名称] | [一句话说明为什么不行] | [日期] |
```

**执行过程**：
1. 遍历对话历史，识别死胡同模式
2. 为每个死胡同生成墓碑（< 50 字）
3. 将详细失败过程写入冷轨
4. 保留墓碑到热轨

### Step 3: 生成快照 + 归档

**目标**：组装热轨快照，确保大小可控

**Token 估算规则**：

```python
def estimate_tokens(text: str) -> int:
    """
    混合 Token 估算：
    - 英文/代码/符号：1 Token ≈ 4 字符
    - 中文/日文/韩文：1 Token ≈ 1.5 字符
    """
    chinese_chars = count_chinese(text)  # Unicode: \u4e00-\u9fff
    other_chars = len(text) - chinese_chars
    tokens = (chinese_chars / 1.5) + (other_chars / 4)
    return int(tokens)
```

**裁剪优先级**（接近 6,000 Token 上限时）：

| 优先级 | 内容 | 动作 |
|--------|------|------|
| 1 | 项目目标 + 阻塞 | 完整保留 |
| 2 | 接口骨架 | 压缩（删除参数详情） |
| 3 | 避坑墓碑 | 压缩（只保留死胡同+原因） |
| 4 | 关键决策 | 可删除 |
| 5 | 进度概览 | 可删除 |

**执行过程**：
1. 组装热轨快照（项目状态 + 接口骨架 + 墓碑 + 决策）
2. 估算 Token 数
3. 如果超限，按优先级裁剪
4. 写入 `.claude/context/HOT_TRACK.md`
5. 追加完整历史到 `.claude/context/COLD_TRACK.md`

## 热轨快照模板

```markdown
# 热轨快照

_生成时间: YYYY-MM-DD HH:MM_
_快照版本: v{N}_

---

## 1. 项目状态

### 当前目标
[一句话描述]

### 进度概览
| 模块 | 状态 | 说明 |
|------|------|------|
| ... | ... | ... |

### 当下阻塞
- **问题**: [描述]
- **下一步**: [计划]

---

## 2. 已确定接口（骨架）

### {文件名}
```
[接口签名，无实现体]
```

---

## 3. 避坑墓碑

| 死胡同 | 失败原因 | 日期 |
|--------|----------|------|
| [方案] | [一句话] | [日期] |

---

## 4. 关键决策

| 决策 | 理由 | 日期 |
|------|------|------|
| [选择] | [原因] | [日期] |

---
*Token 数: ~{N}*
```

## 冷轨归档模板

```markdown
# 冷轨归档

_创建时间: YYYY-MM-DD_

---

## 墓碑区

### T01: [死胡同名称]
- **失败原因**: [描述]
- **放弃日期**: YYYY-MM-DD
- **尝试过程**:
  [详细的失败过程记录]

---

## 历史记录区

### Session: YYYY-MM-DD

#### Turn 1 - HH:MM
**User**: [内容]
**Assistant**: [内容]
**Tools**: [工具调用]

---

## 统计
- 总交互数: {N}
- 墓碑数: {M}
- 最早记录: YYYY-MM-DD
```

## Actions

### 1. 安装配置

**Step 1: 复制 Hook 脚本**
```bash
mkdir -p ~/.claude/hooks
cp skills/smart-context/hooks/inject-hot-track.js ~/.claude/hooks/
chmod +x ~/.claude/hooks/inject-hot-track.js
```

**Step 2: 配置 Hooks**

将 `hooks/hooks-config.json` 中的配置合并到 `.claude/settings.json`（项目级）或 `~/.claude/settings.json`（用户级）：

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "node \"${CLAUDE_CONFIG_DIR}/hooks/inject-hot-track.js\""
          }
        ]
      }
    ]
  }
}
```

### 2. 执行压缩

```
# 先生成快照
/context-snapshot

# 再执行压缩
/compact

自动执行:
1. 压缩执行
2. SessionStart Hook → 脚本注入快照
3. 完成，上下文已恢复
```

### 3. 查询冷轨

```
/query-cold "关键词"

执行:
1. 在 COLD_TRACK.md 中用 Grep 搜索
2. 返回匹配的墓碑和历史片段
```

### 4. 手动生成快照（可选）

如果需要在压缩前预览快照：

```
/context-snapshot

执行:
1. 分析当前上下文
2. 执行三步清洗法
3. 生成快照文件
4. 输出统计信息
```

## Hooks 详细说明

### SessionStart Hook（Command Hook）

**触发条件**：压缩后的会话启动时（`compact_session: true`）

**输入参数**：
```json
{
  "session_id": "abc123",
  "cwd": "/current/working/directory",
  "hook_event_name": "SessionStart",
  "compact_session": true
}
```

**脚本任务**：
1. 检测 `compact_session: true`
2. 读取 `HOT_TRACK.md`
3. 输出到 stdout（自动注入到会话）

## 错误处理

| 场景 | 处理方式 |
|------|----------|
| HOT_TRACK.md 不存在 | SessionStart 静默退出，不注入 |
| COLD_TRACK.md 不存在 | 创建新文件 |
| context 目录不存在 | 自动创建 |
| Token 超限 | 按优先级裁剪 |
| 脚本执行失败 | 静默失败，不影响压缩流程 |

## 与其他 Skill 的集成

| Skill | 集成方式 |
|-------|----------|
| **feature-list-tracker** | 快照可引用 Feature ID |
| **known-issues-tracker** | 墓碑可关联 Issue ID |
| **human-test-guide** | 压缩后可生成测试指导 |
| **strategic-compact** | 建议压缩时机 |

## 最佳实践

### 何时压缩

- 上下文超过 70% 窗口时
- 完成一个阶段性任务后
- 开始新的功能开发前
- 遇到"注意力稀释"症状时

### 如何写高质量墓碑

Bad: 用 Session 不行
Good: Session 存储登录态 → 分布式部署时同步问题，改用 JWT

### 如何维护热轨

- 每次压缩自动更新
- 手动编辑添加重要信息
- 定期清理过时的决策

## 命令总结

| 命令 | 用途 | 自动化程度 |
|------|------|-----------|
| `/context-snapshot` | 生成快照（三步清洗法） | 手动 |
| `/compact` | 压缩 + 自动注入快照 | 半自动 |
| `/query-cold "关键词"` | 查询冷轨历史 | 手动 |

## 技术限制

1. **PreCompact Agent Hook 不支持** - 在非 REPL 环境下无法使用 agent 类型 hook，快照生成改为手动
2. **PostCompact Hook 不存在** - 无法在压缩后执行 Agent 逻辑
3. **SessionStart stdout 限制** - 只能注入文本，不能执行代码
4. **Token 估算不精确** - 使用字符估算，非精确计算
5. **冷轨查询基于 Grep** - 不支持语义搜索
