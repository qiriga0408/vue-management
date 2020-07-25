import Vue from 'vue'
import VueRouter from 'vue-router'
const Home =()=>import('@/views/Home.vue')
const About =()=>import('@/views/About.vue')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path:'/',
    redirect:'/Home'
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:About
  }
]

const router = new VueRouter({
  routes
})

export default router
