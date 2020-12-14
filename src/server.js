const express = require("express")
const listEndpoints = require("express-list-endpoints")
const projectsRouter = require("./services/projects")


const server = express()

const port = process.env.PORT || 3001

server.use(express.json())
server.use("/projects", projectsRouter)

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})