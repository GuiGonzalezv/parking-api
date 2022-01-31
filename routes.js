const router = require("express").Router()

router.use("/parking", require("./src/Controllers/ParkingController"))

module.exports = router