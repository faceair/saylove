mongoose = require "mongoose"
_ = require "underscore"

createSchema = (doc, config = {}) ->
  return new mongoose.Schema doc, _.extend config,
    versionKey: false

module.exports =
  dbLove: mongoose.model "love", createSchema
    nickname: String
    content:
      type: String
      index:
        unique: false
    target:
      type: String
      index:
        unique: false
    create_at: Date