import 'babel-polyfill'
import Athlete from '../models/athlete'
import Activity from '../models/activity'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'athlete'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

// GET /api/city
router.get('/', async(ctx) => {
  //app.io.broadcast('inserted', { 'add': 456, 'del': 12312 });
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
    let athlete = await Athlete.findById(ctx.params.id);
    athlete = athlete.toObject();
   
    //get what event this athlete is already signed up for
    let activity = await Activity.find({athletes: ctx.params.id});

    //activity = activity.toObject();
    athlete.recentactivity = activity[0]._id;
    console.log('user signed up to ', activity[0]._id);
    if (!athlete) {
      ctx.throw(404)
    }
    
    ctx.body = athlete;
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
