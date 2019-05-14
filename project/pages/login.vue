<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo"/>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips"><i/>{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"/>
        <el-input
          v-model="password"
          prefix-icon="password"
          type="password"/>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button
          class="btn-login"
          type="success"
          size="mini"
          @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: "blank",
  components: {},
  data() {
    return {
      error: '',// 登录提示
      username: '',
      password: '',
      checked: ''// 是否选择7天内自动登录
    }
  },
  computed: {},
  watch: {},
  methods: {
    login: async function(){
      let _self=this;
      const {status, data} = await this.$axios.post('/user/login',{
        username: window.encodeURIComponent(_self.username),
        password: CryptoJS.MD5(_self.password).toString()
      });
      if(status === 200){
        if(data && data.code === 0){
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          setTimeout(function(){
            location.href = '/';
          }, 500);
        }else{
          _self.error = data.message;
        }
      }
      setTimeout(function () {
        _self.error = ''
      }, 1500);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/login/index.scss";
</style>
