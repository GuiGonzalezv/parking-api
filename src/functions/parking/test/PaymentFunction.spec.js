const mongoose = require('mongoose')
const {fnParking} = require('../..')
const {BadRequest, InternalServerError} = require("http-errors")
const Parking = require('../../../Models/Parking')

describe("Pay a reservation in parking", () => {
    it("Returns bad request if doesn't receive a reservation code", async () => {
        await expect(fnParking.payment()).rejects.toEqual(new BadRequest("Reservation code is required"))
    })

    it("Returns internal server error if reservation code is invalid", async () => {
        await expect(fnParking.payment("abc123")).rejects.toEqual(new InternalServerError("Internal error when searching for parking reservation"))
    })

    it("Returns bad request if reservation code does not exist", async () => {
        await expect(fnParking.payment(mongoose.Types.ObjectId())).rejects.toEqual(new BadRequest("Reservation not found"))
    })

    it("Returns bad request if reservation has already been paid", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        let response = await fnParking.park("ZZZ-0000")
        await fnParking.payment(response.reservation)
        await expect(fnParking.payment(response.reservation)).rejects.toEqual(new BadRequest("Reservation has already been paid"))
    })

    it("Returns success message if all works fine", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        let response = await fnParking.park("ZZZ-0000")
        await expect(fnParking.payment(response.reservation)).resolves.toEqual({status: 200, message: "Successfully paid" })
    })
})