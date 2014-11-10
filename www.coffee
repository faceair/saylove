mongoose = require "mongoose"
debug = require("debug")("saylove")
{web,db} = require "./config"
app = require "./app"
mongoose.connect db.url, (err)->
  throw err if err
  server = app.listen web.port, ->
    debug "Express server listening on port " + server.address().port