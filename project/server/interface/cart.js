// 定义购物车后台接口路由

import Router from 'koa-router';
import Cart from '../dbs/models/carts';
import md5 from 'crypto-js/md5' // encryption

const router = new Router({
  prefix: '/cart'
});

router.post('/createCart', async (ctx) => {
  if(ctx.isAuthenticated()){ // 鉴权通过
    const time = new Date();
    const cartNo = md5(Math.random() * 1000 + time).toString();
    const { id, detail } = ctx.request.body;
    let newCart = new Cart({
      id,
      cartNo,
      user: ctx.session.passport.user.username,
      time: time.getTime(),
      detail
    });
    await newCart.save().catch((error) => {
      ctx.body = {
        code: -1,
        message: '创建购物车失败'
      };
      return;
    });
    ctx.body = {
      code: 0,
      message: 'ok',
      cartNo
    };
  }else{
    ctx.body = {
      code: -1,
      message: '请登录'
    }
  }
});

router.post('/getCart', async (ctx) => {
  if(ctx.isAuthenticated()){ // 鉴权通过
    const { id } = ctx.request.body;
    try {
      const result = await Cart.findOne({ cartNo: id })
      ctx.body = {
        code: 0,
        data: result.detail ? result.detail : {}
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        data: {}
      }
    }
  }else{
    ctx.body = {
      code: -1,
      message: '请登录'
    }
  }
});

export default router;