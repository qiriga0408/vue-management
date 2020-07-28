import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import './util/reset.css'

//导入字体图标
import './assets/fonts/iconfont.css';


import axios from './util/http'
// //配置请求的根路径
// axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$http=axios

import './util/elementUI'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
