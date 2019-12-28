const express = require('express')


const admin = express.Router()

admin.get('/login', require('./admin/loginPage'))

admin.post('/login', require('./admin/login'))

// 用户列表路由
admin.get('/user', require('./admin/userPage'))

admin.get('/logout', require('./admin/logout'))

// 用户
admin.get('/user-edit', require('./admin/user-edit'))

admin.post('/user-edit', require('./admin/user-edit-fn'))



module.exports = admin
