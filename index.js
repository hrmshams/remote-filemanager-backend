const express = require("express")
const app = express()
const routes = require("./routes/index")
const bodyparser = require("body-parser")

app.use(bodyparser.json())
app.use(routes)
const conf = {
  port: 3000,
  host: "localhost",
}
app.listen(conf.port, conf.host, function () {
  console.log(`Listening on ${conf.host}:${conf.port}!`)
})
