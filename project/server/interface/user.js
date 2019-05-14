// 定义用户信息后台接口路由

import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import Config from '../dbs/config';
import userModel from '../dbs/models/user';
import passport from './utils/passport';

const router = new Router({
  prefix: '/user'
});

// 新建客户端连接本地redis-按默认配置
const rStore = new Redis().client;

// 发送验证码
router.post('/sendMsg', async (ctx) => {
  const {username, email} = ctx.request.body;
  const saveExpire = await rStore.hget(`nodemail:${username}`, 'expire');
  if(saveExpire && saveExpire - new Date().getTime() > 0){
    ctx.body = {
      code: -1,
      message: '验证过于频繁，每分钟一次'
    };
    return console.log('验证码未过期');
  }
  const udata = {
    name: username,
    email: email,
    code: Config.smtp.code(),
    expire: Config.smtp.expire()
  };
  // 发邮件
  const transporter = nodeMailer.createTransport({
    service: 'qq',
    port: 465,
    auth: {
      user: Config.smtp.user,
      pass: Config.smtp.pass
    }
  });
  const mailOptions = {
    from: `“认证邮件”<${Config.smtp.user}>`,
    to: email,
    subject: '《vue美团全栈》注册码',
    html: `您的邀请码是${udata.code}`
  }
  await transporter.sendMail(mailOptions, function(err, info){
    if(err){
      return console.log(err);
    }
    // 将用户和验证码的映射存在redis中
    rStore.hmset(`nodemail:${udata.name}`, 'code', udata.code, 'expire', udata.expire, 'email', udata.email);
  });
  ctx.body = {
    code: 0,
    message: '验证码已发送，有效期一分钟'
  };
});

// 注册
router.post('/signup', async (ctx) => {
  const {username, pwd, code, email} = ctx.request.body;
  // 检测用户是否已存在
  const result = await userModel.find({
    username
  })
  if(result.length){
    ctx.body = {
      code: -1,
      message: '用户已存在，请前往登录'
    };
    return;
  }
  // 检测验证码正确性
  const saveCode = await rStore.hget(`nodemail:${username}`, 'code');
  const saveExpire = await rStore.hget(`nodemail:${username}`, 'expire');
  if(saveExpire - new Date().getTime() < 0){
    ctx.body = {
      code: -1,
      message: '验证码已过期，请重新发送'
    };
    return;
  }
  if(saveCode !== code){
    ctx.body = {
      code: -1,
      message: '验证码错误'
    };
    return;
  }else{
    // 写入数据库
    const person = new userModel({
      username,
      pwd,
      email 
    });
    await person.save().catch((error) => {
      ctx.body = {
        code: -1,
        message: '注册失败'
      };
      return;
    });
    ctx.body = {
      code: 0,
      message: '注册成功'
    };
  }
});

// 登录 - 初始写法
// router.post('/login', async (ctx) => {
//   console.log(ctx.request.body);
//   const {username, pwd} = ctx.request.body;
//   // 验证
//   const result = await userModel.find({
//     username,
//     pwd
//   })
//   if(result.length){
//     // 写入cookie
//     ctx.cookies.set('username', username, {
//       maxAge: 30 * 60 * 1000,
//       // httpOnly: false,  // 是否只用于http请求中获取
//     });
//     ctx.body = {
//       code: 0,
//       message: 'ok'
//     };
//   }else{
//     ctx.body = {
//       code: -1,
//       message: '帐户或密码错误'
//     };
//   }
// })
// 登录 - 利用passport
router.post('/login', async (ctx, next) => {
  // 调用策略作验证
  return passport.authenticate('local', function(err, user, info, status) {
    if(err){
      ctx.body = {
        code: -1,
        message: err
      };
    }else{
      if(user){ // user是策略定义中查询完数据库的结果
        ctx.login(user);// 把序列化的结果存到req.session['passport']
        ctx.body = {
          code: 0,
          message: '登录成功'
        };
      }else{
        ctx.body = {
          code: -1,
          message: info
        };
      }
    }
  })(ctx, next);
})

// 退出登录
router.get('/exit', async (ctx) => {
  await ctx.logout();// 直接删除session里passport里的user字段
  if(!ctx.isAuthenticated()){
    ctx.body = {
      code: 0,
      message: '退出成功'
    };
  }else{
    ctx.body = {
      code: -1,
      message: '退出失败'
    };
  } 
})

// 获取当前登录用户信息 - 初始写法
// router.get('/getUser', async (ctx) => {
//   console.log(ctx.cookies.get('username'));
//   ctx.body = {
//     code: 0,
//     message: 'ok',
//     username: ctx.cookies.get('username')
//   };
// })
// 获取当前登录用户信息 - 利用passport
router.get('/getUser', async (ctx) => {
  if(ctx.isAuthenticated()){ // 鉴权通过
    ctx.body = {
      code: 0,
      message: 'ok',
      username: ctx.session.passport.user.username,// 自动触发反序列化函数
      email: ctx.session.passport.user.email
    };
  }else{
    ctx.body = {
      code: -1,
      message: '鉴权失败'
    };
  }
})

export default router;