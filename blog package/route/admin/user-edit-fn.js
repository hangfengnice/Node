const bcrypt = require('bcrypt')
const {User, validateUser} = require('../../model/user')

module.exports = async (req, res, next) => {
  
  try {
   await validateUser(req.body)
  } catch (error) {
    // return res.redirect(`/admin/user-edit?message=${error.message}`)
    return next(JSON.stringify({path: '/admin/user-edit', message: error.message}))
  }
  
  let user = await User.findOne({email: req.body.email})

  // 已经存在
  if (user) {
    // return res.redirect(`/admin/user-edit?message=邮箱已经被注册`)
    return next(JSON.stringify({path: '/admin/user-edit', message: "邮箱已经被注册"}))
  }

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)
  req.body.password = password

  await User.create(req.body)

  res.redirect('/admin/user')
}