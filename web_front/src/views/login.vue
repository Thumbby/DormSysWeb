<template>

  <div class="page" id="backgroundDiv">

    <div class="title-container">
      <h1 class="header" style="color:white">TJ宿务管理系统</h1>
    </div>

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>登录</h2>
      </el-row>
      <el-form label-width="0" :model="loginForm" ref="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="loginForm.userID" placeholder="学号">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="loginForm.password" placeholder="账号密码" show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item class="login">
          <el-button type="primary" class="form-button" v-on:click="login('loginForm')" round id="login">登录</el-button>
        </el-form-item>

        <el-form-item class="register">
          <el-button type="info" size="mini" class="form-button" v-on:click="toRegister" round id="register">注册账号</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
    return {
      loginForm:{
        userID:'',
        password:'',
      },
      loginFormRules:{
        userID: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          {  min:7, max: 7, message: '请输入正确的学号', trigger: 'blur' }
          ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/Login",{
            "userID": Number(this.loginForm.userID),
            "password": this.loginForm.password
          })
          .then(res=>{
            if(res.data.success==1){
              window.alert("login succeed")
              localStorage.setItem('token',res.data.token)
              if(res.data.access==1){
                localStorage.setItem('access','admin')
                location="/#/admin_index"
              }
              else{
                localStorage.setItem('access','student')
                var userInfo={
                  userID:this.loginForm.userID,
                  userName:res.data.userName
                }
                localStorage.setItem('userInfo',JSON.stringify(userInfo))
                location="/#/student_index"
              }
            }
            else{
              window.alert(res.data.msg)
            }
          })
        }
      });
    },
    toRegister:function() {
      location = "/#/register";
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