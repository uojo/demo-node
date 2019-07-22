const express = require('express')
const path = require('path')
const app = express()
const pathHead = "/api"
const mockPath = "/mock_files"

const _invalidateRequireCacheForFile = function (filePath) {
  delete require.cache[path.resolve(filePath)]
}

// node require with cache
const requireNoCache = function (filePath) {
  _invalidateRequireCacheForFile(filePath)
  return require(filePath)
}

app.use(`${pathHead}/*`, (req, res) => {
  const pathParamReg = /{.*?}/g
  const { baseUrl, method } = req
  const restPath = decodeURIComponent(baseUrl.replace(pathHead, ''))
  // baseUrl: /{pathHead}/a/b/123  => ['a','b','123']
  const filePath = restPath.split('/').filter(item => item && !pathParamReg.test(item))
  let filename = ''

  const realFilePath = path.resolve(__dirname, `./${mockPath}/${filePath.join('/')}.js`)

  const sendErrs = (err) => {
    if (err) {
      res.status(404).send(err.message).end()
    }
  }

  try {
    const resJson = requireNoCache(realFilePath)
    const statusCode = resJson._settings && resJson._settings.statusCode || 200
    res.status(statusCode).json(resJson).end()
  } catch (err) {
    // sendErrs({message: `Error: ENOENT: no such file or directory, stat '${realFilePath}'`})
    sendErrs(err)
  }
})

var port = 3000
app.listen(port, function (err) {
  if(!err){
    var uri = `http://127.0.0.1:${port}`
    console.log(uri)
  }
})
