const {User} = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
  const {username, password, state, role, email} = req.body
  const {id} = req.query

  let user = await User.findOne({_id: id})

  const isValid = await bcrypt.compare(password, user.password)

  if (isValid) {
    await User.updateOne({_id: id}, {
      username,
      email,
      state,
      role
    })
    res.redirect('/admin/user')
  } else {
    let obj = {
      path: '/admin/user-edit',
      message: '密码不对，无法进行用户的信息修改',
      id}
    next(JSON.stringify(obj))
  }
}