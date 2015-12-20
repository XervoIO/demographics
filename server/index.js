import {Server} from 'hapi'
import Waterline from 'waterline'

import Config from '../config'
import DbConnectionConfig from './connections'
import Routes from './routes'

let orm = new Waterline()
let server = new Server()

server.connection({
  host: Config.host,
  port: parseInt(Config.port)
})

server.route(Routes)

server.start(err => {
  if (err) throw err

  console.log('demographics is running at...', server.info.uri)

  orm.initialize(DbConnectionConfig, (err, models) => {
    if (err) throw err
    console.log('ORM initialized.')
  })
})

export default server
