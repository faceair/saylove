_ = require "underscore"
{dbLove} = require "../db"

exports.byId = (id, callback) ->
  dbLove.findById id, (err, loveDoc) ->
    unless loveDoc
      return callback null
    callback loveDoc.toObject()

exports.info = (loveObj) ->
  return _.omit loveObj, ["nickname"]

exports.find = (query, options, callback) ->
  if typeof options is "function"
    callback = options
    options = {}
  dbLove.find query, null, options, (err, lovesArr) ->
    callback _.map lovesArr, (loveDoc) ->
      return exports.info loveDoc.toObject()

exports.create = (loveObj, callback) ->
  new dbLove(loveObj).save (err, loveDoc) ->
    callback exports.info loveDoc.toObject()