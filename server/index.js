import {Server} from 'hapi'
import Mongoose from 'mongoose'
import Logger from '@modulus/logger'

import Config from '../config'
import Routes from './routes'

let logger = Logger('server')
let server = new Server()

Mongoose.connect(Config.mongo.url, (err) => {
  if (err) throw err
  console.log(`Connected to ${Config.mongo.url}`)
})

server.connection({
  host: Config.env !== 'production' ? Config.host : null,
  port: parseInt(Config.port, 10),
  routes: { cors: true }
})

server.route(Routes)

server.start(err => {
  if (err) {
    logger.error(`server.start ${err.message}`)
    return err
  }

  logger.info(`demographics is running at ${server.info.uri}`)
})

export default server
