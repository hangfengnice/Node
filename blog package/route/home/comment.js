const {Comment} = require('../../model/comment')

module.exports = async (req, res) => {

  const {content, uid, aid} = req.body

  await Comment.create({
    content,
    uid,
    aid,
    time: new Date()
  })

  res.redirect('/home/article?id=' + aid)

}