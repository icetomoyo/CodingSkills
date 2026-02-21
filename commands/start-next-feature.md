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

```
=== GENERATING TEST GUIDE ===

Creating: docs/test-guides/FEATURE_001_TEST_GUIDE.md

Test guide includes:
- Feature overview
- Test environment setup
- 10 test cases with steps
- Edge cases
- Test summary template

✓ Test guide created
```

## Test Guide Template

The generated test guide follows this structure:

```markdown
# Feature 001: 用户登录系统 - 人工测试指导

## 功能概述

**功能名称**: 用户登录系统
**版本**: v1.2.0
**测试日期**: 2024-02-21
**测试人员**: [待填写]

**功能描述**:
实现完整的用户登录系统，支持邮箱密码登录和OAuth第三方登录。

---

## 测试环境

### 前置条件
- 应用已部署到测试环境
- 测试数据库已初始化
- OAuth 应用已配置（Google、GitHub）

### 测试账号
- 邮箱: test@example.com
- 密码: Test123!@#

### 浏览器要求
- Chrome / Firefox / Safari 最新版
- 移动端: iOS Safari / Android Chrome

---

## 测试用例

### TC-001: 邮箱密码注册

**优先级**: 高
**类型**: 正向测试

**前置条件**:
- 测试邮箱未注册

**测试步骤**:
1. 打开注册页面 `/register`
2. 输入邮箱: `newuser@example.com`
3. 输入密码: `NewUser123!`
4. 确认密码: `NewUser123!`
5. 点击"注册"按钮

**预期效果**:
- [ ] 显示注册成功提示
- [ ] 自动跳转到登录页面
- [ ] 收到验证邮件（如启用）

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-002: 邮箱密码登录 - 正确凭据

**优先级**: 高
**类型**: 正向测试

**前置条件**:
- 用户已注册: test@example.com

**测试步骤**:
1. 打开登录页面 `/login`
2. 输入邮箱: `test@example.com`
3. 输入密码: `Test123!@#`
4. 点击"登录"按钮

**预期效果**:
- [ ] 页面跳转到首页
- [ ] 导航栏显示用户信息
- [ ] 控制台无错误日志

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-003: 邮箱密码登录 - 错误密码

**优先级**: 高
**类型**: 负向测试

**前置条件**:
- 用户已注册: test@example.com

**测试步骤**:
1. 打开登录页面 `/login`
2. 输入邮箱: `test@example.com`
3. 输入密码: `WrongPassword`
4. 点击"登录"按钮

**预期效果**:
- [ ] 显示"邮箱或密码错误"提示
- [ ] 停留在登录页面
- [ ] 密码输入框被清空

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-004: Google OAuth 登录

**优先级**: 高
**类型**: 正向测试

**前置条件**:
- 已配置 Google OAuth
- 有 Google 测试账号

**测试步骤**:
1. 打开登录页面 `/login`
2. 点击"使用 Google 登录"按钮
3. 在 Google 授权页面选择账号
4. 确认授权

**预期效果**:
- [ ] 成功跳转回应用
- [ ] 使用 Google 账号登录成功
- [ ] 导航栏显示 Google 账号信息

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-005: GitHub OAuth 登录

**优先级**: 高
**类型**: 正向测试

**前置条件**:
- 已配置 GitHub OAuth
- 有 GitHub 测试账号

**测试步骤**:
1. 打开登录页面 `/login`
2. 点击"使用 GitHub 登录"按钮
3. 在 GitHub 授权页面确认
4. 确认授权

**预期效果**:
- [ ] 成功跳转回应用
- [ ] 使用 GitHub 账号登录成功
- [ ] 导航栏显示 GitHub 账号信息

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-006: 登录状态持久化

**优先级**: 中
**类型**: 功能测试

**前置条件**:
- 用户已登录

**测试步骤**:
1. 登录成功后关闭浏览器
2. 重新打开浏览器
3. 访问应用首页

**预期效果**:
- [ ] 用户仍然保持登录状态
- [ ] 无需重新登录

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-007: 登出功能

**优先级**: 中
**类型**: 功能测试

**前置条件**:
- 用户已登录

**测试步骤**:
1. 点击用户头像/菜单
2. 点击"登出"按钮
3. 确认登出

**预期效果**:
- [ ] 跳转到登录页面
- [ ] 导航栏显示登录按钮
- [ ] 访问受保护页面被重定向

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-008: 表单验证 - 空字段

**优先级**: 低
**类型**: 边界测试

**前置条件**:
- 无

**测试步骤**:
1. 打开登录页面 `/login`
2. 保持所有字段为空
3. 点击"登录"按钮

**预期效果**:
- [ ] 显示"请输入邮箱"提示
- [ ] 显示"请输入密码"提示
- [ ] 不发送登录请求

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-009: 表单验证 - 无效邮箱格式

**优先级**: 低
**类型**: 边界测试

**前置条件**:
- 无

**测试步骤**:
1. 打开登录页面 `/login`
2. 输入邮箱: `invalid-email`
3. 输入密码: `Test123!@#`
4. 点击"登录"按钮

**预期效果**:
- [ ] 显示"请输入有效的邮箱地址"提示
- [ ] 不发送登录请求

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

### TC-010: 密码可见性切换

**优先级**: 低
**类型**: UI测试

**前置条件**:
- 无

**测试步骤**:
1. 打开登录页面 `/login`
2. 输入密码: `Test123!@#`
3. 点击密码框旁的眼睛图标

**预期效果**:
- [ ] 密码从 `****` 变为明文 `Test123!@#`
- [ ] 图标状态变化

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

## 边界用例

### BC-001: 连续登录失败锁定
- 连续5次输入错误密码
- 预期: 账号被锁定15分钟

### BC-002: 密码长度限制
- 输入超长密码（256字符）
- 预期: 正常处理或提示限制

### BC-003: 特殊字符处理
- 密码包含特殊字符 `!@#$%^&*()`
- 预期: 正常登录

---

## 测试总结

| 用例数 | 通过 | 失败 | 阻塞 |
|--------|------|------|------|
| 10 | - | - | - |

**测试结论**: [待填写]

**发现的问题**: [如有问题请在此记录]

---

*测试指导生成时间: 2024-02-21*
*Feature ID: 001*
```

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
