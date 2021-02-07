const express = require("express")
const router = express.Router()
const path = require("path")

const videoRoutes = require("./video")
const fileManagerRoutes = require("./fileManager")

router.use(express.static(path.join(__dirname, "public")))
// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname + "/public/index.html"))
// })
router.use("/video", videoRoutes)
router.use("/file-manager", fileManagerRoutes)

module.exports = router
