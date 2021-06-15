<template>

  <el-aside class="sidebar">

    <el-menu router :default-active="activeIndex">

      <el-menu-item>
        <i class="el-icon-menu"></i>
        <a slot="title">首页</a>
      </el-menu-item>

    </el-menu>
  </el-aside>

</template>

<script>
export default {
  name: 'Sidebar',
  computed:{
  },
  data () {
    return {
      // 初始化选中tab格
      activeIndex: "/"
    }
  },
  methods:{
  }
}
</script>

<style>
.sidebar {
    height: 100vh;
    width: auto !important;
}

.el-menu {
    height: 100vh;
    background-color: #304156;
    transition: none;
    overflow: hidden;
}

.submenu {
    background-color: #304156;
}

.submenu :hover {
    background-color: rgb(38, 52, 69);
}

.el-menu-item {
    background-color: #304156;
    text-align: left;
    padding-left: 20px;
    padding-right: 50px;
}

.el-menu-item:hover {
    background-color: rgb(38, 52, 69);
}

.el-menu-item.is-active {
    background-color: #304156;
}

.el-menu-item a {
    color: rgb(191, 203, 217);
    text-decoration: none;
}

.el-menu-item.is-active span {
    color: #409EFF;
}
.el-submenu__title {
    color: rgb(191, 203, 217);
}
</style>