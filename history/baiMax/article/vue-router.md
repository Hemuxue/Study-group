关于 vue-router
this.$route  路由信息
this.$router 路由方法
基本配置：
关于路由配置
{
    path: '/index',  // 基础路径
    component: Layout,
    redirect: '/merchant',  //重定向到 merchant 页面
    // 子路由的path 如果不配置/ 则浏览器会显示 /index/merchant
    children: [{
      path: 'merchant',  or '/merchant'
      name: 'merchant',
      // component: () => import('@/views/merchant/index'),
      // 路由信息
      meta: {
        roles: [], // 权限用户
        title: '商户管理',
        icon: 'dashboard'
      }
    }]
  },

关于路由加载
需要点击跳转
<router-link to='/' tag='div'>
关于to的写法 直接路径，以及动态:to="{name:''}" or :to="{path:''}"
关于显示路由
<router-view />
切换主路由默认展示某个子路由，需要用到 redirect 重定向属性
全局路由切换class匹配：
完全匹配：active-exact
局部匹配：active

编程式跳转：
点击事件跳转；
[a,b,c,d]
当前路由为 d
this.$router.push(e) 像数组push一样 往之前的路由添加下一个路由 [a,b,c,d,e]
this.$router.replace(e)  替换当前路由 [a,b,c,e]
this.$router.go(number) -2 前往上上一个路由 b  1 去下一个路由 无 0 当前路由 d
tips: this.$router.go(0) 会刷新页面

路由守卫：路径将要被改变所要执行的函数
不能访问this的守卫 可以在 next 回调中访问
全局路由守卫：
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
router.afterEach((to, from) => {
  // ...
})

组件路由守卫
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
beforeRouteUpdate 和  beforeRouteLeave 的区别 组件是否复用
路由独享的守卫
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})

动态路由：
不能用path 用name 然后params 携带信息
通过 this.$route  获取路由信息

同一组件切换路由，钩子函数不执行，不能更新数据，需要对应的路由钩子
beforeRouteUpdate(to, from, next){}

路由守卫执行顺序：
全局-独享-组件


完整的导航解析流程
1、导航被触发。
2、在失活的组件里调用离开守卫。
3、调用全局的 beforeEach 守卫。
4、在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5、在路由配置里调用 beforeEnter。
6、解析异步路由组件。
7、在被激活的组件里调用 beforeRouteEnter。
8、调用全局的 beforeResolve 守卫 (2.5+)。
9、导航被确认。
10、调用全局的 afterEach 钩子。
11、触发 DOM 更新。
12、用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

路由元信息：
权限校验
