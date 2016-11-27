import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import routing from './routes/'
import cors from 'kcors';
import { port, connexionString } from './config'
import Router from 'koa-router'
import Activity from './models/activity'
import { baseApi } from './config'
const iorouter = new Router();
const IO = require('koa-socket')
mongoose.connect(connexionString)
mongoose.connection.on('error', console.error)

// Create Koa Application
const app = new Koa()
const io = new IO()
app
  .use(cors())
  .use(logger())
  .use(bodyParser())

io.attach(app)
routing(app)

//This is in index becuase I do not know how to get a grip on socket.io inside routes. Maybe we should switch this out to an eventEmitter thingamabob
const api = 'signup'
iorouter.prefix(`/${baseApi}/${api}`)
iorouter.put('/:id/:oldid', async (ctx) => {

  try {
    console.log('find new id', ctx.params.id);
    console.log('find old id', ctx.params.oldid);
    let athlete = ctx.request.body.athletes[0];
    let oldId = ctx.params.oldid;
    let newId = ctx.params.id;
    //1. If old activity exist. Find it and remove this athlete from it

    //let oldactivity =  await Activity.findByIdAndUpdate(ctx.params.id, {athletes:athletes})
    //   console.log('pulling athelete', athlete, ' from  activity ', oldId)  
    //   await Activity.update({ _id: oldId },{$pull: {athletes: athlete}});
    if (ctx.params.oldid == 'undefined') {
      console.log('not null')
    } else {
      console.log('null')
    }


    const act1 = await Activity.findById(ctx.params.id);
    let athletes = act1.athletes.concat(ctx.request.body.athletes);
    console.log('tmp', athletes);

    const activity = await Activity.findByIdAndUpdate(ctx.params.id, { athletes: athletes });
    if (!activity) {
      ctx.throw(404)
    }

    app.io.broadcast('inserted', { 'add': ctx.params.id, 'del': 12312 });
    ctx.body = activity

  } catch (err) {
    if (err.name === 'CastError' || err.name === 'NotFoundError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }


  //console.log('i am in iorouter');
  //app.io.broadcast('inserted', { 'add': 456, 'del': 12312 });
});
app.use(iorouter.routes());



// Start the application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app
