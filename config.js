/* eslint-disable no-process-env */
module.exports = {
  host: process.env.HOST || '0.0.0.0',
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/Demographics'
  },
  port: process.env.PORT || '8000'
};
/* eslint-enable no-process-env */
