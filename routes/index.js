const express = require("express")
const router = express.Router()
const path = require("path")

const videoRoutes = require("./video")
const fileManagerRoutes = require("./fileManager")

router.use(express.static(path.join(__dirname, "../public")))
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"))
})

router.use("/api/video", videoRoutes)
router.use("/api/file-manager", fileManagerRoutes)

module.exports = router
