import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Register from '@/views/register';
import AdminPage from '@/views/admin/index';

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
    },
    {
        path:"/register",
        name:"register",
        component:Register,
        meta:{
            title:'注册',
            nacy:true
        }
    },
    //管理员模块
    {
        path:"/admin_index",
        name:"admin_index",
        component:AdminPage,
        meta:{
            title:'管理员首页',
            nacy:false,
        }
    }
]

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router