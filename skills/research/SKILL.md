---
name: research
description: 对着 primary sources 调研问题,产出带引用的调研笔记。当用户想调研一个主题、查官方文档/API 事实/规范/changelog,或说"调研一下/查资料/research/帮我查证"时使用。
---

# Research(调研)

把调研问题交给一个**后台 agent** 去读,你继续推进主线——读资料是腿活,不该占你的前台上下文。

## 派发纪律

派活时在 objective 里写死三条,缺一条就会跑偏:

1. **只读 primary sources**——官方文档、源码、规范(spec)、changelog、第一方 API 与数据集。二手转述(博客、摘要、模型记忆)只能当线索,顺它去追**拥有该事实的那个源**;追不到源就不算查到。
2. **每条结论带引用**——笔记里每条论断后面附可核对的来源:URL + 具体页面/锚点,或仓库文件:行,或 commit / 版本号。
3. **产出一个 Markdown 文件**——落盘笔记,不是聊天回复。

## 笔记格式

- 标题写问题本身;开头一行结论摘要(TL;DR),让读者不读全文也能拿到答案。
- 正文每条论断 = 陈述 + 引用。来源彼此冲突时,并列呈现冲突,并写明你倾向哪个及理由。
- 查不到 primary source 的内容单独放 **未证实** 一节,与结论分区。
- 结尾列 **未解问题**——primary sources 答不了、需要人判断的部分,留给下一轮。

## 产出位置

沿用仓库已有的笔记约定(有 `docs/research/` 或同类目录就用它)。仓库里没有同类笔记时,写到 `docs/research/<topic-slug>.md`,与 `docs/` 下的 tracker 文件、`test-guides/` 同一约定,并在回复里告知用户落盘路径。

调研笔记是被引用的事实源:tracker 文件(FEATURE_LIST.md / KNOWN_ISSUES.md)与设计块只引路径,不复制正文。

## 完成判据

- [ ] 笔记文件已落盘,路径已告知用户
- [ ] 结论区每条论断都有 primary source 引用;无源支撑的内容已移入未证实一节
- [ ] 二手来源未出现在结论引用位
- [ ] 未解问题已列出(或明确写"无")

## 与其他 skill 的关系

- `to-spec`:调研结论作为 spec 的 Implementation Decisions 输入。
- `domain-modeling`:调研定下的术语定型后,由它写进 `CONTEXT.md`。

> Adapted from [mattpocock/skills](https://github.com/mattpocock/skills) — research skill.
