import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import userModel from '../../dbs/models/user';

passport.use(new LocalStrategy(async function(username, password, done){
  const result = await userModel.findOne({
    username
  });
  if(result != null){
    if(result.pwd === password){
      done(null, result);
    }else{
      done(null, false, '密码错误');
    }
  }else{
    done(null, false, '用户不存在');
  }
}));

// 用户信息需要保留在session存储中(利用cookie或者服务端存储)，因此需要定义序列化和反序列的操作
// 在调用 ctx.login() 时会触发序列化操作
// 在请求时，session中如果存在 "passport":{"user":"xxx"}时会触发定义的反序列化操作
passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(async function (user, done) {
  return done(null, user);
})

export default passport;