# Feature List Tracker - Sample Formats

This file contains sample formats used by the feature-list-tracker skill.

---

## FEATURE_LIST.md Sample

```markdown
# Feature List

_Last Updated: YYYY-MM-DD HH:MM_

---

## Version Info

| 字段 | 值 | 说明 |
|------|-----|------|
| **Current Release** | v1.0.0 | 最新发布版本（仅供参考） |
| **Planned Version** | v1.1.0 | 当前规划的版本 |

---

## Version Summary

| Version | Status | Features | Progress |
|---------|--------|----------|----------|
| v1.0.0 | Released | 2 | 2/2 (100%) |
| v1.1.0 | InDevelopment | 3 | 1/3 (33%) |
| v1.2.0 | Planned | 1 | 0/1 (0%) |

---

## Feature Index

| ID | Category | Status | Priority | Title | Planned | Released | Design | Created | Started | Completed |
|----|----------|--------|----------|-------|---------|----------|--------|---------|---------|-----------|
| 001 | New | InProgress | High | User authentication | v1.1.0 | - | [Design](features/v1.1.0.md#001) | 2024-02-21 | 2024-02-25 | - |
| 002 | Enhancement | Completed | Medium | Dark mode support | v1.0.0 | v1.0.0 | [Design](features/v1.0.0.md#002) | 2024-02-15 | 2024-02-18 | 2024-03-10 |

---

## Feature Details

### 001: User Authentication System
- **Category**: New
- **Status**: InProgress
- **Priority**: High
- **Planned**: v1.1.0
- **Design**: [v1.1.0.md#001](features/v1.1.0.md#001)
- **Created**: 2024-02-21
- **Started**: 2024-02-21

**Description**:
Implement a complete user authentication system including:
- User registration with email verification
- Password-based login with secure hashing
- Password reset via email
- Session management with JWT tokens

---

## Summary
- Total: X (Y Planned, Z InProgress, A Completed)
- By Priority: Critical: C, High: H, Medium: M, Low: L
- Highest Priority InProgress: [ID] - [Title] (or "None")
```

---

## Empty FEATURE_LIST.md Sample

```markdown
# Feature List

_Last Updated: [Current DateTime]_

---

## Version Info

| 字段 | 值 | 说明 |
|------|-----|------|
| **Current Release** | - | （从 package.json/git tag 检测） |
| **Planned Version** | - | （待用户定义） |

---

## Version Summary

| Version | Status | Features | Progress |
|---------|--------|----------|----------|
| _No versions yet_ | | | |

---

## Feature Index

| ID | Category | Status | Priority | Title | Planned | Released | Design | Created | Started | Completed |
|----|----------|--------|----------|-------|---------|----------|--------|---------|---------|-----------|
| _No features tracked yet_

---

## Feature Details

_No feature details yet_

---

## Summary
- Total: 0 (0 Planned, 0 InProgress, 0 Completed)
- By Priority: Critical: 0, High: 0, Medium: 0, Low: 0
- Highest Priority InProgress: None
```

---

## Feature Design Document Sample

Located at `docs/features/v{VERSION}.md`:

```markdown
# v1.1.0 Feature Designs

**版本**: v1.1.0
**状态**: InDevelopment
**Feature 数量**: 3

---

## FEATURE_001: 用户登录系统

**Status**: InProgress
**Priority**: High
**Category**: New

### 1. 需求概述

实现完整的用户登录系统，支持邮箱密码登录和 OAuth 第三方登录。

### 2. 影响范围

**需要创建的文件**:
- src/modules/auth/auth.service.ts
- src/modules/auth/auth.controller.ts
- src/modules/auth/jwt.strategy.ts

**需要修改的文件**:
- src/app.module.ts (注册 AuthModule)

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
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/oauth/:provider

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

### 6. 验收标准

- [ ] 用户可以用邮箱密码注册
- [ ] 用户可以用邮箱密码登录
- [ ] 用户可以用 OAuth 登录
- [ ] 登录态可以持久化

---

## FEATURE_002: 暗色模式

**Status**: Planned
...

---

## 版本总结

| Feature | Status | 优先级 |
|---------|--------|--------|
| 001 | InProgress | High |
| 002 | Planned | Medium |
| 003 | Planned | Low |
```

---

## New Feature Section Sample

When adding a new feature to a version design file:

```markdown
## FEATURE_{ID}: {Title}

**Status**: Planned
**Priority**: {Priority}
**Category**: {Category}

### 1. 需求概述
{Description}

### 2. 影响范围
_待 /start-next-feature Phase 2 填充_

### 3. 技术方案
_待 /start-next-feature Phase 2 填充_

### 4. 接口契约
_待 /start-next-feature Phase 2 填充_

### 5. 实现步骤
_待 /start-next-feature Phase 2 填充_

### 6. 验收标准
_待 /start-next-feature Phase 2 填充_
```

---

## Archive File Sample

**File**: `FEATURES_ARCHIVED.md`

```markdown
# Archived Features

_Archive Created: YYYY-MM-DD_

---

## 2024-01 Archived Features

### 001: User Authentication (COMPLETED 2024-01-15)
- **Category**: New
- **Status**: Completed
- **Planned**: v1.0.0
- **Released**: v1.0.0
- **Created**: 2024-01-10
- **Completed**: 2024-01-15
[Full feature details preserved]

---

## Summary
- Total Archived: X features
- Archive Started: YYYY-MM-DD
```
