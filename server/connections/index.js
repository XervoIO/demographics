import MongoAdapter from 'sails-mongo'

import Mongo from './mongo'

export default {
  adapters: {
    'default': MongoAdapter,
    mongo: MongoAdapter
  },
  connections: {
    mongo: Mongo
  }
}
