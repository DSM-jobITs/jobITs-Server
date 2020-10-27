require('dotenv').config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  BUCKET_NAME: process.env.BUCKET_NAME,
  BUCKET_URL: process.env.BUCKET_URL,
  JWT_SECRET: process.env.JWT_SECRET, //여기부터 dupang이 추가함
  CRYPTO_SECRET: process.env.CRYPTO_SECRET
  // REFRESH_SECRET: process.env.REFRESH_SECRET
};
