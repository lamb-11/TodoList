const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    }
  },
  transpileDependencies: true,
  lintOnSave: false,   //关闭语法检查

  //开启代理服务器
  devServer: {
    proxy: {
      '/msg1': {
        target: 'http://localhost:5000',  //代理目标的基础路径
        pathRewrite: { '^/msg1': '' },  //路径重写
        ws: true,
        changeOrigin: true
      },
      '/msg2': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/msg2': '' },  //路径重写
      }
    }
  }
})
