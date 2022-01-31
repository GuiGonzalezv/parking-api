const Parking = require('../../Models/Parking')
const fnAuxParking = require('./Aux')
const {BadRequest, InternalServerError, NotFound} = require("http-errors")


/**
 * The following function receives a license plate and returns the history of the car in the parking lot
 * @param {String} plate
 * @returns {Array} 
 */

module.exports = async(req, res) => {
    const {plate} = req.params
    
    if(!plate) throw new BadRequest("Plate is required")

    if(!fnAuxParking.validatePlate(plate)) throw new BadRequest("Invalid Plate")
    
    const response = await Parking.aggregate([{ $match: { plate: plate}}]).project({
        user: 1,
        paid: 1,
        left: 1,
        time: {
            $cond: {
               if    : {$ifNull: ['$leftAt', false]},
               then  : {$divide:[{ $subtract: [ "$leftAt", "$parkedAt" ]}, 1000*60] },
               else  : false
            }
       }  
    }).catch(error => {throw new InternalServerError(error)})

    await response.forEach(async (reservation) => {
        if(!reservation.time) reservation.time = "Car is in the parking lot"
        else reservation.time = await fnAuxParking.formatedTime(JSON.parse(reservation.time.toFixed(0)))
    })

    if(!response || !response.length) throw new NotFound("Plate not found in our database")

    return res.status(200).json(response)
}
