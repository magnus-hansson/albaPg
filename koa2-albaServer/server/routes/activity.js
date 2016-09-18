import 'babel-polyfill'
import Activity from '../models/activity'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'activity'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

// GET /api/city
router.get('/', async(ctx) => {

  ctx.body = await Activity.find();
})
  

// POST /api/city
router.post('/', async(ctx) => {
  try {
    const activity = await new Activity(ctx.request.body).save()
  
    ctx.body = activity
  } catch (err) {
    ctx.throw(422)
  }
})

// GET /api/city/id
router.get('/:id', async(ctx) => {
  try {
    const activity = await Activity.findById(ctx.params.id)
    if (!activity) {
      ctx.throw(404)
    }
    ctx.body = activity
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

// PUT /api/city/id
router.put('/:id', async(ctx) => {
  try {
    const activity = await Activity.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!activity) {
      ctx.throw(404)
    }
    ctx.body = activity
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

// DELETE /api/city/id
router.delete('/:id', async(ctx) => {
  try {
    const activity = await Activity.findByIdAndRemove(ctx.params.id)
    if (!activity) {
      ctx.throw(404)
    }
    ctx.body = activity
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
