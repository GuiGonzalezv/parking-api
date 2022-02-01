const Parking = require('../../Models/Parking')
const fnAuxParking = require('./Aux')
const {BadRequest, InternalServerError} = require("http-errors")

/**
 * The following function receives a reservation id, 
 * checks if the reservation exists, if it is already paid or if it has already
 * left the parking lot, otherwise, remove the car from the parking lot
 * @param {String} id
 * @returns {Object} 
 */

module.exports = async(id) => {
    
    if(!id) throw new BadRequest("Reservation code is required")

    const reservation = await Parking.findById(id)
        .catch(error => {throw new InternalServerError("Internal error when searching for parking reservation")})

    if(!reservation) {
        throw new BadRequest("Reservation not found")
    }

    if(!reservation.paid) {
        throw new BadRequest("Reservation was not paid")
    }
    
    if(reservation.left) {
        throw new BadRequest("The car has already left the parking lot")
    }

    const response = await Parking.findOneAndUpdate({_id: id}, {left: true, leftAt: new Date().toISOString()}, {
        returnOriginal: true
    }).catch(error => {throw new InternalServerError("Internal error when leaving the parking lot")})

    if(!response) throw new InternalServerError("Internal error when leaving the parking lot")

    return {status: 200, message: "Car left the parking lot"}
}