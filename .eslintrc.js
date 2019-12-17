module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow switch case through
    'no-fallthrough': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 禁止使用 eval 函数
    'no-eval': [2, { allowIndirect: true }],
    // 禁止多个空格， 忽略行位注释前的多个空格
    'no-multi-spaces': [2, { ignoreEOLComments: true }],
    // 去除文件末尾需要换行
    'eol-last': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
