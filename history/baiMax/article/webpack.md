5-1library 打包配置
库的创建以及打包，主要是为了其他业务代码使用这个库
js模式引入 
import 引入
require 引入
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // 不打包到库到代码里面去，而是让业务代码打包
  externals: ['lodash'],
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    // 不管是 require or import
    libraryTarget: 'umd',
    //全局增加一个library变量
    library: 'library'
  }
}

PWA: 离线应用
解决问题：服务器挂了，还能访问当前网页
需要插件：workbox-webpack-plugin,
service-worker: 另类的缓存

5-4 devServer 的代理配置
https://www.webpackjs.com/configuration/dev-server/#devserver-proxy

细节文档：https://github.com/chimurai/http-proxy-middleware#options
开源接口：http://www.dell-lee.com/react/api/header.json

5-5 WebpackDevServer 解决单页面应用路由问题
historyApifallback: true, 就能解决前端。后端需要配置相对应的nginx等

5-6 eslint 配置
npm i eslint -D 
npx eslint -- init
// 实际安装配置 需要借助编辑器 安装 eslint 插件配合使用
5-8  5-12
第三方模块单独打包，以全局变量的形式去访问
目标：
1、第三方模块只打包一次
2、引入第三方模块的时候，要去使用 dll（第三方模块的js文件名） 文件
3、
插件使用：
webpack.dll.js 中使用   webpack.DllPlugin 

webpack.common.js 中使用 webpack.DllReferencePlugin 和 AddAssetWebpackPlugin 
两者之间形成映射
6、控制打包文件大小
7、多进程打包：thread-loader，parallel-webpack,happypack
8、合理使用 sourceMap
9、结合 stats 分析打包结果
10、开发环境内存编译（webpack-dev-server）
11、开发环境无用插件剔除

5-13：多页面应用
添加入口文件，配合 HtmlWebpackPlugin 插件 使用。
https://www.webpackjs.com/plugins/html-webpack-plugin/
插件主要参数：
new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  // 文件打包产生的chunk文件
  chunks: ['vendors', 'index']
  }),
6-1 6-2
loader 编写
所谓 loader 只是一个导出为函数的 JavaScript 模块。loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。函数的 this 上下文将由 webpack 填充，并且 loader runner 具有一些有用方法，可以使 loader 改变为异步调用方式，或者获取 query 参数。

自己写loader的目的：对源代码对包装处理
1、代码异常捕获，不用嵌入业务代码
2、网站国际化配置：通过全局变量，改变特定字符代码包裹的内容{{title}}  一个全局变量为中文=> 替换成中文标题
loader-utils 使用
https://www.webpackjs.com/api/loaders/

6-3
plugin 编写
插件的编写是去编写一个类
https://www.webpackjs.com/api/plugins/

开启node debug 模式
package.json 中 scripts 配置 显示执行node文件 传递 node 参数
"debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js",
--inspect 开启node调试工具 --inspect-brk 执行时候第一行打一个断点

class CopyrightWebpackPlugin {
  constructor(options) {
    console.log(options)
  }
  apply(compiler) {
    对应的钩子函数 compile 同步
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log(compilation.assets)
    })
    // 对应的钩子函数 emit 异步
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      debugger  // 查看 compilation 的参数 
      compilation.assets['asyncCopyRight.js'] = {
        source: function() {
          return "bai"
        },
        size: function() {
          return 8
        }
      }
      cb()
    })
  }
}
module.exports = CopyrightWebpackPlugin;