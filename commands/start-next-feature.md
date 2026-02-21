---
description: Implement a feature from FEATURE_LIST.md. Specify a feature ID to implement that specific feature, or omit to automatically implement the highest priority planned feature. Runs complete workflow: Plan → TDD Development → Automated Testing → Generate Human Test Guide.
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

### Phase 2: Plan Implementation & Update Design Doc

```
=== ANALYZING FEATURE ===

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
- `docs/test-guides/FEATURE_XXX_TEST_GUIDE.md`

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
- Test Guide: docs/test-guides/FEATURE_001_TEST_GUIDE.md

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

Use /list-features to see all available features.
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
- `/list-features` - View all features
- `/complete-feature [id]` - Mark feature as completed after testing
- `/archive-features` - Archive completed features

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
- [human-test-guide](../skills/human-test-guide/SKILL.md) - Test guide generation
- [tdd-workflow](../skills/tdd-workflow/SKILL.md) - TDD methodology
