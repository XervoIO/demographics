import {Server} from 'hapi'

import Config from '../config'
import Routes from './routes'

let server = new Server()

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
