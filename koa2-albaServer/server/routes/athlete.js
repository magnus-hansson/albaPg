import 'babel-polyfill'
import Athlete from '../models/athlete'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'athlete'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

// GET /api/city
router.get('/', async(ctx) => {
  ctx.body = await Athlete.find();
})
  

// POST /api/city
router.post('/', async(ctx) => {
  try {
    const athlete = await new Athlete(ctx.request.body).save()
  
    ctx.body = athlete
  } catch (err) {
    ctx.throw(422)
  }
})

// GET /api/city/id
router.get('/:id', async(ctx) => {
  try {
    const athlete = await Athlete.findById(ctx.params.id)
    if (!athlete) {
      ctx.throw(404)
    }
    ctx.body = athlete
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
    const athlete = await Athlete.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!athlete) {
      ctx.throw(404)
    }
    ctx.body = athlete
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
    const athlete = await Athlete.findByIdAndRemove(ctx.params.id)
    if (!athlete) {
      ctx.throw(404)
    }
    ctx.body = athlete
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
})

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
