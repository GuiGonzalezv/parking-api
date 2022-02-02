const mongoose = require("mongoose")
const {mongo_uri} = require("../../config")

mongoose.connect(mongo_uri, {useNewUrlParser: true})

module.exports = mongoose
