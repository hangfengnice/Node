const bcrypt = require('bcrypt')
const {User} = require('../../model/user')

module.exports  = async (req, res) => {
  const {email, password} = req.body
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).render('admin/error', {
      msg: '邮箱或密码有不合适'
    })
  }
  let user = await User.findOne({email})
  if (user) {
    // 比对密码
    let isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      req.session.username = user.username
      req.app.locals.userInfo = user
      res.redirect('/admin/user')
    } else {
      res.status(400).render('admin/error', {msg: '邮箱或密码错误'})
    }
  } else {
    res.status(400).render('admin/error', {msg: '邮箱或密码错误'})
  }

}
