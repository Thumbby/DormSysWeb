import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Register from '@/views/register';
//管理员模块
import AdminPage from '@/views/admin/index';
import StudentList from '@/views/admin/studentList';
import DormList from '@/views/admin/dormList';
import RepairList from '@/views/admin/repairList';
import ChangeApplicationList from '@/views/admin/changDorm';
//学生模块
import StudentPage from '@/views/student/index';
import myDorm from '@/views/student/myDorm';
import myApplication from '@/views/student/myApplication';
import Community from '@/views/student/community';

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
        },
        children:[
            {
                path:"/admin/student_list",
                component:StudentList,
                meta:{
                    title:'学生列表',
                    nacy:false,
                }
            },
            {
                path:"/admin/dorm_list",
                component:DormList,
                meta:{
                    title:'寝室列表',
                    nacy:false,
                }
            },
            {
                path:"/admin/repair_list",
                component:RepairList,
                meta:{
                    title:'保修请求',
                    nacy:false,
                }
            },
            {
                path:"/admin/change_dorm_list",
                component:ChangeApplicationList,
                meta:{
                    title:'换寝请求',
                    nacy:false,
                }
            }
        ]
    },
    //学生模块
    {
        path:'/student_index',
        name:'student_index',
        component:StudentPage,
        meta:{
            title:'学生首页',
            nacy:false,
        },
        children:[
            {
                path:'/student/myDorm',
                component:myDorm,
                meta:{
                    title:'我的寝室',
                    nacy:false
                }
            },
            {
                path:'/student/myApplication',
                component:myApplication,
                meta:{
                    title:'我的申请',
                    nacy:false
                }
            },
            {
                path:'/student/community',
                component:Community,
                meta:{
                    title:'TJ社区',
                    nacy:false
                }
            }
        ]
    }
]

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router