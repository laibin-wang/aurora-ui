const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js', // 入口
      template: 'public/index.html', // 模板
      filename: 'index.html' // 输出文件
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false
                },
                optimizeSSR: false
              }
            },
            {
              loader: path.resolve(__dirname, './build/md-loader/index.js')
            }
          ]
        }
      ]
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('examples')) // @ 默认指向 src 目录，这里要改成 docs
      .set('~', path.resolve('packages')) // ~ 指向 packages

    // 把 packages 和 docs 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/).end()
      .include.add(/examples/).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}