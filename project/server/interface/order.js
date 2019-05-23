// 定义订单后台接口路由

import Router from 'koa-router';
import Cart from '../dbs/models/carts';
import Order from '../dbs/models/orders';
import md5 from 'crypto-js/md5' // encryption

const router = new Router({
  prefix: '/order'
});

router.post('/createOrder', async (ctx) => {
  if(ctx.isAuthenticated()){ // 鉴权通过
    const {id:cartNo} = ctx.request.body;
    const cart = await Cart.findOne({
      cartNo
    }).catch(function(){
      return ctx.body = { code: -1 };
    });
    if(cart){
      const time = new Date();
      const id = md5(Math.random().toString().slice(3,9) + time).toString();
      let newOrder = new Order({
        id,
        time: time.getTime(),
        user: ctx.session.passport.user.username,
        name: cart.detail[0].name,
        count: cart.detail[0].num,
        total: cart.detail[0].num * cart.detail[0].price,
        status: 0,
        img: cart.detail[0].img,
      });
      await newOrder.save().catch((error) => {
        ctx.body = {
          code: -1,
          message: '创建订单失败'
        };
        return;
      });
      await cart.remove();
      ctx.body = {
        code: 0,
        message: 'ok',
        orderId: id
      };
    }
  }else{
    ctx.body = {
      code: -1,
      message: '请登录'
    }
  }
});

router.post('/getOrder', async (ctx) => {
  if(ctx.isAuthenticated()){ // 鉴权通过
    const orders = await Order.find({
      user: ctx.session.passport.user.username
    }).catch(function(){
      return ctx.body = { code: -1 };
    });
    ctx.body = {
      code: 0,
      orders
    };
  }else{
    ctx.body = {
      code: -1,
      message: '请登录'
    }
  }
});

export default router;