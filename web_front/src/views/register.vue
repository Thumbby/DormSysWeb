<template>

  <div class="page" id="backgroundDiv">

    <div class="title-container">
      <h1 class="header" style="color:white">TJ宿务管理系统</h1>
    </div>

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>注册</h2>
      </el-row>
      <el-form label-width="0" :model="registerForm" ref="registerForm" :rules="registerFormRules">
        <el-form-item prop="username">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="registerForm.userName" placeholder="用户名">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="registerForm.password" placeholder="账号密码" show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item class="login">
          <el-button type="primary" class="form-button" v-on:click="register('registerForm')" round id="register">注册</el-button>
        </el-form-item>

        <el-form-item class="register">
          <el-button type="info" size="mini" class="form-button" v-on:click="toLogin" round id="login">去登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "Register",
  data(){
    return {
      registerForm:{
        userName:'',
        password:'',
      },
      registerFormRules:{
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    register(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/Register",{
            "userName": this.registerForm.userName,
            "password": this.registerForm.password
          })
          .then(res=>{
            if(res.data.success==1){
              window.alert("Register succeed")
              location = "/#/login";
            }
            else{
                window.alert(res.data.msg)
            }
          })
        }
      });
    },
    toLogin:function() {
      location = "/#/login";
    },
  }
}
</script>

<style scoped>

.page {
  width: 100%;
}

#backgroundDiv {
    background: url('../assets/background.jpg');
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
}

.box {
  width: 30%;
  margin-top: 50px;
  margin-left: 35%;
}

.header {
  text-align: center;
  margin-top: 80px;
}

.title {
  text-align: center;
}

.form-input {
  width: 80%;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-goods {
  font-size: 25px;
  margin: 0 20px;
}

.login {
  text-align: center;
}

.register {
  text-align: center;
}

</style>