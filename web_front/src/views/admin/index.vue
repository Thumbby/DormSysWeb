<template>
<div>
    <NavBar/>
    <el-container class="home-container">
        <SideBar/>
        <el-main>
          <div v-show="routeName == '首页'" class="home_container">
          </div>    
          <router-view></router-view>
        </el-main>
    </el-container>
</div>
</template>

<script>
import SideBar from "@/components/admin/SideBar"
import NavBar from "@/components/admin/NavBar"

export default{
name:"admin_index",
computed:{
    routeName(){
        const route = this.$route
        const { meta} = route
        return meta.name
    }
},
components:{
    SideBar,
    NavBar,
},
data(){
    return{

    }
},
methods:{
    
}
}
</script>
