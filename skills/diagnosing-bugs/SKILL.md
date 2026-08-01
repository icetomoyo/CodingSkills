---
name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", mentions 复现/定位/排查/为什么报错/慢, or reports something broken/throwing/failing/slow.
---

# Diagnosing Bugs(诊断 bug)

硬 bug 的纪律。仅在明确说明理由时跳过阶段。

探索代码库时,若项目有 `CONTEXT.md`(领域词汇表),先读它建立相关模块的心智模型,并查阅你触碰区域的 ADR。

## Phase 1 — 建反馈循环(Build a feedback loop)

**Build a feedback loop. This is the skill. Everything else is mechanical.** 拿到一个 **tight** 的 pass/fail 信号——能在 *这个* bug 上变 **red** 的信号——你就会找到原因;二分、假设检验、插桩都只是消费它。没有这个信号,盯着代码看再久也救不了你。

在这里投入不成比例的精力。**Be aggressive. Be creative. Refuse to give up.**

### 构造循环——大致按此顺序尝试

1. **失败测试**——在任何能触及 bug 的 seam 上:unit、integration、e2e。
2. **Curl / HTTP 脚本**——对着运行中的 dev server。
3. **CLI 调用**——带 fixture 输入,diff stdout 对照已知正确的快照。
4. **Headless 浏览器脚本**(Playwright / Puppeteer)——驱动 UI,断言 DOM/console/network。
5. **重放捕获的 trace**——把真实网络请求 / payload / 事件日志存盘,在隔离中重放经过 bug 代码路径。
6. **一次性 harness**——启动系统最小子集(一个服务,mock 依赖),用单次函数调用走通 bug 路径。
7. **Property / fuzz 循环**——若 bug 是"有时输出错",跑 1000 个随机输入找失败模式。
8. **二分 harness**——若 bug 出现在两个已知状态之间(commit、数据集、版本),自动化"启动到状态 X、检查、重复",让 `git bisect run` 驱动。
9. **差分循环**——同一输入走旧版 vs 新版(或两个配置),diff 输出。
10. **HITL bash 脚本**——最后手段。若必须人工点击,用 `scripts/hitl-loop.template.sh` 驱动 *人*——循环仍有结构,捕获的输出反馈给你。

建对反馈循环,bug 就修好 90% 了。

### 收紧循环(Tighten)

把循环当产品。有了 *一个* 循环后,**收紧**它:

- 能更快吗?(缓存 setup、跳过无关 init、收窄测试范围。)
- 信号更锋利吗?(断言具体症状,而非"没崩"。)
- 更确定吗?(钉住时间、seed RNG、隔离文件系统、冻结网络。)

30 秒的 flaky 循环几乎不如没有;2 秒的确定性循环才是 **tight**——调试超能力。

### 非确定性 bug

目标是**更高的复现率**,而非干净的复现。把触发器循环 100 次,并行化,加压,收窄时间窗,注入 sleep。50% flake 的 bug 可调试;1% 不行——持续提高复现率直到可调试。

### 确实建不出循环时

明确停下来说明。列出你试过什么。向用户要:(a) 能复现的环境访问,(b) 捕获的产物(HAR 文件、日志转储、core dump、带时间戳的录屏),或 (c) 添加临时生产插桩的许可。先有循环,再谈假设。

### 完成判据——一个 tight 且能 red 的循环

Phase 1 完成当循环 **tight** 且**能 red**:你能说出**一条命令**——脚本路径、测试调用、curl——你**已经至少跑过一次**(贴出调用和输出),且它:

- [ ] **能 red**——驱动真实 bug 代码路径,断言**用户描述的确切症状**,因此能在本 bug 上 red、修复后 green。是"能抓住这个特定 bug",而非"跑起来不报错"。
- [ ] **确定**——每次跑出同样判定(flaky bug:钉住的高复现率,见上)。
- [ ] **快**——秒级,不是分钟级。
- [ ] **agent 可运行**——你能无人值守地跑;人介入只通过 `scripts/hitl-loop.template.sh`。

若你在命令存在前就读代码建理论,**停——直接跳到假设正是本 skill 防止的失败。** 先有能 red 的命令,再进 Phase 2。

## Phase 2 — 复现 + 最小化(Reproduce + minimise)

跑循环。看它 **red**——bug 出现。

确认:

- [ ] 循环产出**用户**描述的失败模式——确认是同一个 bug,而非附近碰巧存在的另一个失败。错的 bug = 错的修。
- [ ] 失败可跨多次运行复现(非确定性 bug:足够高的复现率可调试)。
- [ ] 你已捕获确切症状(错误消息、错误输出、慢的计时),供后续阶段验证修复确实解决它。

### 最小化

**red** 之后,把复现缩到**仍然 red 的最小场景**。一次切一个——输入、调用方、配置、数据、步骤——每次切后重跑循环,只留对失败**承重(load-bearing)**的元素。

最小复现在 Phase 3 缩小假设空间(更少可疑的活动部件),并在 Phase 5 成为干净的回归测试。

完成当**每个剩余元素都承重**——移除任一都让循环 **green**。

复现**且**最小化之后才继续。

## Phase 3 — 假设(Hypothesise)

在测试任何一个之前,生成 **3–5 个排序假设**。单一假设生成会锚定在第一个看似合理的想法上。

每个假设必须**可证伪(falsifiable)**:说出它做出的预测。

> 格式:"若 <X> 是原因,则 <改 Y> 会让 bug 消失 / <改 Z> 会让它更严重。"

说不出预测,假设就是 vibe——丢弃或磨利它。

**把排序列表给用户看再测试。** 他们常有领域知识能即时重排("我们刚部署了 #3 的改动"),或知道已排除的假设。便宜的 checkpoint,大的时间节省。用户 AFK 就按你的排序继续。

## Phase 4 — 探针(Instrument)

每条探针必须映射到 Phase 3 的一个具体预测。**一次只改一个变量。**

工具偏好:

1. **Debugger / REPL 检查**——若环境支持。一个断点胜过十条日志。
2. **定向日志**——只放在区分假设的边界上,每条针对一个预测。

**给每条调试日志打唯一前缀标签**,如 `[DEBUG-a4f2]`。结尾清理变成一次 grep。无标签的日志会存活;有标签的会死。

**性能分支。** 对性能回归,日志通常是错的。改用:建立基线测量(timing harness、`performance.now()`、profiler、query plan),再二分。先量后修。

## Phase 5 — 修 + 回归测试(Fix + regression test)

**先写回归测试再修**——但仅当存在**正确的 seam**。

正确的 seam 是测试在调用点行使**真实 bug 模式**的 seam。若唯一可用的 seam 太浅(单调用方测试而 bug 需多调用方、unit 测试无法复现触发 bug 的调用链),在那里的回归测试给的是假信心。

**若没有正确 seam,这本身就是发现。** 记下它。代码库架构正在阻止 bug 被锁定。标记给下一阶段。

若正确 seam 存在,调用 `tdd` skill:

1. 把最小化复现转成该 seam 上的失败测试。
2. 看它失败。
3. 应用修复。
4. 看它通过。
5. 对原始(未最小化)场景重跑 Phase 1 反馈循环。

## Phase 6 — 清理 + 复盘(Cleanup + post-mortem)

声明完成前,全部满足:

- [ ] **bug 可稳定复现**——且原始复现不再复现(重跑 Phase 1 循环)
- [ ] **根因确认**——证实正确的假设已写入 commit / PR message,让下一个调试者学到
- [ ] **回归测试通过**(或 seam 缺失已文档化)
- [ ] **探针已清理**——所有 `[DEBUG-...]` 插桩已移除(`grep` 前缀);一次性原型已删除或移到明确标记的调试位置

**然后问:什么会阻止这个 bug?** 若答案涉及架构改动(没有好的测试 seam、纠缠的调用方、隐藏耦合),带着具体信息标记架构改进。在修复**之后**给建议,不是之前——你现在的信息比起步时多。

## 与其他 skill 的关系

- `tdd`:Phase 5 在正确 seam 上写回归测试并应用修复时调用。

> Adapted from [mattpocock/skills](https://github.com/mattpocock/skills) — diagnosing-bugs skill.
