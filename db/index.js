const mongoose = require('mongoose');
const logger = require('../logger');

module.exports = {
  async connectToMongoDB(cb) {
    try {
      const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
      cb(connection);
    } catch (error) {
      // throw new Error(error);
      logger.log('error', error);
    }
  },
};
