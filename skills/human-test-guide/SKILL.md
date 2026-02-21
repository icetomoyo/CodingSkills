---
name: human-test-guide
description: Generate comprehensive human testing guides with test cases, steps, and expected results. Automatically activates when users ask about testing, test cases, or test guides. Works for features, bug fixes, and general functionality verification.
---

# Human Test Guide Generator

This skill generates comprehensive human testing guides for software features, bug fixes, and functionality verification.

## Automatic Activation Triggers

This skill should be automatically activated when the user message contains:

**Keywords:**
- 测试指导、测试用例、人工测试、手动测试
- test guide, test cases, manual testing, human testing
- 测试步骤、测试方案、测试文档
- test steps, test plan, test documentation
- "怎么测试"、"帮我写测试"、"如何验证"
- "how to test", "help me write test", "how to verify"

**Example User Messages:**
- "帮我为登录功能写一个测试指导"
- "这个功能怎么测试？"
- "生成一个人工测试文档"
- "Write a test guide for the payment feature"
- "How should I manually test this?"

**When NOT to Activate:**
- User is asking about automated testing (unit tests, integration tests)
- User is asking about test frameworks or tools
- User uses "test" in a non-testing context (e.g., "test the waters")

## When to Use

- After implementing a new feature
- After fixing a bug (regression testing)
- When documenting existing functionality
- When preparing for QA review
- When onboarding new team members

## Test Guide Template

The generated test guide follows this structure:

```markdown
# [Feature Name] - 人工测试指导

## 功能概述

**功能名称**: [Name]
**版本**: [Version]
**测试日期**: [Date]
**测试人员**: [待填写]

**功能描述**:
[Brief description of what the feature does]

---

## 测试环境

### 前置条件
- [Prerequisite 1]
- [Prerequisite 2]

### 测试账号
- 账号1: [username/password]
- 账号2: [username/password]

### 浏览器/环境要求
- 浏览器: Chrome / Firefox / Safari
- 设备: Desktop / Mobile / Tablet
- 网络: 正常 / 弱网 / 离线

---

## 测试用例

### TC-001: [Test Case Title]

**优先级**: 高/中/低
**类型**: 正向测试/负向测试/边界测试/UI测试/性能测试/安全测试

**前置条件**:
- [Precondition 1]
- [Precondition 2]

**测试步骤**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**预期效果**:
- [ ] [Expected result 1]
- [ ] [Expected result 2]

**实际结果**: [待填写]
**是否通过**: [ ] Pass / [ ] Fail

---

[More test cases...]

---

## 边界用例

### BC-001: [Boundary Case Title]
- [Description and expected result]

---

## 测试总结

| 用例数 | 通过 | 失败 | 阻塞 |
|--------|------|------|------|
| X | - | - | - |

**测试结论**: [待填写]

**发现的问题**: [如有问题请在此记录]

---

*测试指导生成时间: [Date]*
*Feature/Bug ID: [ID]*
```

## Test Case Types

### 1. 正向测试 (Positive Testing)
Test the feature with valid inputs and expected usage patterns.

**Focus on:**
- Happy path scenarios
- Normal user workflows
- Valid input combinations

### 2. 负向测试 (Negative Testing)
Test the feature with invalid inputs and error conditions.

**Focus on:**
- Invalid input handling
- Error messages clarity
- Graceful degradation

### 3. 边界测试 (Boundary Testing)
Test the feature at the edges of acceptable values.

**Focus on:**
- Empty values (null, "", [])
- Maximum values (length, size, count)
- Minimum values
- Special characters
- Unicode and encoding

### 4. UI测试 (UI Testing)
Test the user interface and interactions.

**Focus on:**
- Visual consistency
- Responsive design
- Accessibility
- User feedback (loading, success, error states)

### 5. 性能测试 (Performance Testing)
Test the feature under various load conditions.

**Focus on:**
- Response time
- Concurrent users
- Large data sets
- Network conditions

### 6. 安全测试 (Security Testing)
Test the feature for security vulnerabilities.

**Focus on:**
- Authentication/Authorization
- Input validation (SQL injection, XSS)
- Sensitive data handling
- Session management

### 7. 兼容性测试 (Compatibility Testing)
Test the feature across different platforms and browsers.

**Focus on:**
- Browser compatibility
- Device compatibility
- OS versions
- Screen sizes

## Test Focus by Feature Type

### API Endpoints
| Category | Test Focus |
|----------|------------|
| 参数验证 | 必填参数、类型验证、范围检查 |
| 错误处理 | 错误码、错误消息、HTTP 状态码 |
| 认证授权 | Token 验证、权限检查、会话过期 |
| 性能 | 响应时间、并发请求、限流 |

### User Interface (UI)
| Category | Test Focus |
|----------|------------|
| 交互流程 | 导航、按钮点击、表单提交 |
| 表单验证 | 必填提示、格式验证、实时反馈 |
| 响应式 | 不同屏幕尺寸、横竖屏切换 |
| 错误提示 | 友好提示、错误恢复、帮助链接 |

### CLI Tools
| Category | Test Focus |
|----------|------------|
| 参数组合 | 必填参数、可选参数、互斥参数 |
| 错误处理 | 无效参数、文件不存在、权限不足 |
| 输出格式 | 格式正确、编码问题、终端兼容 |

### Data Processing
| Category | Test Focus |
|----------|------------|
| 数据类型 | 各种数据类型、空值、特殊值 |
| 数据量 | 小数据、大数据、增量处理 |
| 异常数据 | 格式错误、损坏数据、编码问题 |

### Authentication & Authorization
| Category | Test Focus |
|----------|------------|
| 登录/登出 | 正确凭据、错误凭据、会话管理 |
| 权限控制 | 角色权限、资源访问、越权防护 |
| 会话管理 | 超时、并发登录、Token 刷新 |

## How to Generate Test Guide

### Input Required
1. **Feature Description** - What the feature does
2. **Implementation Context** (optional) - Code changes, API endpoints, UI components
3. **Existing Tests** (optional) - Automated tests that can inform manual testing

### Process
```
1. 分析功能需求
   - 理解功能目标
   - 识别用户场景
   - 确定测试范围

2. 设计测试用例
   - 正向测试：覆盖主要功能流程
   - 负向测试：覆盖异常处理
   - 边界测试：覆盖极限情况
   - 根据功能类型补充特定测试

3. 编写测试步骤
   - 每个步骤清晰可执行
   - 预期结果具体可验证
   - 前置条件明确

4. 生成测试文档
   - 使用标准模板
   - 输出到 docs/test-guides/ 目录
   - 文件名：FEATURE_XXX_TEST_GUIDE.md 或 BUG_XXX_TEST_GUIDE.md
```

### Output Location
- Feature 测试指导: `docs/test-guides/FEATURE_XXX_TEST_GUIDE.md`
- Bug 回归测试指导: `docs/test-guides/BUG_XXX_REGRESSION_GUIDE.md`
- 通用测试指导: `docs/test-guides/[NAME]_TEST_GUIDE.md`

## Best Practices

### Writing Good Test Cases

**Good:**
```
TC-001: 邮箱密码登录 - 正确凭据

测试步骤:
1. 打开登录页面 /login
2. 输入邮箱: test@example.com
3. 输入密码: Test123!@#
4. 点击"登录"按钮

预期效果:
- [ ] 页面跳转到首页
- [ ] 导航栏显示用户信息
- [ ] 控制台无错误日志
```

**Bad:**
```
测试登录功能，看看能不能登录成功。
```

### Test Case Priority Guidelines

| Priority | When to Use |
|----------|-------------|
| **高** | 核心功能、关键路径、数据安全 |
| **中** | 重要但非关键、影响部分用户 |
| **低** | 边缘情况、影响小、低概率 |

### Coverage Checklist

For each feature, ensure coverage of:
- [ ] Happy path (normal usage)
- [ ] Error handling (invalid input)
- [ ] Edge cases (boundaries, limits)
- [ ] User experience (feedback, loading states)
- [ ] Security (if applicable)
- [ ] Performance (if applicable)
- [ ] Accessibility (if applicable)

## Integration with Other Skills

- **feature-list-tracker**: Called after `/start-next-feature` completes
- **known-issues-tracker**: Can generate regression tests after `/resolve-next-issue`
- **tdd-workflow**: Complements automated tests with human verification

## Related Commands

- `/start-next-feature` - Automated feature development with test guide generation
- `/resolve-next-issue` - Bug fix with optional regression test guide
