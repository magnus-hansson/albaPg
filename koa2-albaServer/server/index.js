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
iorouter.put('/:id', async (ctx) => {

  try {
    console.log('find id', ctx.params.id);
    const activity = await Activity.findByIdAndUpdate(ctx.params.id, ctx.request.body)
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
