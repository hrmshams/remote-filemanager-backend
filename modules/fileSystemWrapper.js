const fs = require("fs")
const path = require("path")

function getFolderContent(path = "D:\\") {
  if (!fs.existsSync(path)) {
    return { status: -1 }
  }

  let dirs = fs.readdirSync(path, { withFileTypes: true })

  dirs = dirs.map((d) => {
    return {
      name: d.name,
      isFolder: d.isDirectory(),
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
