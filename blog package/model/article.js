const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 2,
    required: [true, '请输入文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '请传递作者']
  },
  publishDate: {
    type: Date,
    default: Date.now()
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = {
  Article
}
