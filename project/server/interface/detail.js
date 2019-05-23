// 定义产品详情页后台接口路由

import Router from 'koa-router';
import Products from '../dbs/models/products';

const router = new Router({
  prefix: '/detail'
});

router.get('/getPdDetail', async (ctx) => {
  const city = ctx.query.city || '北京'
  try {
    const result = await Products.findOne({ city })
    ctx.body = {
      product: result.product,
      more: ctx.isAuthenticated() ? result.more : [],
      login: ctx.isAuthenticated(), // ctx.isAuthenticated(): Is it logged in??
    }
  } catch (e) {
    ctx.body = {
      product: {},
      more: [],
      login: false,
    }
  }
});

export default router;