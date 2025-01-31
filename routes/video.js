const express = require("express")
const router = express.Router()

const srtVttConvertor = require("srt-to-vtt")
const pathPackage = require("path")
const fs = require("fs")

const base64 = require("base-64")
const utf8 = require("utf8")

// getting a video
router.get("/:id", function (req, res) {
  const { id } = req.params
  const path = utf8.decode(base64.decode(id))

  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

    if (start >= fileSize) {
      res
        .status(416)
        .send("Requested range not satisfiable\n" + start + " >= " + fileSize)
      return
    }

    const chunksize = end - start + 1
    const file = fs.createReadStream(path, { start, end })

    /*
      TODO : important: change end range in the client side 
      now it is alaways end of file
    */
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

router.get("/get-vtt/:path", function (req, res) {
  //TODO ? path
  const readStream = fs.createReadStream(path).pipe(srtVttConvertor())
  readStream.pipe(res)
})

module.exports = router
