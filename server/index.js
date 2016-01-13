import {Server} from 'hapi'
import Mongoose from 'mongoose'

import Config from '../config'
import Routes from './routes'

let server = new Server()

Mongoose.connect(Config.mongo.url, (err) => {
  if (err) throw err
  console.log(`Connected to ${Config.mongo.url}`)
})

server.connection({
  host: Config.host,
  port: parseInt(Config.port)
})

server.route(Routes)

server.start(err => {
  if (err) throw err

  console.log('demographics is running at...', server.info.uri)
})

export default server
