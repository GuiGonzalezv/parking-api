const express = require("express")
const {fnParking} = require("../functions")
const router = express.Router()

// Park
router.post("/", async function(req, res) {
    await fnParking.park(req, res)
})

//History
router.get("/:plate", async function(req, res) {
    await fnParking.history(req, res)
})

//Out
router.put("/:id/out", async function(req, res) {
    await fnParking.out(req, res)
})

//Payment
router.put("/:id/pay", async function(req, res) {
    await fnParking.payment(req, res)
})



module.exports = router