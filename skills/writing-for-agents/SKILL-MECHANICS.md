# Skill Mechanics(skill 专属机制)

[`writing-for-agents`](SKILL.md) 的 skill 专属分支:当被写的文档本身是一份 skill 时,多出来的东西——frontmatter 字段、调用二分、按调用拆分、路由 skill。其余写法(上下文指针、两种负载、信息层级、锚词、精修)全是 `SKILL.md` 里的通用参考,这里不重复。

## frontmatter 字段

`SKILL.md` 的 frontmatter 决定 skill 怎么被触达:

- `name`——skill 名,与目录名一致;人键入 `/name` 时用的就是它。
- `description`——见下面的**描述(description)**。面向模型还是面向人,取决于调用方式。
- `disable-model-invocation: true`——把描述从 agent 视野里剥离,得到**用户调用**;省略它则保留描述,得到**模型调用**。
- `argument-hint`(可选)——人敲 `/name` 时的入参提示(如 `"[description] | [id]"`),纯面向人,不改变调用方式。

## 调用二分(invocation)

两种选择,付不同的代价:

- **模型调用(model-invoked)** skill 保留**描述**,agent 能自主触发,其他 skill 也能触达(人仍可键入其名)。它花**上下文负载**:描述每个 turn 都占着窗口。机制:省略 `disable-model-invocation`,写面向模型的描述,带上触发分支(措辞规则见 `SKILL.md` 的"上下文指针")。
- **用户调用(user-invoked)** skill 把描述从 agent 视野里剥离:只有人键入其名才能触发,其他 skill 也触达不了。零上下文负载,但花**认知负载**——*你*是必须记得它存在的索引。机制:设 `disable-model-invocation: true`;`description` 转向人:一句话摘要,触发措辞删尽。

不存在"仅模型"状态:描述只*添加* agent 发现,从不移除人的触达——模型调用始终*包含*用户触达。

只在 agent 必须自主触达、或其他 skill 必须触达时才选模型调用。若它只被手动触发,就设为用户调用,不付上下文负载。

### 描述(description)

**描述**是 skill 的机器可读触发器,也是 skill 唯一被迫始终加载的**上下文指针**。它的存在本身就是调用轴:留着它,skill 就是模型调用(且可被其他 skill 触达);剥离它,skill 就是用户调用,只有人够得着。模型调用 skill 的上下文负载全部来自它。它也是一处归宿:内容全是**参考**的模型调用 skill 能被别的 skill 调用,于是多个 skill 都要的参考可以住在一处。

措辞按 `SKILL.md` 的指针规则写:锚词前置,一个分支一条触发,删掉正文已有的身份说明。

## 按调用拆分

**粒度**的第二刀(序列那一刀在 `SKILL.md`):当你有一个独立**锚词**该单独触发(一个你在 prompt 里真会用的触发词),或其他 skill 必须触达时,切出一个**模型调用** skill。你为新描述付**上下文负载**,所以这份独立触达得值这个价。

## 路由 skill

当用户调用 skill 多到你记不住,堆积的**认知负载**由**路由 skill(router skill)**治愈:一个用户调用 skill,点名其余 skill 及何时触达各自,让人只记一个而非许多个。它只能提示,永远不能触发它们:用户调用 skill 没有描述,除人之外什么都够不着。本仓库的 `which-skill` 就是一个路由 skill。

## 共享参考住哪

两个用户调用 skill 都要的**参考**,谁都住不了:它们都没有描述,谁也触发不了谁,只能由人手工带过去。把它推到一个普通文件——住在 skill 系统之外的**外部参考(external reference)**,任何 skill 都可指向,也能被 `AGENTS.md` / `CLAUDE.md` 的一行指向。
