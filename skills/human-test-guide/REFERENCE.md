# Human Test Guide — 参考文档

本文件是 `human-test-guide` skill 的 progressive disclosure 子文档,存放模板、类型表、命名规则等详细参考。SKILL.md 只保留生成流程与完成判据。

## 测试指导模板

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
**类型**: 正向测试/负向测试/边界测试/UI测试/性能测试/安全测试/兼容性测试

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
*Feature/Issue ID: [ID]*
```

## 测试用例类型

### 1. 正向测试 (Positive Testing)
用有效输入和预期使用模式测试功能。
- Happy path 场景
- 正常用户工作流
- 有效输入组合

### 2. 负向测试 (Negative Testing)
用无效输入和错误条件测试功能。
- 无效输入处理
- 错误消息清晰度
- 优雅降级

### 3. 边界测试 (Boundary Testing)
在可接受值的边缘测试功能。
- 空值(null, "", [])
- 最大值(长度、大小、数量)
- 最小值
- 特殊字符
- Unicode 与编码

### 4. UI 测试 (UI Testing)
测试用户界面和交互。
- 视觉一致性
- 响应式设计
- 可访问性
- 用户反馈(加载、成功、错误态)

### 5. 性能测试 (Performance Testing)
在各种负载条件下测试功能。
- 响应时间
- 并发用户
- 大数据集
- 网络条件

### 6. 安全测试 (Security Testing)
测试功能的安全漏洞。
- 认证/授权
- 输入验证(SQL 注入、XSS)
- 敏感数据处理
- 会话管理

### 7. 兼容性测试 (Compatibility Testing)
跨不同平台和浏览器测试功能。
- 浏览器兼容性
- 设备兼容性
- OS 版本
- 屏幕尺寸

## 按功能类型的测试重点

### API Endpoints
| 类别 | 测试重点 |
|------|----------|
| 参数验证 | 必填参数、类型验证、范围检查 |
| 错误处理 | 错误码、错误消息、HTTP 状态码 |
| 认证授权 | Token 验证、权限检查、会话过期 |
| 性能 | 响应时间、并发请求、限流 |

### User Interface (UI)
| 类别 | 测试重点 |
|------|----------|
| 交互流程 | 导航、按钮点击、表单提交 |
| 表单验证 | 必填提示、格式验证、实时反馈 |
| 响应式 | 不同屏幕尺寸、横竖屏切换 |
| 错误提示 | 友好提示、错误恢复、帮助链接 |

### CLI Tools
| 类别 | 测试重点 |
|------|----------|
| 参数组合 | 必填参数、可选参数、互斥参数 |
| 错误处理 | 无效参数、文件不存在、权限不足 |
| 输出格式 | 格式正确、编码问题、终端兼容 |

### Data Processing
| 类别 | 测试重点 |
|------|----------|
| 数据类型 | 各种数据类型、空值、特殊值 |
| 数据量 | 小数据、大数据、增量处理 |
| 异常数据 | 格式错误、损坏数据、编码问题 |

### Authentication & Authorization
| 类别 | 测试重点 |
|------|----------|
| 登录/登出 | 正确凭据、错误凭据、会话管理 |
| 权限控制 | 角色权限、资源访问、越权防护 |
| 会话管理 | 超时、并发登录、Token 刷新 |

## 文件命名标准

文件名格式:`{TYPE}_{ID}_{VERSION}_{SUFFIX}.md`

| 组成部分 | 说明 | 示例 |
|---------|------|------|
| **TYPE** | 测试类型 | `FEATURE` 或 `ISSUE` |
| **ID** | 功能或问题的唯一标识符 | `001`, `002`, `003` |
| **VERSION** | 目标发布版本(从 feature/issue 获取) | `v1.1.0`, `v2.0.0` |
| **SUFFIX** | 文件类型后缀 | `TEST_GUIDE` 或 `REGRESSION_GUIDE` |

**命名模板**:
```
Feature 测试指导:
  FEATURE_{ID}_{VERSION}_TEST_GUIDE.md
  示例: FEATURE_001_v1.1.0_TEST_GUIDE.md

Issue 回归测试指导:
  ISSUE_{ID}_{VERSION}_REGRESSION_GUIDE.md
  示例: ISSUE_003_v1.0.2_REGRESSION_GUIDE.md

通用功能测试指导:
  FEATURE_{NAME}_{VERSION}_TEST_GUIDE.md
  示例: FEATURE_LOGIN_v1.1.0_TEST_GUIDE.md
```

**文件路径**:
```
项目根目录/
└── docs/
    └── test-guides/
        ├── FEATURE_001_v1.1.0_TEST_GUIDE.md
        ├── FEATURE_002_v1.1.0_TEST_GUIDE.md
        ├── ISSUE_003_v1.0.2_REGRESSION_GUIDE.md
        └── FEATURE_006_v1.2.0_TEST_GUIDE.md
```

**版本信息获取**:
1. 从 FEATURE_LIST.md 获取 feature 的 Planned 版本
2. 从 KNOWN_ISSUES.md 获取 issue 的 Target 版本
3. 如果无法获取版本,使用 "vX.X.X" 作为占位符

**文件名验证**:
```
✓ 正确: docs/test-guides/FEATURE_001_v1.1.0_TEST_GUIDE.md
✓ 正确: docs/test-guides/ISSUE_003_v1.0.2_REGRESSION_GUIDE.md
✗ 错误: test-guides/FEATURE_001_TEST_GUIDE.md (缺少版本)
✗ 错误: docs/FEATURE_001_v1.1.0_TEST_GUIDE.md (路径错误)
✗ 错误: docs/test-guides/login_test.md (不符合命名规范)
```

## 最佳实践

### 写好测试用例

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

### 测试用例优先级

| 优先级 | 适用场景 |
|--------|----------|
| **高** | 核心功能、关键路径、数据安全 |
| **中** | 重要但非关键、影响部分用户 |
| **低** | 边缘情况、影响小、低概率 |
