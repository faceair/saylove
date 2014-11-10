express = require "express"
mongoose = require "mongoose"
mApi = require "../models/mApi"
ObjectId = mongoose.Types.ObjectId
router = express.Router()

router.post "/post", (req, res) ->
  mApi.create
    nickname: req.body.nickname ? ""
    content: req.body.content ? ""
    target: req.body.target ? ""
    create_at: new Date()
  , ->
    res.json
      status: 1

router.post "/love_guess", (req, res) ->
  mApi.find
    _id: ObjectId(req.body._id) ? ""
    nickname: req.body.nickname ? ""
  , (lovesArr) ->
    if lovesArr.length > 0
      res.json
        status: 1
        success: true
    else
      res.json
        status: 1
        success: false

router.get "/search", (req, res) ->
  mApi.find
    $or: [{
      target: new RegExp(req.params.keywords, "ig")
    },{
      content: new RegExp(req.params.keywords, "ig")
    }]
  , (lovesArr) ->
    res.json
      status: 1
      data: lovesArr

router.get "/posts", (req, res) ->
  mApi.find {},
    limit: req.query.limit ? 5
    skip: req.query.offset ? 0
    sort:
      create_at: -1
  , (lovesArr) ->
    res.json
      status: 1
      data: lovesArr

module.exports = router