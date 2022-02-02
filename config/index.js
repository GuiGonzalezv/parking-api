require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

module.exports = {
    mongo_uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    port: process.env.PORT,
    host: process.env.HOST
}