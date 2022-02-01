const express = require("express")
const {fnParking} = require("../functions")
const router = express.Router()

// Park
router.post("/", async function(req, res) {
    const {plate} = req.body
    let response = await fnParking.park(plate)
    return res.status(200).json(response)

})

//History
router.get("/:plate", async function(req, res) {
    const {plate} = req.params
    let response = await fnParking.history(plate)
    return res.status(200).json(response)
})

//Out
router.put("/:id/out", async function(req, res) {
    const {id} = req.params
    let response = await fnParking.out(id)
    return res.status(200).json(response)
})

//Payment
router.put("/:id/pay", async function(req, res) {
    const {id} = req.params
    let response = await fnParking.payment(id)
    return res.status(200).json(response)
})



module.exports = router