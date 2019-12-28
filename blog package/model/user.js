const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  // 0 启用
  // 1 禁用
  state: {
    type: Number,
    default: 0
  }
})
mongoose.set('useCreateIndex', true)
const User = mongoose.model("User", userSchema)

async function createUser() {
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash('1212', salt)
  const user = await User.create({
    username: 'hangfeng',
    email: 'nicehangfeng@foxmail.com',
    password: pass,
    role: 'admin',
    state: 0
  })
}
// createUser()

const validateUser = (user) => {
  const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则！')),
    email: Joi.string().email().required().error(new Error('邮箱不符合规则！')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则！')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不符合规则！')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态不符合规则！'))
  }
  return Joi.validate(user, schema)
}

// 验证用户信息


module.exports = {
  User,
  validateUser
}