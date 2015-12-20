export default {
  host: process.env.HOST || 'localhost',
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/Demographics'
  },
  port: process.env.PORT || '8080'
}
