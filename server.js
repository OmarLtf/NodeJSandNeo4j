

const createRouter = require("./routes/create")
const relationsRouter = require("./routes/relations")
const nodeRouter = require("./routes/nodequery")
const relationRouter = require("./routes/relationquery")
const deleteRouter = require("./routes/delete")



var express = require("express")
var path = require("path")
var logger = require("morgan")
var bodyParser = require("body-parser");
const { create } = require('domain');
require('dotenv').config()
var app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


app.use("/create", createRouter)
app.use ("/relations", relationsRouter)
app.use ("/nodequery", nodeRouter)
app.use ("/relationquery", relationRouter)
app.use ("/delete", deleteRouter)


const server = app.listen(3000)

// Handle normal shutdown
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully.');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit();
  });

  // If after a certain timeout, forcefully shut down
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10 seconds
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
