const express = require("express")
const app = express()
const routes = require("./routes/index")
const bodyparser = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(bodyparser.json())
app.use(routes)

const port = 3030

app.listen(port, function () {
  console.log(`Listening on ${conf.port}!`)
})
