# Query Cold - 查询冷轨历史

---
name: query-cold
description: 从冷轨归档中搜索历史信息
triggers:
  - query-cold|冷轨|查询历史|墓碑查询
---

## 使用方式

```
/query-cold "关键词"
```

## 功能

从 `.claude/context/COLD_TRACK.md` 中搜索指定关键词，返回：
- 匹配的墓碑信息
- 相关的历史片段

## 执行步骤

1. 读取 `.claude/context/COLD_TRACK.md` 文件
2. 使用 Grep 搜索关键词
3. 格式化输出匹配结果

## 输出格式

```markdown
> 在冷轨中找到 N 条相关记录：
>
> ## 墓碑 T01: [死胡同名称]
> - **失败原因**: [描述]
> - **放弃日期**: YYYY-MM-DD
>
> ## 历史片段 (Turn X-Y)
> [相关内容摘要]
```

## 示例

```
用户: /query-cold Session

Claude: 在冷轨中找到 2 条相关记录：

## 墓碑 T01: Session 存储登录态
- **失败原因**: 分布式部署时 Session 同步问题
- **放弃日期**: 2026-02-21
- **详情**: 尝试使用 express-session，但在多实例部署时出现 Session 不同步...

## 历史片段 (Turn 12-15)
**User**: 用 Session 存储登录状态怎么样？
**Assistant**: 我来实现 Session 存储...
[后续尝试失败的详细记录]
```
