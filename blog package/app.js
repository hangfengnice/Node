const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

require('./model/connect')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(session({secret: 'secret key'}))

// template 配置
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))

const home = require('./route/home')
const admin = require('./route/admin')

app.use(express.static(path.join(__dirname, 'public')))

// 请求拦截 
app.use('/admin', require('./middleware/loginGuard'))

app.use('/home', home)
app.use('/admin', admin)

app.use((err, req, res, next) => {
  const {path, message} = JSON.parse(err)
  res.redirect(`${path}?message=${message}`)
})


app.listen(80, () => {
  console.log('success');
})
