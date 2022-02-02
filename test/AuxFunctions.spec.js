const fnAuxParking = require('../src/functions/parking/Aux')

describe("Test auxiliares functions", () => {
    it("Return false after receiving a invalid plate", () => {
        let response = fnAuxParking.validatePlate("AAAA-332")
        expect(response).toBe(false)
    })

    it("Return true after receiving a valid plate", () => {
        let response = fnAuxParking.validatePlate("AAA-9999")
        expect(response).toBe(true)
    })

    it("Return error on calculating time by minutes", () => {
        let response = fnAuxParking.formatedTime()
        expect(response).toBe("Error calculating time")
    })

    it("Return formated time calculating time by minutes", () => {
        let response = fnAuxParking.formatedTime(8000)
        expect(response).toMatch(/(minutes|Less than a minute)/i)
    })
})