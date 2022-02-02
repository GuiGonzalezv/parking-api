const app = require("./app")
const {port, host} = require("./config")


app.listen(port || 3000, host || "0.0.0.0", function(err) {
    if(err) console.log(err)
    console.log("Server running on port 3000")
})
