const express = require("express")
require("express-async-errors")

class AppController {
    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
        this.errorHandler()
    }

    middlewares(){
        this.express.use(express.urlencoded({extended: true}))
        this.express.use(express.json())
    }

    routes(){
        this.express.use("/", require("./routes"))
    }

    errorHandler() {
        this.express.use((error, req, res, next) => {
            if (error && error.statusCode) {
                res.status(error.statusCode).json({
                    status: error.statusCode,
                    message: error.message
                })
            } else {
                console.log(error)
                res.status(500).send({
                    status: 500,
                    message: "Unexpected Error"
                })
            }
            next()
        })
    }

}

module.exports = new AppController().express