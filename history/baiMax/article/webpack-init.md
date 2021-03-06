2-1 2-2
webpack 是什么，有什么用
原始代码存在的问题: 依赖颠倒，
webpack：模块打包工具
能识别：ES Moudule 模块引入方式 ，commonJs 模块引入规范 ，CMD ，AMD 等等
官方阅读学习：https://www.webpackjs.com/configuration/

webpack 关键词：chunk（块） mode（模式）

webpack 的四个核心概念：
1、入口(entry)：
2、输出(output)
3、loader
4、插件(plugins)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
自己理解：一切依赖和模块的入口。入口可以配置多个

输出(output) 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，
默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。
你可以通过在配置中指定一个 output 字段，来配置这些处理过程：
自己理解：

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，
然后你就可以利用 webpack 的打包能力，对它们进行处理。
自己理解：把 无效模块（webpack不能识别的模块,js以外的模块文件） 处理成 有效模块

loader 被用于转换某些类型的模块，而 插件(plugins) 则可以用于执行范围更广的任务。
插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。
插件接口功能极其强大，可以用来处理各种各样的任务。
自己理解：他能出现整个打包过程中（打包前。打包中，打包后）。理解为 vue 的生命周期函数，插件目的在于解决 loader 无法实现的其他事。

打包中模式（mode）的选择：development（开发环境配置） 和 production（线上环境配置）。mode 配置选项，告知 webpack 使用相应模式的内置优化

模块热替换(HMR - Hot Module Replacement)：目的是更高效的开发
2-3：创建文件，初始化项目
npm init --> 生成 package.json 文件 （npm init -y 会默认使用配置，不用去选择）
{
  "name": "demo1", 
  "version": "1.0.0",
  "description": "",
  "private": true,   //项目私有化
  "author": "byf",
  "license": "ISC" 
}
安装webpack （不推荐全局，因为项目有不同版本项目等一系列原因）
安装 npm install webpack webpack-cli -g (全局安装)
卸载 npm uninstall webpack webpack-cli -g (全局卸载)

项目里安装 webpack: npm install webpack webpack-cli  -D (-save-dev 的简写)
现在使用 webpack -v 查询不到 webpack 版本
因为全局没有了 webpack  我们需要借助 node 的 npx 查看 webpack版本号
npx webpack -v (npx命令会帮助我们去node_modules下去查找模块包)

npx： 查询项目内模块包的版本

番外：
npm info webpack  查询webpack包的版本 
npm install webpack@4.26.0 webpack-cli -D 安装固定版本包 
把自己的项目拷贝给别人的时候，把 node_modules 删除 然后在 npm i 安装

小结：以上我们学会了初始化一个项目以及配置不同版本的 webpack 还有node的命令，以及解决全局安装webpack带来的问题

2-4： webpack 的配置文件
文件名：webpack.congif.js (默认文件名)
番外命令：npx webpack --config wpCnfig.js  // 以wpConfig 配置文件打包

webpack.congif.js 配置文件代码（webpack有默认的配置文件，不写他会按默认的来执行）：
// 引入 node 的 path 模块配合
const path = require('path')
// 原始打包
module.exports = {
  entry: './index.js', // 从index.js 打包 项目打包的入口文件
  output: {
    filename: 'bundle.js',   // 打包生成文件名
    path: path.resolve(__dirname, 'bundle')  //打包的路径（后跟绝对路径）
  }
}

代码结构优化：
原则： 浏览器直接运行的代码和不能直接运行的代码（源代码）分开存放
源代码存放在 src 目录下 以及 webpack.congif.js 的配置需要修改 
（待扩展，文件目录结构划分）
首先，我们稍微调整下目录结构，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。
“源”代码是用于书写和编辑的代码。
“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载：

小结：三种打包方式
全局： global 
webpack index.js

局部：local
npx webpack index.js

借助 npm script 
npm run bundle  ==> webpack (因为 webpack.config.js 配置的打包文件，省略了 index.js)

三种方式，归根结底，都是去运行 webpack 命令
番外：我们之所以能在命令行里运行 webpack 命令 是因为 webpack-cli 的功劳
webpack-cli的作用：使命令行里能正常运行 webpack 命令

以上我们学会了如何配置 webpack.config.js 文件 修改打包文件名以及打包路径。
以上内容对应官网： 中文文档 -> 指南 -> 起步内容

3-1 3-2 3-3 3-4
loader学习：js 以外的模块需要 loader 辅助打包
loader的执行顺序 从下到上，从左到右
webpack 默认知道打包js模块，但是不知道 jpg 等其他文件怎么打包。所以我们需要配置 loader 辅助 webpack 打包
file-loader ：打包流程。把文件中到静态文件添加 入 dist 文件 同时 获得返回文件地址 
https://www.webpackjs.com/loaders/file-loader/
打包流程：遇到 jpg 文件时候 会被移动到 dist 目录下 名字需要自定义 默认为hash值。

url-loader: 图片转码成 base-64 字符串。直接放到 main.js 中
https://www.webpackjs.com/loaders/url-loader/

好处：一次性加载js 不需要多余的http请求
坏处：图片过大。js文件也就大。加载缓慢，
处理方法：use 下 options下添加 limit 属性
limit：2048 
表示 文件最大为2048（2kb）,不超过就以base64形式，超过就和file-loader 一样到打包模式打包

问题1: js 文件 import 和 require 导出的对象不同，why？
问题2: webpack.config.js 文件中 file-loader 配置name属性成方法，如何拿到 webpack.config.js 的mode

css文件打包
https://www.webpackjs.com/loaders/url-loader/ 

style-loader: 把样式挂在到html头部标签，
css-loader: 需要配置 options 里的 importLoader: 2 (在index.js中 import 别的css文件的时候需要再次执行其他 loader，如果不设置，在index.js 再次引入别的样式文件，不会执行之前的sass等loader)，2 代表执行之前的两个loader

sass-loader: (需要装sass）
postcss-loader:  

模块化的 css  类似vue 的style scoped

打包字体文件(直接打包到dist中)
使用 file-loader 
阅读官网 Guides 下 Asset Management  css-loader sass-loader 等loader 查阅


3-5
webpack 之插件（plugin）:想在打包的过程中做什么事情就加对应的plugin
1、插件需要引入(require)
2、像vue的生命周期函数，会在特定的时刻，帮你做一些事情

eg：插件帮自动创建html文件。
htmlWebpackPlugin:打包之后运行 插件会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中（入口文件引入）

clean-webpack-plugin: 打包之前运行 删除之前打包的dist 
https://blog.csdn.net/qq_23521659/article/details/88353708

3-6
entry 与 output 打包多个文件时候的配置
https://www.webpackjs.com/guides/output-management/#%E9%A2%84%E5%85%88%E5%87%86%E5%A4%87
多个入口文件，必须要对应多个出口文件。不能把出口文件名写死
output: {
   filename: '[name].js',  
}
关于cdn配置。后端直接用html加上地址访问我们打包上传到cdn的文件。

3-7 source-map 配置
属性：devtool 
webpack.config.js 导出模块中的 devtool 属性
选项意义：此选项控制是否生成，以及如何生成 source map。
解决的问题：没有配置时，打包出来的代码出错了，并不知道源代码出错在哪。配置后能定位到源代码出错的位子。
api连接：https://www.webpackjs.com/configuration/devtool/
devtool: 'source-map'
source-map: 打包后的代码和打包前的代码形成映射关系
ex：打包后的代码 main.js 90行报错，对应的开发代码是第一行。这个映射关系由 source-map 帮我们实现

inline 开头的会把 map.js 文件变成 base64字符串 内置到 main.js 的底部（使得 main.js比较大） 报错会精确到哪一行，哪一列（比较耗费性能）
cheap：报错只精确到 行。
module：可以检测到 loader 和 第三方模块 的错误
eval 以 eval 语法的方式进行打包（打包速度最快，性能最好。但报错提示不全面）
mode: development
开发环境建议使用：cheap-module-eval-source-map 
优点：错误提示比较全面，打包速度比较快

mode: production
线上代码建议使用：cheap-module-source-map
优点：打包速度快，有简介到映射对照（代码线上环境了。可以不用太详细到对照）

source-map扩展：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html 
简单说，Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。


3-8
简化开发的方式：
package.json 中 scripts 配置 "watch": "webpack --watch",
功能：能监听到我们代码改变自动打包。（不能帮我启动服务器）

webpack devServer：
隐藏特性：打包生成的 dist 目录放在了电脑内存里面，有效提升打包速度和提高开发效率
1、需要配置 package.json 和 webpack.config.js
package.json 中
"scripts": {
    "dev-build": "webpack --config ./build/webpack.dev.js",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
}
webpack.config.js 的导出对象中配置
自动打开浏览器 启动服务器地址
devServer:{
  contentBase: './dist',
  open:true,
  port: 8080,
  hot:true,
  hotOnly:true
  // proxy:{
  //   './api': 'http://locahost:1234'
  // }
},
2、功能：自动打开浏览器,能打开服务器，发送ajax请求
https://www.webpackjs.com/configuration/dev-server/#devserver
核心：devServer 属性
一些框架的cli工具基本都配置了 webpack devServer 使用代理等

webpack 两种使用方式：node 和 命令行


3-9 3-10
HMR：热模块替换（修改了哪个模块，哪个模块就更新，其他模块不变）
webpack自带的插件。主要是在开发环境使用。大大提高开发效率
https://www.webpackjs.com/guides/hot-module-replacement/
隐藏知识：css-loader 底层帮我们实现了热模块替换



3-11 babel 使用 （高级开发工程师需要深入学习研究）
两种配置方案：开发环境（业务代码） 和 内库环境（组件代码）
https://babeljs.io/setup#installation
原因：语法没有经过降级兼容处理，低版本浏览器会报错和不兼容。
使用babel实现框架源码，一步一步转化成浏览器源码
使用：参数非常多，使用也非常广（后期学习）
@babel/core: 打通与webpack的连接
@babel/preset-env: 帮助语法降级 部分es6 转化为es5 的翻译规则（没安装只是打通。语法并没有降级）
@babel/polyfill: 在index.js import中引入，补充es6的api （兼容带来的后果是打包后main.js变的很大）
(useBuiltIns参数使用只打包用到的新语法 缺点：会以全局变量的形式翻译)
优化处理：只打包用到的新语法
webpack.config.js 配置中的 module
module: {
  rules:[
    {
      test:/\.js$/,
      exclude:/node_modules/, // 排除node_modules 检测
      loader:"babel-loader",
      //配置打包后的内容
      options:{
        presets:[["@babel/preset-env",{
          targets:{
            chrome: '67', //项目打包运行在的版本
          },
          useBuiltIns: 'usage' //优化处理：只打包用到的新语法（帮我们做了个处理，不用自己引入 babel/polyfill 了,会自动引入）
        }]]
      }
    },
  ]
}
当只是写业务代码时候以上配置就够了。但是写内部库当时候，需要以下配置


插件：@babel/plugin-transform-runtime 相关的配置（有效避免@babel/polyfill全局污染的问题）
corejs 属性值为 2 的时候需要 npm 对应的包。
https://babel.docschina.org/docs/en/babel-plugin-transform-runtime

{
  "plugins": [["@babel/plugin-transform-runtime",{
    "corejs": 2,
    "helpers": true,
    "regenerator": true,
    "useESModules": false
  }]]
}

因为 babel 配置的 options 文件很大。我们可以抽离出来，
抽离过程：
1、在根目录下创建 .babelrc 文件
2、把 webpack.config.js 文件中 babel配置的 options（对象）代码放入
3、删除 webpack.config.js 文件中 babel 配置的 options
以上就完成了抽离。

**章节总结 webpack.config.js 参数说明

module.exports  = {
  //开发环境下进行打包，代码不会被压缩
  mode:'development',
  //打包后的代码错误和开发代码映射
  devtool:'cheap-module-eval-source-map',
  // 入口文件配置
  entry: {
    main:'./src/index.js',
    // 二次打包()
    // sub:'./src/index.js'
  },
  // 自动打开浏览器 启动服务器地址
  devServer:{
    //在dist目录下启动服务器
    contentBase: './dist',
    open:true,
    port: 8080,
    hot:true,
    hotOnly:true
    // proxy:{
    //   './api': 'http://locahost:1234'
    // }
  },
  //遇到不同文件和模块类型的时候，使用对应的规则打包
  module: {
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/, // 不检测node_modules
        loader:'babel-loader',
        // options
        // options:{
        //   // 业务代码配置 需要在index.js import "@babel/polyfill"
        //   // presets:[["@babel/preset-env",{
        //   //   targets:{
        //   //     chrome: '67', //项目打包运行在的版本
        //   //   },
        //   //   useBuiltIns: 'usage' //优化处理：只打包用到的新语法
        //   // }]]

        //   // 内库代码配置(polyfill会污染全局变量)
        //   "plugins": [["@babel/plugin-transform-runtime",{
        //     "corejs": 2,
        //     "helpers": true,
        //     "regenerator": true,
        //     "useESModules": false
        //   }]]
        // }
      },
      {
      test:/\.(jpg|png|gif)$/,
      use:{
        loader: 'url-loader',
        options:{
          // 配置打包名字和后缀
          // placeholder 暂位符
          name:'[name]_[hash].[ext]',
          // 可以配置成函数
          // name(file){
          //   console.log(file)
          //   if (this.mode === 'development') return '[path][name].[ext]'
          //   return '[hash].[ext]'
          // },
          outputPath:'./images', 
          limit: 2048
        }
      }
    },
    {
      test:/\.scss$/,
      use:[
        'style-loader',
        {
          loader:'css-loader',
          options:{
            importLoaders:2,
            // modules: true
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    },
    {
      test:/\.css$/,
      use:[
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test:/\.(eot|woff|ttf|svg)$/,
      use:{
        loader:'file-loader',
        options:{
          name:'[name]_[hash].[ext]',
          outputPath:'./font', 
        }
      },
    }
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({template:'./src/index.html'}),
    // new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()
  ],
  //打包对应的配置filename 的 name 对应 入口文件的名字
  output: {
    // publicPath:'/',
    // name 对应 entry 的 key 值
    filename: '[name].js',   // 打包生成文件名
    path: path.resolve(__dirname, 'dist')  //打包的路径（后跟绝对路径）
  },
} 


4-1 Tree Shaking
Tree Shaking: 把一个模块里用不到的东西都摇晃掉（用啥加载啥）
Tree Shaking 只支持 ES(import) Module（ 静态引入不支持 commonjs 的 require）
如何实现 Tree Shaking

webpack.config.js 导出对象中添加
 // 哪些导出的模块被导出了，会被打包
optimization:{
  usedExports: true
},
package.json 中添加 
"sideEffects": false, 

注意点：当我们在 index.js 中 import '@babel/polly-fill'的时候。
他并没有导出任何东西。而是在 window 对象上添加了 window.Promise 等属性，
这里我们需要做特殊的设置 这时候就用到了sideEffects 配置，把需要用的填入 "sideEffects": ["@babel/polly-fill"], 
这样 Tree Shaking 的规则就不会作用于 @babel/polly-fill 了

Tree Shaking 在 mode 为 production（线上环境） 的时候才会生效

4-2 development 和 Production 模式的区分打包
开发环境下使用 development 模式:
优势：代码不经过压缩处理，报错导航全面source-map更加明确，快速定位代码问题
线上环境使用 production
优势：代码经过了压缩处理。体积小 source-map更加简洁

配置线上环境和开发环境：
1、把webpack.config.js文件拆分 
开发：webpack.dev.js 
线上：webpack.prod.js 线上环境去掉的代码。服务器配置等代码

优化：开发和线上配置存在着许多等重复代码，我们需要做一些处理
创建 webpack.common.js 文件抽离代码
引入模块：npm i webpack-merge -D

4-3 webpack 和 code splitting (代码分割)

import _ from 'lodash';
当我们直接引用 lodash 库的时候，假设有1mb 业务代码有1mb
main.js 打包文件会很大，加载时间长，（加载2mb）
重新访问我们的页面的时候，又要加载2mb的文件，
解决思路把库挂载到全局 window上 打包入口文件添加 lodash.js 打包
这样两个js文件就会并行加载，可以提升加载效率
当业务逻辑发生变化时，只需要加载 main.js （lodash.js 在内存中有缓存）

以上是我们手动的去代码分割

没有 code splitting 对我们写代码没有啥影响。但是有了他，性能更好，用户体验更好
code splitting 跟 webpack 本身并没有啥关系， 但是 webpack 有一些插件，能帮我们实现代码分割

总结：
1、代码分割 跟 webpack 没有啥关系
2、webpack中实现代码分割两种方式：同步代码 和 异步代码
同步：只需要在 webpack.common.js 中配置
// 我要帮你去做代码分割了
optimization: {
  splitChunks:{
    chunks:'all'
  }
},
异步代码（import 引入的） 无需做任何配置，会自动做代码分割，放到配置中

4-5 SplitChunksPlugin 配置参数详解（1）
魔法注释的作用：打包出的文件名打包成自己想要的
魔法注释  /* webpackChunkName:"lodash" */
我们需要配置对应的babel插件：npm install --save-dev @babel/plugin-syntax-dynamic-import
async function newGetComponent(){
  const {default:_} = await import(/* webpackChunkName:"lodash" */ 'lodash');
  let ele = document.createElement('div');
  ele.innerHTML = _.join([1,2,3,4],'-')
  return ele
}
代码分割能识别 懒加载代码

4-8 打包分析 Preloading，Prefetching
官方：https://www.webpackjs.com/guides/code-splitting/#bundle-%E5%88%86%E6%9E%90-bundle-analysis-
github：www.github.com/webpack/analyse （使用说明）
如何配置：
1、在pachge.json 中 的scripts 配置
"grunt-dev": "webpack --profile --json > stats.json --config ./build/webpack.dev.js"
在打包的时候，把文件的描述放在 stats.json 里
2、执行 npm run grunt-dev
3、根目录得到 stats.json 文件
4、http://webpack.github.io/analyse/ 将文件放入网址解析

代码使用率的提高：
魔法注释
webpackPrefetch: true 核心代码加载后，页面空闲时候 再去加载 webpackPrefetch 的文件
webpackLoad: true  主的核心业务代码一起加载
import(/* webpackPrefetch: true */'lodash')
cmd + shift + p 控制台调用出查看利用率的控制台 (Coverage)
异步代码优化：异步加载实现，比如点击的时候，才去调用点击事件的代码
这也是 配置文件中 optimization 下 splitChunks 下 chunks 默认为 async
optimization: {
    splitChunks:{
      chunks: "all",

异步加载的优点：能实现页面快速加载，需要交互的操作只有交互的时候才加载
异步加载的缺点：因为交互的时候才加载，如果交互需要的内容被阻塞了，同样影响用户体验

解决思路：首屏代码加载完，空闲带宽去（偷偷）加载异步交互代码

小结：前端代码优化的时候 缓存 并不是最重要的点。而是代码覆盖率（代码如何分割加载加载）

4-9 css 代码分割
解决问题。css in js 
视频问题，官方已经没有这个插件了。我们需要自学，在官方查找对应插件
https://www.webpackjs.com/plugins/extract-text-webpack-plugin/
mini-css-extract-plugin :帮助我们完成 css 与 js 分离 
optimize-css-assets-webpack-plugin: 帮助完成css压缩（没安装的时候就压缩了，不知道是不是上面插件更新的原因）

小结：搞清楚 filename 和 chunkFilename 的区别
filename 入口文件命名
chunkFilename 被入口文件异步加载文件命名

4-10 webpack 与 浏览器缓存（Caching）
当我们当文件不变时，浏览器第二次加载会访问本地的缓存，变的时候会访问新的
优化结果：我们变的是业务逻辑，不变的是库
实现：打包上线配置 添加 哈希值

4-11 Shimming （垫片）
解决版本兼容问题
模块中：this指向自身。可以通过 imports-loader 改成 指向别的（修改 webpack 默认的行为）
ProvidePlugin: 全局配置
https://www.webpackjs.com/plugins/provide-plugin/