import express from "express"
import fs from "fs"
import path from "path"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.writeHead(200, { "content-language": "text/html" })
  const dirname = path.resolve(path.dirname(""))
  const pathIndex = path.join(dirname, "index.html")
  const streamIndexHtml = fs.createReadStream(pathIndex)
  streamIndexHtml.pipe(res)
})

app.get("/events", (req, res) => {
  res
    .writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      Connection: "keep-alive"
    })
    .write("\n")

  const NOTIFICATIONS_INTERVAL = 5000

  setInterval(() => {
    res.write(`data: ${new Date()}\n\n`)
  }, NOTIFICATIONS_INTERVAL)

  req.on("close", () => {
    console.log("Connection was closed")
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running in ${PORT} port`)
})
