---
description: "Implement a feature from FEATURE_LIST.md. Specify a feature ID to implement that specific feature, or omit to automatically implement the highest priority planned feature. Runs complete workflow: Plan → TDD Development → Automated Testing → Generate Human Test Guide."
---

# Start Next Feature

Implement a feature with a complete automated workflow.

## Usage

```
/start-next-feature [id]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| id | Feature ID to implement (e.g., 001) | No |

## Behavior

| Scenario | Action |
|----------|--------|
| **With ID** (e.g., `/start-next-feature 003`) | Implement the specified feature (may prompt version change) |
| **Without ID** (e.g., `/start-next-feature`) | Auto-select from next release version |

## What This Command Does

1. **Select Feature** - Use specified ID or auto-select highest priority Planned feature
2. **Check Version** - Ensure feature is in next release version (may prompt to move)
3. **Plan Implementation** - Analyze and create implementation plan
4. **Update Design Doc** - Fill in detailed design sections
5. **TDD Development** - Write tests first, then implement
6. **Automated Testing** - Run all tests until 100% pass
7. **Generate Test Guide** - Create human testing documentation

## Workflow

### Phase 1: Select Feature

**If ID specified:**
```
1. Read FEATURE_LIST.md
2. Find feature by ID
3. Validate status is "Planned"
4. If not found: "Feature [id] not found"
5. If InProgress: "Feature [id] is already in progress"
6. If Completed: "Feature [id] is already completed"

7. Check version compatibility:
   - Get "next" Planned version (lowest version with Planned status)
   - Compare with feature's Planned version

   If feature.version > next.version:
   ┌─────────────────────────────────────────────────────┐
   │ 版本兼容性警告                                       │
   │                                                     │
   │ FEATURE_{ID} 当前规划版本: {feature.version}         │
   │ 但下一个发布版本是: {next.version}                   │
   │                                                     │
   │ 是否将 FEATURE_{ID} 移动到 {next.version}？[Y/n]    │
   └─────────────────────────────────────────────────────┘

   User confirms Y:
   → Move feature to new version (see Version Move Process below)
   → Continue with implementation

   User rejects n:
   → "请先完成 {next.version} 的 features"
   → "或使用 /start-next-feature 不带参数自动选择"
   → STOP

8. Proceed with selected feature
```

**If no ID specified (auto-select):**
```
1. Read FEATURE_LIST.md
2. Get "next" Planned version from Version Summary:
   - Find lowest version with Planned status
   - If multiple versions have Planned status, pick lowest
3. Find all Planned features in that version
4. Sort by priority (Critical > High > Medium > Low)
5. Select highest priority feature (oldest if tie)
6. If no planned features: "No planned features found"
7. Proceed with selected feature
```

**Version Move Process:**
```
When moving feature to new version:

1. Read old design file: docs/features/v{OLD_VERSION}.md
2. Remove FEATURE_{ID} section
3. If file becomes empty (no more features), delete it

4. Read/create new design file: docs/features/v{NEW_VERSION}.md
5. Add FEATURE_{ID} section (preserve existing content)

6. Update FEATURE_LIST.md:
   - Feature Index: Update Planned and Design link
   - Feature Details: Update Planned and Design link
   - Version Summary: Update both versions' progress

7. Confirm:
   "已将 FEATURE_{ID} 从 v{OLD} 移动到 v{NEW}"
```

**Display selected feature:**

```
=== SELECTED FEATURE ===
ID: 001
Title: 用户登录系统
Priority: Critical
Category: New
Planned: v1.1.0
Design: docs/features/v1.1.0.md#001

Description:
实现完整的用户登录系统，包括：
- 邮箱密码注册/登录
- OAuth2 第三方登录（Google、GitHub）
- 登录态管理（JWT Token）
=========================

9. Update status to InProgress
10. Set Started date to today
11. Update both Index and Details sections
12. Update Version Summary (status may change to InDevelopment)
```

### Phase 2: Ensure Feature Design Block & Plan Implementation

#### 2.1 Locate Feature Design Block

在开始规划之前，**必须先确认** `docs/features/v{VERSION}.md` 里存在对应的 `## FEATURE_{ID}` 设计块。这一步是为了防止 coding agent 只读到"版本级叙事"而错把整版意图当成单个 feature 的需求实现。

```
=== LOCATING FEATURE DESIGN BLOCK ===

1. Read docs/features/v{VERSION}.md
2. Search for heading: ## FEATURE_{ID}  或  ## FEATURE_{ID}:
3. Classify document into one of三种形态:

Case A - 设计块存在且已填充（6 节均有实质内容，不是 "_待 ... 填充_"）
  → Use as-is. Skip to 2.3 (Plan Implementation).

Case B - 设计块存在但为占位（6 节均为 "_待 ... 填充_" 或 add-feature 初始状态）
  → Skip to 2.3. 规划后在 "Update Design Document" 步骤填充。

Case C - 设计块不存在（版本文档只有版本级叙事，例如"版本目标/范围/主流程/验收标准/前端基线"等整版内容，但没有 per-feature 块）
  → 必须先执行 2.2 EXTRACTION，再进入 2.3。
```

#### 2.2 Extract Feature Design from Version Narrative（仅 Case C）

当版本文档是"版本级叙事"格式（例如整版只列了 feature 标题清单，其余内容都是整版通用的目标/范围/UI 规范/验收标准），必须先把本 feature 的设计从版本叙事里**抽取**出来，形成独立的 `## FEATURE_{ID}` 块。

```
=== EXTRACTING FEATURE DESIGN ===

检测到版本文档为"版本级叙事"格式，缺少 FEATURE_{ID} 的独立设计块。
正在从版本叙事中抽取本 feature 设计草案...

1. Read 整个 docs/features/v{VERSION}.md
2. 识别与本 feature 相关的内容碎片：
   - "本版本包含的 Feature" / "实施顺序" 中对应的条目
   - 直接点名本 feature 的章节（标题/正文）
   - 版本级 UI/产品/验收章节中可归因到本 feature 的段落
   - 版本级技术基线（如前端框架、架构指引）里适用于本 feature 的部分
   - 关键交互流、布局草图中本 feature 职责对应的部分

3. 起草 FEATURE_{ID} 的 6 节：

   ### 1. 需求概述
   从版本范围 + feature 标题 + 版本叙事中直接点名本 feature 的段落组合得出。
   必须明确：本 feature 独立的目标是什么，不是整版的目标是什么。

   ### 2. 影响范围
   若版本叙事中有明确的文件/模块/页面范围，抽取到此；否则写 "_待 Plan 阶段细化_"。

   ### 3. 技术方案
   抽取版本叙事中适用于本 feature 的技术方向（框架、依赖、视觉基线等）。
   不把整版通用的技术基线全复制进来，只保留本 feature 用得到的部分。

   ### 4. 接口契约
   若版本叙事中有本 feature 相关的 API/数据模型/页面契约/状态机，抽取到此；
   否则写 "_待 Plan 阶段细化_"。

   ### 5. 实现步骤
   一般留 "_待 Plan 阶段细化_"（Phase 2.3 会基于本草案制定具体实施计划）。

   ### 6. 验收标准
   从版本级"验收标准 / 通过标准"章节中挑出仅适用于本 feature 的条目。
   不把整版所有验收标准照搬进来。

4. 展示草案给用户:

┌──────────────────────────────────────────────────────────────┐
│ 从版本叙事中抽取 FEATURE_{ID} 设计草案                        │
│                                                              │
│ 来源: docs/features/v{VERSION}.md                            │
│ 归因章节: [列出抽取时引用的章节号，如 2.1, 3.1, 5.1, 7.3]    │
│                                                              │
│ [展示 6 节草案内容]                                          │
│                                                              │
│ 是否采纳？(Y/n/edit)                                         │
│   Y    采纳并写回版本文档                                    │
│   n    终止，我手动处理                                      │
│   edit 我改一下再采纳                                        │
└──────────────────────────────────────────────────────────────┘

5. 用户 Y: 将 ## FEATURE_{ID} 块追加到 docs/features/v{VERSION}.md
   - 位置: 版本级叙事之后，按 ID 顺序排列
   - 若已有其他 feature 块，按 ID 升序插入到正确位置
   - 不删除或改写原版本级叙事内容
   - 更新 FEATURE_LIST.md 的 Design 链接确保锚点对应
   → 继续 2.3

6. 用户 n: STOP
   提示: "请手动补充 FEATURE_{ID} 设计块，或使用 /add-feature -f 导入后重试"

7. 用户 edit: 展示草案供编辑，按编辑后内容写回，然后继续 2.3
```

**抽取原则**:
- **不发明**: 只从版本叙事里抽取，不凭空补充版本文档没写的内容
- **不越界**: 不要把整版通用叙事照搬到单个 feature 块里
- **可归因**: 在展示草案时列出"归因章节"，便于用户核验
- **不破坏**: 抽取过程不修改版本级叙事原文，仅追加新块

#### 2.3 Plan Implementation

```
=== ANALYZING FEATURE ===

前置条件: 本 feature 已有 ## FEATURE_{ID} 设计块（2.1 Case A / B / 2.2 抽取产物）
输入: 该设计块的 6 节内容 + 版本级叙事中的相关上下文

1. Search codebase for related code:
   - Existing auth code
   - User model/schema
   - API endpoints
   - Configuration files

2. Understand existing patterns:
   - Code style and conventions
   - Testing patterns
   - API design patterns
   - Database patterns

3. Create implementation plan:

--- IMPLEMENTATION PLAN ---

Files to Create:
- src/modules/auth/auth.controller.ts
- src/modules/auth/auth.service.ts
- src/modules/auth/auth.module.ts
- src/modules/auth/dto/login.dto.ts
- src/modules/auth/dto/register.dto.ts
- src/modules/auth/strategies/jwt.strategy.ts
- src/modules/auth/strategies/google.strategy.ts
- src/modules/auth/strategies/github.strategy.ts

Files to Modify:
- src/app.module.ts (add AuthModule)
- src/common/guards/jwt-auth.guard.ts (create)
- src/common/decorators/current-user.decorator.ts (create)
- package.json (add passport, jwt dependencies)

Key Components:
- AuthService: Core authentication logic
- AuthController: API endpoints
- JWT Strategy: Token validation
- OAuth Strategies: Google/GitHub login

API Endpoints:
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/google
- GET /auth/google/callback
- GET /auth/github
- GET /auth/github/callback
- GET /auth/me

Database Changes:
- users table: Add OAuth fields (googleId, githubId)

Dependencies:
- passport
- passport-jwt
- passport-google-oauth20
- passport-github2
- bcrypt

--- END PLAN ---

Proceed with implementation? (Y/n/edit):
```

**After user approval, update design document:**

根据 2.1 判定的形态决定写入策略：
- **Case A（已填充）**: 不覆盖原内容。仅在"实现步骤"中追加本次 Plan 细化的步骤（必要时）。
- **Case B（占位）**: 把 Plan 产出填入 6 节对应位置（当前行为）。
- **Case C（抽取产物）**: 在 2.2 已写回草案的基础上，将 Plan 细化后的"实现步骤"、"影响范围"等补完到原有草案块中，不另起新块。

```
=== UPDATING DESIGN DOCUMENT ===

Updating: docs/features/v1.1.0.md

Filling in sections for FEATURE_001:

### 2. 影响范围
**需要创建的文件**:
- src/modules/auth/auth.controller.ts
- src/modules/auth/auth.service.ts
- ...

**需要修改的文件**:
- src/app.module.ts
- ...

**相关现有文件**（参考模式）:
- src/modules/user/user.service.ts

### 3. 技术方案
**依赖**:
- bcrypt: 密码哈希
- jsonwebtoken: JWT 生成
- passport: 认证中间件

**架构模式**:
- Controller-Service-Repository 模式

### 4. 接口契约
**API 端点**:
- POST /auth/register
- POST /auth/login
- ...

**数据模型**:
```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  oauthProvider: 'google' | 'github' | null;
  oauthId: string | null;
}
```

### 5. 实现步骤
1. **创建 User 实体** → user.entity.ts
2. **实现 AuthService** → auth.service.ts
3. **实现 AuthController** → auth.controller.ts
4. **配置 JWT 策略** → jwt.strategy.ts
5. **集成 OAuth** → google.strategy.ts, github.strategy.ts

### 6. 验收标准
- [ ] 用户可以用邮箱密码注册
- [ ] 用户可以用邮箱密码登录
- [ ] 用户可以用 Google 账号登录
- [ ] 用户可以用 GitHub 账号登录
- [ ] 登录态可以持久化 7 天
- [ ] 错误凭据显示正确提示

✓ Design document updated
```

### Phase 3: TDD Development

```
=== TDD DEVELOPMENT ===

--- RED PHASE: Writing Tests ---

Creating test files:
- src/modules/auth/auth.controller.spec.ts
- src/modules/auth/auth.service.spec.ts

Writing test cases:

File: auth.service.spec.ts
  ✓ should register a new user with email/password
  ✓ should hash password during registration
  ✓ should not register duplicate email
  ✓ should login with correct credentials
  ✓ should not login with wrong password
  ✓ should generate valid JWT token
  ✓ should validate JWT token
  ✓ should handle Google OAuth
  ✓ should handle GitHub OAuth
  ✓ should handle user not found

File: auth.controller.spec.ts
  ✓ POST /auth/register should create user
  ✓ POST /auth/register should validate input
  ✓ POST /auth/login should return token
  ✓ POST /auth/login should reject invalid credentials
  ✓ GET /auth/me should return current user
  ✓ GET /auth/google should redirect
  ✓ GET /auth/github should redirect

Running tests... (expected to FAIL)
Tests: 17 failed, 0 passed
✓ Tests are failing as expected (RED phase complete)

--- GREEN PHASE: Implementation ---

Implementing AuthService...
Implementing AuthController...
Implementing JWT Strategy...
Implementing OAuth Strategies...
Updating AppModule...

Running tests... (should PASS)
Tests: 0 failed, 17 passed
✓ All tests passing (GREEN phase complete)

--- REFACTOR PHASE: Code Quality ---

Reviewing code for improvements:
- Extract common validation logic
- Improve error messages
- Add proper TypeScript types
- Remove code duplication

Running tests... (should still PASS)
Tests: 0 failed, 17 passed
✓ Refactoring complete, tests still pass

--- COVERAGE CHECK ---

Running coverage report...
Statements: 92%
Branches: 88%
Functions: 95%
Lines: 91%
✓ Coverage meets 80%+ requirement
```

### Phase 4: Automated Testing

```
=== AUTOMATED TESTING ===

Running all tests...

Unit Tests:
  auth.service.spec.ts      ✓ 10/10 passed
  auth.controller.spec.ts   ✓ 7/7 passed
  jwt.strategy.spec.ts      ✓ 5/5 passed

Integration Tests:
  auth.e2e.spec.ts          ✓ 8/8 passed

Type Checking:
  tsc --noEmit              ✓ No errors

Linting:
  eslint src/               ✓ No errors

Build:
  npm run build             ✓ Success

=== ALL TESTS PASSED ===
Total: 30 tests, 0 failures
Coverage: 91% statements
```

### Phase 5: Generate Test Guide

调用 `human-test-guide` skill 生成人工测试指导文档：

```
=== GENERATING TEST GUIDE ===

Calling human-test-guide skill...
Input: Feature description, implemented code changes, automated tests

Creating: docs/test-guides/FEATURE_001_TEST_GUIDE.md

✓ Test guide created
```

**输入**:
- Feature 描述（从 FEATURE_LIST.md 获取）
- 实现的代码变更（从 Phase 3 获取）
- 自动化测试用例（从 Phase 3-4 获取）

**输出**:
- `docs/test-guides/FEATURE_{ID}_{VERSION}_TEST_GUIDE.md`

详见：[human-test-guide skill](../skills/human-test-guide/SKILL.md)

## Completion Output

```
=== FEATURE IMPLEMENTATION COMPLETE ===

Feature: 001 - 用户登录系统
Status: InProgress → Ready for Human Testing
Version: v1.1.0

What was done:
- Updated design document with full details
- Created AuthService with email/password and OAuth support
- Created AuthController with all endpoints
- Implemented JWT authentication
- Added Google and GitHub OAuth strategies
- All 30 automated tests passing
- 91% test coverage
- Human test guide generated

Files:
- Design: docs/features/v1.1.0.md#001
- Test Guide: docs/test-guides/FEATURE_001_v1.1.0_TEST_GUIDE.md

Next Steps:
1. Review design document
2. Perform manual testing using test guide
3. Use /complete-feature 001 to mark as completed
```

## Error Cases

### Feature Not Found (When ID Specified)
```
/start-next-feature 999

Finding feature 999...
✗ Feature 999 not found in FEATURE_LIST.md

直接说 "列出所有 features" 或调用 `/feature-list-tracker` 即可。
```

### Feature Already In Progress (When ID Specified)
```
/start-next-feature 001

Finding feature 001...
Current status: InProgress

✗ Feature 001 is already in progress.
Started on: 2024-02-21
```

### Feature Already Completed (When ID Specified)
```
/start-next-feature 002

Finding feature 002...
Current status: Completed

✗ Feature 002 is already completed.
Completed on: 2024-02-15
Released in: v1.1.0
```

### No Planned Features (Auto-Select)
```
/start-next-feature

Finding planned features...
✗ No planned features found in FEATURE_LIST.md

All features are either in progress or completed.
Use /add-feature to add new features.
```

### Version Conflict (User Rejects Move)
```
/start-next-feature 003

Finding feature 003...
Current status: Planned
Current version: v1.2.0

┌─────────────────────────────────────────────────────┐
│ 版本兼容性警告                                       │
│                                                     │
│ FEATURE_003 当前规划版本: v1.2.0                     │
│ 但下一个发布版本是: v1.1.0                           │
│                                                     │
│ 是否将 FEATURE_003 移动到 v1.1.0？[Y/n]: n         │
└─────────────────────────────────────────────────────┘

✗ 用户取消版本移动

请先完成 v1.1.0 的 features，或使用 /start-next-feature 不带参数自动选择。
```

## Related Commands

- `/add-feature` - Add a new feature
- `/complete-feature [id]` - Mark feature as completed after testing
- `/archive-features` - Archive completed features

> **Note**: 列出 features 的功能已整合到 skill 中，直接说 "列出所有 features" 或调用 `/feature-list-tracker` 即可。

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
- [human-test-guide](../skills/human-test-guide/SKILL.md) - Test guide generation
- [tdd-workflow](../skills/tdd-workflow/SKILL.md) - TDD methodology
