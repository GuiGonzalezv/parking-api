const Parking = require('../../Models/Parking')

module.exports = {
    validatePlate(plate) {
        const regex = /^[a-zA-Z]{3}[-]{1}[0-9]{4}$/
        return regex.test(plate)
    },
    findByQuery(query, findOption="findOne") {
        return new Promise((resolve, reject) => {
            if(!query) reject("Unexpected Error")
            Parking[findOption](query, (error, result) => {
                error ? reject(error) : resolve(result)
            })
        })
    },
    formatedTime( minutes ) {
        const days = Math.floor(minutes/24/60)
        const hours = Math.floor(minutes/60%24)
        const min =  Math.floor(minutes%60)
        const text = (days > 0 ? " " + days + " days" : "") + (hours > 0 ? " " + hours + " hours" : "") + (min > 0 ? " " + min + " minutes" : "")
        return min > 1 ? text.trim() : "Less than a minute"
    }
}