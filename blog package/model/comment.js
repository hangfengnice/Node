const mongoose = require('mongoose')

const mongooseSchema = new mongoose.Schema({
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: Date
  },
  content: {
    type: String
  }
})

const Comment = mongoose.model('Comment', mongooseSchema)

module.exports = {
  Comment
}