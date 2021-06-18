<template>
    <div class="second_navbar">
    <el-menu
        router
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/student/myDorm">
            <a slot="title">我的寝室</a>
        </el-menu-item>
        <el-menu-item index="/student/myApplication">
          <a slot="title">我的申请</a>
        </el-menu-item>
        <el-menu-item index="/student/community">
            <a slot="title">TJ寝室社区</a>
        </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
 export default {
name: 'SecondNavBar',
    data() {
      return {
        activeIndex: '/'
      };
    },
    methods: {
    }
  }
</script>

<style scoped>
.el-menu{
    height:auto
}
</style>