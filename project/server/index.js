import Koa from 'koa';
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
import bodyParser from 'koa-bodyparser';
// import json from 'koa-json'// 格式化json
import mongoose from 'mongoose';
import dbConfig from './dbs/config';
import userInterface from './interface/user';
import cityInterface from './interface/city';
import homeInterface from './interface/home';
import productsInterface from './interface/products';
import detailInterface from './interface/detail';
import cartInterface from './interface/cart';
import orderInterface from './interface/order';
import session from 'koa-generic-session'; // 操作session的中间件
import redisStore from 'koa-redis';
import passport from 'koa-passport';

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // 连接mongoose数据库
  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
  });
  // 将session存储到redis中
  app.keys = ['mt', 'keykeys']; // 给session加密的密钥
  app.use(session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new redisStore()
  }));
  app.use(passport.initialize());// 为当前context添加passport字段，便于后面的使用
  app.use(passport.session());// passport自带的策略，用于从session中提取用户信息

  app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
  }));
  // app.use(json());

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // router
  app.use(userInterface.routes(), userInterface.allowedMethods());
  app.use(cityInterface.routes(), cityInterface.allowedMethods());
  app.use(homeInterface.routes(), homeInterface.allowedMethods());
  app.use(productsInterface.routes(), productsInterface.allowedMethods());
  app.use(detailInterface.routes(), detailInterface.allowedMethods());
  app.use(cartInterface.routes(), cartInterface.allowedMethods());
  app.use(orderInterface.routes(), orderInterface.allowedMethods());

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
