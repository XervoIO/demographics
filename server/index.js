'use strict'

const Hapi = require('hapi')
const Mongoose = require('mongoose')
const Logger = require('@modulus/Logger')('server')

const Config = require('../config')
const Routes = require('./routes')

let server = new Hapi.Server()

Mongoose.connect(Config.mongo.url, (err) => {
  if (err) throw err
  Logger.info(`Connected to ${Config.mongo.url}`)
})

server.connection({
  host: Config.env !== 'production' ? Config.host : null,
  port: parseInt(Config.port, 10),
  routes: { cors: true }
})

server.route(Routes)

server.start((err) => {
  if (err) {
    Logger.error(`server.start ${err.message}`)
    return err
  }

  Logger.info(`demographics is running at ${server.info.uri}`)
})

module.exports = server
