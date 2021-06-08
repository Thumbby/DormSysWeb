import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login'

Vue.use(Router)


const routes = [
    {
        path:"/login",
        name:"login",
        component: Login,
        meta:{
            title:'登录',
            nacy:'true'
        }
    }
]

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router