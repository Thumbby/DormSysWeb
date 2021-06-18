<template>

    <div class="navbar">

      <i class="el-icon-s-platform" id="switch"></i>
      
      <p>{{routeName}}</p>

      <div class="navbar-item-blank-center">
          <h2 id="main_title">TJ宿务管理系统(管理员)</h2>
      </div>

      <el-dropdown>
        <span class="dropdown-link">
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout"><a >登出</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

</template>

<script>
export default {
  name: 'Navbar',
  computed:{
    routeName(){
        const route = this.$route
        const { meta} = route
        return meta.name
    }
  },
  data () {
    return {
    }
  },
  methods:{
    // 退出登录逻辑
    logout:function(){
      localStorage.removeItem("token");
        location = "/#/login";
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/navbar.css"></style>