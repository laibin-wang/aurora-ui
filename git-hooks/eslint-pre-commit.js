const shell = require('shelljs')
const path = require('path')

const diffFiles = shell.exec('git diff --diff-filter=d --cached --name-only', { silent: true })
if (diffFiles.stdout === '') {
  return shell.exit(0)
} else {
  const fileList = diffFiles.grep('\\.(js|vue|jsx)$').stdout.trim().split('\n')

  for (let i = 0, length = fileList.length; i < length; i++) {
    // path.join('node_modules/.bin/eslint') 自动兼容 mac 与 windows 路径问题
    const code = shell.exec(`git show ":${fileList[i]}" | ${path.join('node_modules/.bin/eslint')} --stdin --stdin-filename "${fileList[i]}" --color --format codeframe`).code
    if (code !== 0) {
      console.log('\n')
      console.log('\x1B[31m%s\x1b[39m', fileList[i] + ' 中的代码不符合 eslint (stardand) 风格规范，请修改后再次 commit。')
      console.log('\n')
      shell.exit(code)
      break
    }
  }
}
