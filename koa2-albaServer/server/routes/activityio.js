import 'babel-polyfill'
import Activity from '../models/activity'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'activity'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

module.exports =  function (app) {
  router.get('/', async (ctx) => {
    app.io.broadcast('inserted', { 'add': 123, 'del': 1233 });
    ctx.body = await Activity.find();
  })
}

