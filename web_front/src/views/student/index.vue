<template>
<div>
    <NavBar/>
    <SecondNavBar/>
    <el-container class="home-container">
        <el-main>
          <div v-show="routeName == '首页'" class="home_container">
          </div>    
          <router-view></router-view>
        </el-main>
    </el-container>
</div>
</template>

<script>
import NavBar from "@/components/student/NavBar"
import SecondNavBar from '@/components/student/SecondNavBar'

export default{
    name:"student_index",
    computed:{
        routeName(){
            const route = this.$route
            const { meta} = route
            return meta.name
        }
    },
    components:{
        NavBar,
        SecondNavBar
    },
    data(){
        return{}
    },
    methods:{}
}
</script>
