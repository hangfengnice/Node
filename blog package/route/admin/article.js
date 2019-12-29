const {Article} = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const {page} = req.query
  req.app.locals.currentLink = 'article'

  let articles = await pagination(Article).find().page(page).size(2).display(3).populate("author").exec()

  // res.send(articles)
  res.render('admin/article', {
    articles
  })
}