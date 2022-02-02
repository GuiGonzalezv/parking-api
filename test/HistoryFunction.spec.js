const mongoose = require('mongoose')
const {fnParking} = require('../src/functions')
const {BadRequest, NotFound} = require("http-errors")
const db = require('../src/Database/connection')

describe("Get history of reservation by plate", () => {
    it("Returns bad request if doesn't receive a license plate", async () => {
        await expect(fnParking.history()).rejects.toEqual(new BadRequest("Plate is required"))
    })

    it("Returns bad request if license plate is invalid", async () => {
        await expect(fnParking.history("AAAA-333")).rejects.toEqual(new BadRequest("Invalid Plate"))
    })

    it("Returns bad request if no license plate is founded", async () => {
        await expect(fnParking.history("AAA-3333")).rejects.toEqual(new NotFound("Plate not found in our database"))
    })

    it("Return a array of objects with the history of the license plate on parking lot", async() => {
        
        const response = await fnParking.park("UUU-2222")
        await fnParking.payment(response.reservation)
        await fnParking.out(response.reservation)
        const history = await fnParking.history("UUU-2222")

        expect(history[0]).toMatchSnapshot({
            _id: expect.any(mongoose.Types.ObjectId),
            paid: expect.any(Boolean),
            left: expect.any(Boolean),
            time: expect.any(String)
        })
        db.connection.close()
    })
})