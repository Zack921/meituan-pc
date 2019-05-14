// 主页其他接口

import Router from 'koa-router';
import Poi from '../dbs/models/poi';
import Menu from '../dbs/models/menu';
import ResultsByKeywords from '../dbs/models/resultsByKeywords';

const router = new Router({
  prefix: '/home'
});

// 获取热门搜索
router.get('/hotSearch', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city // ctx.query.city: store/index.js pass parameter
  try {
    const result = await Poi
      .find({
        city,
        type: ctx.query.type || '丽人'
      })
      .limit(10)
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
});

// 根据用户输入搜索商家或地点
router.get('/top', async (ctx) => {
  try {
    const top = await Poi.find({
      'name': new RegExp(ctx.query.input), // ctx.query.input & ctx.query.city: searchbar.vue pass parameter
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
});

// 获取左侧菜单数据
router.get('/menu', async (ctx) => {
  try {
    const result = await Menu.findOne({});
    ctx.body = {
      code: 0,
      result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result
    }
  }
});

// "有格调"界面
// [postman](http://localhost:3000/search/resultsByKeywords)
router.get('/resultsByKeywords', async(ctx) => {
  try {
    const result = await ResultsByKeywords.findOne()
    ctx.body = {
      count: result.count,
      pois: result.pois
    }
  } catch (e) {
    ctx.body = {
      count: 0,
      pois: []
    }
  }
})

export default router;
