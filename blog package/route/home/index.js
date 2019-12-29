const {Article} = require("../../model/article")
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {

  const page = req.query.page

  let result = await pagination(Article).page(page).size(3).display(3).populate('author').exec()

  res.render('home/default', {
    result
  })
}