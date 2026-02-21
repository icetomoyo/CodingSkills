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
| **With ID** (e.g., `/start-next-feature 003`) | Implement the specified feature |
| **Without ID** (e.g., `/start-next-feature`) | Auto-select and implement highest priority planned feature |

## What This Command Does

## What This Command Does

1. **Select Feature** - Use specified ID or auto-select highest priority Planned feature
2. **Plan Implementation** - Analyze and create implementation plan
3. **TDD Development** - Write tests first, then implement
4. **Automated Testing** - Run all tests until 100% pass
5. **Generate Test Guide** - Create human testing documentation

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
7. Proceed with selected feature
```

**If no ID specified (auto-select):**
```
1. Read FEATURE_LIST.md
2. Find all Planned features
3. Sort by priority (Critical > High > Medium > Low)
4. Select highest priority feature (oldest if tie)
5. If no planned features: "No planned features found"
6. Proceed with selected feature
```

**Display selected feature:**

```
=== SELECTED FEATURE ===
ID: 001
Title: 用户登录系统
Priority: Critical
Category: New
Planned: v1.2.0

Description:
实现完整的用户登录系统，包括：
- 邮箱密码注册/登录
- OAuth2 第三方登录（Google、GitHub）
- 登录态管理（JWT Token）
=========================

6. Update status to InProgress
7. Set Started date to today
8. Update both Index and Details sections
```

### Phase 2: Plan Implementation

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
- @types/passport-jwt

--- END PLAN ---

Proceed with implementation? (Y/n/edit):
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

**测试指导包含**:
- 功能概述
- 测试环境配置
- 测试用例（正向/负向/边界/UI/性能/安全）
- 边界用例
- 测试总结模板

详见：[human-test-guide skill](../skills/human-test-guide/SKILL.md)

## Completion Output

```
=== FEATURE IMPLEMENTATION COMPLETE ===

Feature: 001 - 用户登录系统
Status: InProgress → Ready for Human Testing

What was done:
- Created AuthService with email/password and OAuth support
- Created AuthController with all endpoints
- Implemented JWT authentication
- Added Google and GitHub OAuth strategies
- All 30 automated tests passing
- 91% test coverage
- Human test guide generated

Next Steps:
1. Review docs/test-guides/FEATURE_001_TEST_GUIDE.md
2. Perform manual testing
3. Use /complete-feature 001 to mark as completed

Test Guide Location:
docs/test-guides/FEATURE_001_TEST_GUIDE.md
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

## Related Commands

- `/add-feature` - Add a new feature
- `/list-features` - View all features
- `/complete-feature [id]` - Mark feature as completed after testing
- `/archive-features` - Archive completed features

## Related Skills

- [feature-list-tracker](../skills/feature-list-tracker/SKILL.md) - Feature tracking skill
- [tdd-workflow](../skills/tdd-workflow/SKILL.md) - TDD methodology
