const mongoose = require('mongoose')
const {fnParking} = require('../..')
const {BadRequest} = require("http-errors")
const Parking = require('../../../Models/Parking')

describe("Park a car in parking lot", () => {
    it("Returns bad request if doesn't receive a license plate", async () => {
        await expect(fnParking.park()).rejects.toEqual(new BadRequest("Plate is required"))
    })

    it("Returns bad request if license plate is invalid", async () => {
        await expect(fnParking.park("AAAA-333")).rejects.toEqual(new BadRequest("Invalid Plate"))
    })

    it("Returns bad request if car is already parked", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        await fnParking.park("ZZZ-0000")
        await expect(fnParking.park("ZZZ-0000")).rejects.toEqual(new BadRequest("Car is already parked"))
    })

    it("Returns reservation code if all works fine", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        await expect(fnParking.park("ZZZ-0000")).resolves.toEqual({reservation: expect.any(mongoose.Types.ObjectId)})
    })
})