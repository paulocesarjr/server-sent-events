import express from "express"
import fs from "fs"
import path from "path"
import Connection from "./connection.js"

const app = express()
app.use(express.json())
app.use(express.static(path.join(path.resolve(path.dirname("")), "public")))

app.get("/", (_, res) => {
  res.writeHead(200, { "content-language": "text/html" })
  const streamIndexHtml = fs.createReadStream("index.html")
  streamIndexHtml.pipe(res)
})

const connection = new Connection()

app.get("/events", (req, res) => {
  res
    .writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      Connection: "keep-alive"
    })
    .write("\n")

  const NOTIFICATIONS_INTERVAL = 5000
  const userId = req.query.user
  const connectionId = connection.registerUser(userId, res)

  setInterval(() => {
    res.write(`data: ${JSON.stringify(connection.connectedUsers)}\n\n`)
  }, NOTIFICATIONS_INTERVAL)

  req.on("close", () => connection.removeUser(userId, connectionId))
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on ${PORT} port`))
