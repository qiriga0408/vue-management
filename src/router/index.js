import Vue from 'vue'
import VueRouter from 'vue-router'
const Home =()=>import('@/views/Home.vue')
const Login =()=>import('@/components/Login')
const Wecome =()=>import('@/components/Wecome')
const Users =()=>import('@/views/user/Users')
const Rights =()=>import('@/views/power/Rights')
const Roles =()=>import('@/views/power/Roles')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect:'/Wecome',
    children:[
      {
        path:'/Wecome',
        name: 'Wecome',
        component: Wecome
      } ,
      {
        path:'/users',
        name:'Users',
        component:Users
      },
      {
        path:'/rights',
        name:'Rights',
        component:Rights
      },
      {
        path:'/roles',
        name:'Roles',
        component:Roles
      }
    ]
  },
  {
    path:'/',
    redirect:'/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
 
]
const router = new VueRouter({
  routes
})

// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页，直接放行
  if (to.path === '/Login') return next()
  // 从 sessionStorage 中获取到 保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转到登录页
  if (!tokenStr) return next('/Login')
    next()
  })



export default router
