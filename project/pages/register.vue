<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form 
        ref="ruleForm" 
        :model="ruleForm" 
        :rules="rules" 
        label-width="100px" 
        class="demo-ruleForm"
        status-icon>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'; // 加密
export default {
  layout: "blank",
  components: {},
  data() {
    return {
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [{ 
          required: true, 
          type: 'string', 
          message: '请输入昵称', 
          trigger: 'blur' 
        }],
        email: [{ 
          required: true, 
          type: 'email', 
          message: '请输入邮箱', 
          trigger: 'blur' 
        }],
        code: [{ 
          required: true, 
          message: '请输入验证码', 
          trigger: 'blur' 
        }],
        pwd: [{ 
          required: true, 
          message: '请创建密码', 
          trigger: 'blur' 
        }],
        cpwd: [{ 
          required: true, 
          message: '请确认密码', 
          trigger: 'blur' 
        },{
          validator: (rule, value, callback) => {
            if(value === ""){
              callback(new Error("请再次输入密码"));
            }else if(value !== this.ruleForm.pwd){
              callback(new Error("两次输入密码不一致"));
            }else{
              callback();
            }
          },
          trigger: 'blur' 
        }]
      },
      error: '',// 注册提示
      statusMsg: ''// 验证码信息 
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 发送验证码
    sendMsg: async function(){
      if(this.timer){
        return;
      }
      const _self = this;
      let namePass;
      let emailPass;
      // 判断昵称和邮箱是否通过验证
      this.$refs['ruleForm'].validateField('name', async (valid) => {
        namePass = valid;
      });
      this.$refs['ruleForm'].validateField('email', async (valid) => {
        emailPass = valid;
      });
      if(!namePass && !emailPass){
        _self.statusMsg = '';
        // 发送请求
        const {status, data} = await this.$axios.post('/user/sendMsg', {
          username: encodeURIComponent(_self.ruleForm.name),// 转义中文
          email: _self.ruleForm.email
        });
        if(status === 200 && data && data.code === 0){
          let count = 60;
          _self.statusMsg = `验证码已发送,剩余${count}秒`;
          this.timer = setInterval(function(){
            _self.statusMsg = `验证码已发送,剩余${--count}秒`;
            if(count === 0){
              clearInterval(_self.timer);
              _self.timer = '';
              _self.statusMsg = '';
            }
          }, 1000);
        }else{
          this.statusMsg = data.message;
        }
      }
    },
    // 注册
    register: async function(){
      const _self = this;
      // 验证表单
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          // 发送注册请求
          const {status, data} = await _self.$axios.post('/user/signup', {
            username: encodeURIComponent(_self.ruleForm.name),
            email: _self.ruleForm.email,
            code: _self.ruleForm.code,
            pwd: CryptoJS.MD5(_self.ruleForm.pwd).toString() // 加密-非明文传输
          });
          if(status === 200){ // http状态码
            if (data && data.code === 0) { // 业务状态码
              _self.$message({
                message: '注册成功',
                type: 'success'
              });
              setTimeout(function(){
                location.href = '/login';
              }, 500);
            } else {
              _self.error = data.message
            }
          }else{
            _self.error = '注册失败';
          }
          setTimeout(function () {
            _self.error = ''
          }, 1500)
        }
      });
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
