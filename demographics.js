require('babel-register')
require('./server')

const Logger = require('@modulus/logger')('demographics')

Logger.info(`demographics starting...`)
