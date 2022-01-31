require('dotenv').config()

module.exports = {
    mongo_uri: process.env.MONGODB_URI,
    port: process.env.PORT
}