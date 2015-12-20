import {Server} from 'hapi'
import Waterline from 'waterline'

import Config from '../config'
import DbConnectionConfig from './connections'
import LoadCollections from './helpers/load-collections'
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

  LoadCollections(orm)
  orm.initialize(DbConnectionConfig, (err, models) => {
    if (err) throw err

    console.log('ORM initialized.')
    server.models = models.collections
  })
})

export default server
