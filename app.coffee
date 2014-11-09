express = require "express"
path = require "path"
logger = require "morgan"
bodyParser = require "body-parser"
app = express()

app.set "views", path.join __dirname, "views"
app.set "view engine", "jade"
app.use logger "dev"
app.use bodyParser.json()
app.use bodyParser.urlencoded()
app.use express.static path.join(__dirname, "public")

app.use "/", require "./routes/index"
app.use "/api", require "./routes/api"

module.exports = app