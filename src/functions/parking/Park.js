const Parking = require('../../Models/Parking')
const fnAuxParking = require('./Aux')
const {BadRequest, InternalServerError} = require("http-errors")

/**
 * The following function receives a object with a plate, validate the plate and return a reservation code
 * @param {Object} plate
 * @returns {Object} 
 */

module.exports = async(req, res) => {
    const {plate} = req.body
    
    if(!plate) throw new BadRequest("Erro")

    if(!fnAuxParking.validatePlate(plate)) throw new BadRequest("Invalid Plate")

    const isParked = await fnAuxParking.findByQuery({plate, paid: false, leftAt: {$exists: false}}, "findOne")
        .catch(error => {throw new InternalServerError(error)})
    
    if(isParked) {
        throw new BadRequest("Car is already parked")
    }

    const response = await new Parking({plate}).save()
        .catch(error => {throw new InternalServerError(error)})

    if(!response) throw new InternalServerError("Internal Server Error")

    return res.status(200).json({reservation: response._id})
}