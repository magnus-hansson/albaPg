import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import routing from './routes/'
import cors from 'kcors';
import { port, connexionString } from './config'

import Router from 'koa-router'
const router2 = new Router();
const IO = require( 'koa-socket' )
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
// router2.get('/', (ctx) =>  {
//     app.io.broadcast('inserted', { 'add': 456, 'del': 12312 });
// });
//app.use(router2.routes());
app.io.on('connection', sock => {
  console.log('sockets connection');
  //app.io.broadcast('inserted', { 'add': 123, 'del': 1233 });
})


// Start the application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app
