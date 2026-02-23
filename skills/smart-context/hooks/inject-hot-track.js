#!/usr/bin/env node
/**
 * Smart Context - SessionStart Hook
 *
 * 功能：压缩后自动注入热轨快照
 *
 * 触发条件：
 *   - SessionStart Hook
 *   - matcher: "compact" (只在压缩后的会话启动时触发)
 *
 * 输入：
 *   - JSON 对象，包含 compact_session: true 标识
 *
 * 输出：
 *   - stdout 内容会被自动注入到压缩后的会话
 *
 * 安装：
 *   1. 复制此文件到 ~/.claude/hooks/inject-hot-track.js
 *   2. 确保有执行权限：chmod +x inject-hot-track.js
 *   3. 在 settings.json 中配置 SessionStart Hook
 */

const fs = require('fs');
const path = require('path');

// 热轨快照文件名
const HOT_TRACK_FILE = 'HOT_TRACK.md';
const CONTEXT_DIR = '.claude/context';

/**
 * 主函数
 */
async function main() {
  // 读取 Hook 输入
  let input = '';

  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    input += chunk;
  }

  // 解析输入
  let data;
  try {
    data = JSON.parse(input);
  } catch (error) {
    // 无法解析输入，静默退出
    process.exit(0);
  }

  // 检查是否是压缩后的会话
  if (!data.compact_session) {
    // 不是压缩后的会话，静默退出
    process.exit(0);
  }

  // 获取工作目录
  const cwd = data.cwd || process.cwd();

  // 构建热轨快照路径
  const hotTrackPath = path.join(cwd, CONTEXT_DIR, HOT_TRACK_FILE);

  // 检查热轨快照是否存在
  if (!fs.existsSync(hotTrackPath)) {
    // 热轨快照不存在，静默退出
    process.exit(0);
  }

  // 读取热轨快照
  try {
    const content = fs.readFileSync(hotTrackPath, 'utf8');

    // 输出到 stdout - 这会被自动注入到压缩后的会话
    console.log(content);

    // 可选：记录日志
    const logPath = path.join(cwd, CONTEXT_DIR, 'COMPACT_LOG.md');
    logInjection(logPath, data.session_id);

  } catch (error) {
    // 读取失败，输出错误信息（可选）
    console.error('<!-- Smart Context: Failed to load hot track -->');
  }
}

/**
 * 记录注入日志
 */
function logInjection(logPath, sessionId) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = `\n| ${timestamp} | ${sessionId || 'unknown'} | 热轨快照已注入 |\n`;

    // 确保目录存在
    const logDir = path.dirname(logPath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // 如果日志文件不存在，创建表头
    if (!fs.existsSync(logPath)) {
      const header = `# 压缩日志\n\n| 时间 | Session ID | 操作 |\n|------|-------------|------|\n`;
      fs.writeFileSync(logPath, header);
    }

    // 追加日志
    fs.appendFileSync(logPath, logEntry);
  } catch (error) {
    // 日志记录失败，忽略
  }
}

// 运行
main().catch(() => {
  // 静默失败，不影响压缩流程
  process.exit(0);
});
