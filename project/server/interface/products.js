// 定义产品列表页后台接口路由

import Router from 'koa-router';
import categoryModel from '../dbs/models/category';

const router = new Router({
  prefix: '/products'
});

router.get('/getCategory', async (ctx) => {
  const result = await categoryModel.findOne({
    city: ctx.query.city
  })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
});

export default router;