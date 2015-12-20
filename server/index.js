import {Server} from 'hapi'

import Config from '../config'

let server = new Server()

server.connection({
  host: Config.host,
  port: parseInt(Config.port)
})

server.start(err => {
  if (err) throw err

  console.log('demographics is running at...', server.info.uri)
})

export default server
