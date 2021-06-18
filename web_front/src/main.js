import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import Moment from 'moment'
import App from './App.vue'

import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$moment = Moment
axios.defaults.baseURL="/api"

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('token')//存储token
  var access = localStorage.getItem('access')//存储当前用户身份
  if (to.meta.title) {
    document.title = to.meta.title;//路由中设置页面标题
    if (token) {//to.meta.nacy=='true'这里面的nacy就是自己在路由中设置的//不参与token验证的页面参数变量这个变量可以自己定义
      if(to.meta.title=='管理员首页'&&access!='admin'){
        window.alert("The present user don't have a admin access")
        next('/login')
      }
      else if(to.meta.title == '学生首页'&&access!='student'){
        window.alert("The account is not a student account")
        next('/login')
      }
      else{
        next()
      }
    }
    else if(to.meta.nacy=='true'){
      next()
    }
    else {
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
