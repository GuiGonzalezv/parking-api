const mongoose = require('mongoose')
const Parking = require('../../Models/Parking')
const fnAuxParking = require('./Aux')
const {BadRequest, InternalServerError} = require("http-errors")

/**
 * The following function receives a object with a plate, validate the plate and return a reservation code
 * @param {Object} plate
 * @returns {Object} 
 */

module.exports = async(req, res) => {
    let {id} = req.params

    if(!id) throw new BadRequest("Reservation code is required")
    
    const isParked = await Parking.findById(id)
        .catch(error => {throw new InternalServerError("Internal error when searching for parking reservation")})
    
    if(isParked.paid) {
        throw new BadRequest("Parking has already been paid")
    }
    
    const response = await Parking.findOneAndUpdate({_id: id}, {paid: true}, {
        returnOriginal: true
    }).catch(error => {throw new InternalServerError("Internal error when paying for parking reservation")})

    if(!response) throw new InternalServerError("Internal error when paying for parking reservation")

    return res.status(200).json({status: 200, message: "Successfully paid" })
}