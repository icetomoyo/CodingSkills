# Smart Context - 手动生成快照

---
name: smart-context
description: 手动生成上下文快照，用于预览或调试
triggers:
  - smart-context|生成快照|预览快照|手动压缩
---

## 使用方式

```
/smart-context
```

## 功能

手动触发三步清洗法，生成热轨快照和冷轨归档，但不执行压缩。

**适用场景**：
- 预览快照内容
- 调试三步清洗法
- 在压缩前检查生成结果

## 执行步骤

1. 分析当前对话上下文
2. 执行三步清洗法：
   - Step 1: 无损提取 — 抽骨架
   - Step 2: 有损修剪 — 立墓碑
   - Step 3: 生成快照 + 归档
3. 写入文件：
   - 热轨快照 → `.claude/context/HOT_TRACK.md`
   - 冷轨归档 → `.claude/context/COLD_TRACK.md`
4. 输出统计信息

## 输出示例

```
快照生成完成！

文件位置：
- 热轨快照: .claude/context/HOT_TRACK.md (~1,500 Token)
- 冷轨归档: .claude/context/COLD_TRACK.md

包含内容：
- 项目状态: 1 个目标, 1 个阻塞
- 接口骨架: 3 个文件
- 避坑墓碑: 2 条
- 关键决策: 1 条

提示: 执行 /compact 将自动触发快照生成并注入到压缩后的会话。
```

## 与 /compact 的区别

| 操作 | /smart-context | /compact |
|------|----------------|----------|
| 生成快照 | ✓ | ✓ |
| 执行压缩 | ✗ | ✓ |
| 自动注入 | ✗ | ✓ |
| 适用场景 | 预览/调试 | 正常使用 |

## 注意事项

- 手动生成的快照会被后续 /compact 覆盖
- 如果只想预览，可以先 /smart-context 查看后再决定是否 /compact
