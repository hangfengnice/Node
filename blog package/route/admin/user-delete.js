const {User} = require('../../model/user')

module.exports = async (req, res) => {
  let {id} = req.query

  await User.findByIdAndDelete({_id: id})

  res.redirect('/admin/user')
}