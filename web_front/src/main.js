import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import App from './App.vue'

import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('token')//存储token
  if (to.meta.title) {
    document.title = to.meta.title;//路由中设置页面标题
    if (token||to.meta.nacy=='true') {//to.meta.nacy=='true'这里面的nacy就是自己在路由中设置的//不参与token验证的页面参数变量这个变量可以自己定义
      next()
    } else {
      if (to.path == '/login') {
        next()
      } else {
        next('/login')
      }
    }
   }
   else{
     next('/login')
   }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
