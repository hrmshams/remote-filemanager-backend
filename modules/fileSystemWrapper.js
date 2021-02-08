const fs = require("fs")
const pathPackage = require("path")

function getFileType(filename) {
  const tokens = filename.split(".")
  const ext = tokens[tokens.length - 1]

  //TODO : add pdf, image, text (including scripts)
  const types = {
    mp4: { type: "video", meme: "video/mp4" },
    webm: { type: "video", meme: "video/webm" },
    mp3: { type: "audio", meme: "audio/mpeg" },
    ogg: { type: "audio", meme: "audio/ogg" },
  }

  for (t in types) {
    if (types[ext]) {
      return types[ext]
    }
  }
  return {}
}

function getFolderContent(path = "D:\\") {
  if (!fs.existsSync(path)) {
    return { status: -1 }
  }

  let dirs = fs.readdirSync(path, { withFileTypes: true })

  dirs = dirs.map((d) => {
    let type = "unknown"
    let meme
    if (d.isDirectory()) {
      type = "folder"
    } else {
      const r = getFileType(d.name)
      type = r.type || type
      meme = r.meme
    }

    return {
      title: d.name,
      type,
      meme,
    }
  })

  return {
    status: 1,
    data: {
      dirs,
      path,
    },
  }
}

module.exports = { getFolderContent }
