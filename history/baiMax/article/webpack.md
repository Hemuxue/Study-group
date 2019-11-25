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



