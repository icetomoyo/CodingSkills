---
name: resolving-merge-conflicts
description: 解决进行中的 git merge/rebase 冲突。当仓库处于 merge/rebase/cherry-pick 中断状态,或用户说"有冲突/解决冲突/merge conflict/rebase 冲突/合不上"时使用。
---

# Resolving Merge Conflicts(解决合并冲突)

冲突不是"两段文本不一样,挑一段留下"。**两侧各承载一段意图**——`base→ours` 想达成什么,`base→theirs` 想达成什么。先分别还原两段意图,再产出让两者都活着的解决。

## 流程

1. **看清当前状态。** `git status` 判定是 merge、rebase 还是 cherry-pick,取冲突文件全集;`git log` / `git log MERGE_HEAD` 找出分叉点与两侧提交。完成判据:说得出本次合并的类型、目标 ref、冲突文件清单。
2. **为每个冲突还原两段意图。** 两侧分别读 commit message、相关 PR / issue / 票、以及改动周边的代码,搞清"这段改动为什么存在"。写成一对可核对的描述:*ours 要 X,因为 …;theirs 要 Y,因为 …*。完成判据:每个冲突文件都有这样一对意图描述。
3. **融合,而非挑行。** 逐 hunk 写出**同时满足两段意图**的实现。
   - 意图可共存(最常见:两侧改的是不相干的关注点)→ 融合成一个两者都成立的实现,通常是新建/合并函数、补全 switch 分支、把两个字段都加进 schema。
   - 真不可共存 → 选符合本次合并**声明目标**的那侧,并把被牺牲的意图与代价写进解决说明 / commit message,让下一个读者看得见。
   - 解决只落地两侧已有意图,新行为留给后续提交。
4. **跑项目的自动检查。** 先发现仓库自己的检查入口(`package.json` scripts / Makefile / CI 配置),按 **typecheck → 测试 → format** 顺序跑。检查红着意味着某段意图在解决中被弄丢了——回到步骤 2 重读那一侧,而不是改断言让它变绿。完成判据:typecheck 与测试全绿,或已列出需人工裁定的破坏项。
5. **收尾。** stage 全部已解决文件并 commit;rebase 则 `git rebase --continue` 逐提交推进,直到所有提交重放完。完成判据:`git status` 无未解决冲突,merge/rebase 进程已终止。

## 纪律

- **永远解决到底。** 不 `--abort` 退回起点;信息不足时向用户要那段意图的判断依据(哪边是当前期望行为),再往下走。
- **整文件取一侧是例外。** `--ours` / `--theirs` 仅在你已核对整个文件只承载单一意图、另一侧未与其交集时使用,并在说明里写明这个理由。
- **验证到意图级。** 检查绿只证明没崩;还要逐个冲突点回读,确认 ours 与 theirs 两段意图**都还在**代码里,或已被显式记录为取舍。

## 与其他 skill 的关系

- `code-review`:合并结果改动大时,对合并 diff 做双轴评审(Standards + Spec)。
- `issue-manager`:合并中暴露、当次不修的破坏,登记为 issue 跟踪。

> Adapted from [mattpocock/skills](https://github.com/mattpocock/skills) — resolving-merge-conflicts skill.
