const express = require("express")
const router = express.Router()
const { getFolderContent } = require("./../modules/fileSystemWrapper")

// TODO : WARNING : encrypt path in front and decrypt here (how!)
router.post("/ls", function (req, res) {
  const { path } = req.body
  console.log(path)
  const result = getFolderContent(path)
  if (result.status === 1) {
    res.send(result)
  } else if (result.status === -1) {
    res.send({ ...result, msg: "invalid path" })
  }
})

module.exports = router
