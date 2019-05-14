// 定义城市信息后台接口路由

import Router from 'koa-router';
import positionModel from '../dbs/models/position';

const router = new Router({
  prefix: '/city'
});

// 获取用户所在城市-根据ip解析
router.get('/getPosition', async (ctx) => {
  const {province, city} = await positionModel.findOne();
  ctx.body = {
    province,
    city,
    code: 0
  }
});

// 获取热门城市
router.get('/getHotCities', async (ctx) => {
  ctx.body = {
    cities: [{
      province: "浙江省",
      name: "杭州市",
      id: "330100"
    },{
      province: "江苏省",
      name: "南京市",
      id: "320100"
    },{
      province: "上海市",
      name: "上海市",
      id: "310100"
    }],
    code: 0
  };
});

export default router;