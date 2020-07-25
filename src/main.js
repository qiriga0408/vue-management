import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import './util/reset.css'

import Axios from 'axios'
Vue.prototype.$axios=Axios

import './util/elementUI'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
