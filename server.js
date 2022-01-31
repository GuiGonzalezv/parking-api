const app = require("./app")
const {port} = require("./config")


app.listen(port || 3000, function(err) {
    if(err) console.log(err)
    console.log("Server running on port 3000")
})
