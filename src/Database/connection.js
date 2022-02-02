const mongoose = require("mongoose")
const {mongo_uri} = require("../../config")

mongoose.connect(mongo_uri)
console.log(mongo_uri)
module.exports = mongoose
