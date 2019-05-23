// 定义城市信息后台接口路由

import Router from 'koa-router';
import positionModel from '../dbs/models/position';
import provinceModel from '../dbs/models/province';
import cityModel from '../dbs/models/city';

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

// 获取所有省
router.get('/getProvinces', async (ctx) => {
  const result = await provinceModel.find({});
  ctx.body = {
    provinces: result.map(item => {
      return {
        id: item.id,
        value: item.value
      };
    }),
    code: 0
  };
});

// 查询省下所有城市
router.get('/getCitiesByProvince', async (ctx) => {
  const result = await cityModel.findOne({
    id: ctx.query.id
  });
  ctx.body = {
    cities: result.value,
    code: 0
  };
});

// 获取所有城市
router.get('/getAllCities', async (ctx) => {
  const result = await cityModel.find({});
  ctx.body = {
    cities: result.map(item => {
      return {
        value: item.value
      }
    }),
    code: 0
  };
});

// 获取热门城市
router.get('/hotCity', async ctx => {
  const result = await cityModel.find() // bug! Did not return the full city name
  ctx.body = {
    city: result.map(item => {
      const value = item.value
      const valueArray = [...value]
      return {
        value: valueArray
      }
    })
  }
})

export default router;