import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../dist')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('Server started at port 3000')
})
