export default {
  dbs: 'mongodb://127.0.0.1:27017/meituan',
  smtp: {
    get user(){ // 只读属性
      return '407473490@qq.com';
    },
    get pass(){
      return 'jecalnffarhacbbg';
    },
    get code(){ // 生成验证码
      return function(){
        return Math.random().toString().slice(2,6);
      }
    },
    get expire(){ // 生成验证码有效期
      return function(){
        return new Date().getTime() + 1000 * 60;
      }
    }
  }
}