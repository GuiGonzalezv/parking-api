const Parking = require('../../Models/Parking')
const fnAuxParking = require('./Aux')
const {BadRequest, InternalServerError} = require("http-errors")

/**
 * The following function receives a plate,
 * validate if the car is already parked, otherwise,
 * park the car and returns a reservation code
 * 
 * @param {String} plate
 * @returns {Object} 
 */

module.exports = async(plate) => {
    
    if(!plate) throw new BadRequest("Plate is required")

    plate = plate.toUpperCase()

    if(!fnAuxParking.validatePlate(plate)) throw new BadRequest("Invalid Plate")

    const isParked = await fnAuxParking.findByQuery({plate, paid: false, leftAt: {$exists: false}}, "findOne")
        .catch(error => {throw new InternalServerError(error)})
    
    if(isParked) {
        throw new BadRequest("Car is already parked")
    }

    const response = await new Parking({plate}).save()
        .catch(error => {throw new InternalServerError("Internal server error on parking")})

    if(!response) throw new InternalServerError("Internal Server Error")

    return {reservation: response._id}
}