const dotenv = require('dotenv');
dotenv.config();

const secrets = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtTtl: process.env.JWT_TTL,
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL,
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  streamSecret: process.env.STREAM_SECRET,
  streamApiKey: process.env.STREAM_API_KEY
};

module.exports = secrets;