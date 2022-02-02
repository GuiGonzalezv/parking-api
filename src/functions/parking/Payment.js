const mongoose = require('mongoose')
const Parking = require('../../Models/Parking')
const {BadRequest, InternalServerError} = require("http-errors")

/**
 * The following function receives a reservation id, 
 * proccess the payment and return a success message
 * if the payment works fine
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

    if(reservation.paid) {
        throw new BadRequest("Reservation has already been paid")
    }

    const response = await Parking.findOneAndUpdate({_id: id}, {paid: true}, {
        returnOriginal: true
    }).catch(error => {throw new InternalServerError("Internal error when paying for parking reservation")})

    if(!response) throw new InternalServerError("Internal error when paying for parking reservation")

    return {status: 200, message: "Successfully paid" }
}