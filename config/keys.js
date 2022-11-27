require('dotenv').config();
module.exports = {
  mongoURI: process.env.MONGODB_URI, 
  secretOrKey: 'WEBNC',
  tokenExpireTime: 360000,
}