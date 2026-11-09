---
name: pr
description: PR 正文。当用户要写或改 pull request 描述、准备开 PR,或说"写个 PR 描述/PR body/更新 PR/开 PR"时使用。
metadata:
  credits:
    skill: show-me
    author: Dex Horthy
    organisation: Humanlayer
    url: "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md"
---

# PR 正文

PR 正文只服务一个判断:评审者该不该合并这个改动。三段顺序固定——先给形状(Summary),再给证据(Evidence),最后给风险(Merge Danger)。正文第一行就是 `## Summary`。领域词汇一律取用户 `GLOSSARY.md` 里的原词,散文压到最短。

## 模板

```markdown
## Summary

<一张图 / 一份 diff 草图 / 一棵树>

## Evidence

- **Before:** <截图 / 输出 / 失败的测试运行>
  **After:** <截图 / 输出 / 通过的测试运行>

## Merge Danger

**Door:** <one-way 或 two-way>

<可选:一句说明>

**Blast Radius:** <一个词>

<可选:合并后可能的连带后果>
```

## Summary

选**能说清关键点的最小视图**。七种视图的可照抄形状见 `EXAMPLES.md`;本节只给选型:

- **逻辑或算法** → 伪代码。
- **运行时控制流** → 调用树。
- **UI 结构** → 组件树,带上有意义的 state、props 与模块边界,括号里标文件路径。
- **文件职责或大范围重构** → 浅层文件树,每行一句职责注释。
- **组件交互 / 控制流 / 数据流** → Mermaid。
- **改动点本身就是重点、周边形状已存在** → `diff`,且 diff 的形状跟着主题走:组件、文件布局、调用树、状态/控制流各有其形。
- **大部分是新代码,或省略上下文会藏住归属与顺序** → 整块代码。

每张图紧贴它支撑的那一两句文字。图上只留回答当前讨论点所需的调用、文件、props、state、边界。视图数量由内容决定:一个通常够,几个也常见,全上几乎必然过载。

完成判据:每个视图都紧贴它支撑的文字,且删掉该视图那段话就说不清——说不出这个理由的视图删掉。

## Evidence

给出改动生效的**具体证据**,成对呈现 before / after。证据分两级,取可得性的高者:

- **S 级:截图。** 改动可见(UI、终端、图表)且环境已就绪时用截图;before 与 after 取同一视角、同一份数据。
- **A 级:执行结果。** 测试结果、控制台输出,点明**具体哪个**测试或命令由红转绿,把那段输出或伪代码贴出来。
- 两级都拿不到时,写清拿不到的原因,并附替代证据(日志片段、人工复现步骤)。

完成判据:每组 before 都配一个 after,且两者对应同一个测试 / 命令 / 视角。

## Merge Danger

两件事,各一句话。

**门(Door)——这个改动回滚得起吗?**

- **two-way**:能原路走回,revert 即恢复原状。
- **one-way**:走不回来。破坏性动作(删数据、改已发布 API 契约、不可逆迁移)与难以反悔的决策属于此类。

**爆炸半径(Blast Radius)——合并后可能波及多大范围?** 一个词定性,如 `local` / `single-service` / `all-consumers`。觉得有必要时再补一句具体连带后果:布局抖动、消费者破坏、移动端适配等。

完成判据:Door 已二选一;Blast Radius 是一个词而不是一句话。

## 完成判据

正文可交付需全部满足:

- [ ] 正文第一行是 `## Summary`,三段顺序为 Summary / Evidence / Merge Danger
- [ ] Summary 至少一个视图,且每个视图紧贴它支撑的文字
- [ ] Evidence 每组 before 都配有 after,对应同一测试 / 命令 / 视角
- [ ] Door 写明 one-way 或 two-way
- [ ] Blast Radius 是一个词
- [ ] 术语取自 `GLOSSARY.md`

## 与其他 skill 的关系

- `implement`:构建与 code-review 都过完之后,写 PR 正文这一步交给本 skill;Evidence 直接取 implement 收尾的全量测试输出。
- `code-review`:Critical/High finding 在正文里落实去处——已修的进 Summary,未修的进 Merge Danger 的连带后果。

> Adapted from [mattpocock/skills](https://github.com/mattpocock/skills) — pr skill.
