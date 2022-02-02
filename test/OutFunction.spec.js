const mongoose = require('mongoose')
const {fnParking} = require('../src/functions')
const {BadRequest, InternalServerError} = require("http-errors")
const Parking = require('../src/Models/Parking')

describe("Remove a car from the parking lot", () => {
    it("Returns bad request if doesn't receive a reservation code", async () => {
        await expect(fnParking.out()).rejects.toEqual(new BadRequest("Reservation code is required"))
    })

    it("Returns internal server error if reservation code is invalid", async () => {
        await expect(fnParking.out("abc123")).rejects.toEqual(new InternalServerError("Internal error when searching for parking reservation"))
    })

    it("Returns bad request if reservation code does not exist", async () => {
        await expect(fnParking.out(mongoose.Types.ObjectId())).rejects.toEqual(new BadRequest("Reservation not found"))
    })

    it("Returns bad request if reservation was not paid", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        let response = await fnParking.park("ZZZ-0000")
        await expect(fnParking.out(response.reservation)).rejects.toEqual(new BadRequest("Reservation was not paid"))
    })

    it("Returns bad request if car has already left the parking lot", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        let response = await fnParking.park("ZZZ-0000")
        await fnParking.payment(response.reservation)
        await fnParking.out(response.reservation)
        await expect(fnParking.out(response.reservation)).rejects.toEqual(new BadRequest("The car has already left the parking lot"))
    })

    it("Returns success message if all works fine", async () => {
        await Parking.deleteMany({plate: "ZZZ-0000"})
        let response = await fnParking.park("ZZZ-0000")
        await fnParking.payment(response.reservation)
        await expect(fnParking.out(response.reservation)).resolves.toEqual({status: 200, message: "Car left the parking lot"})
    })
})