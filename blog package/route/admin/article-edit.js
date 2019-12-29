module.exports = (req, res) => {
  req.app.locals.currentLink = 'article'
  res.render('admin/article-edit')
}