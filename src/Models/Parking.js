const { Schema } = require("mongoose")
const mongoose = require("../Database/connection")

const ParkingSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    parkedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    left: {
        type: Boolean,
        default: false
    },
    leftAt: {
        type: Date
    }
})

module.exports = mongoose.model("parking", ParkingSchema, "parking")