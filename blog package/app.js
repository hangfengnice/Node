const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const template = require('art-template')
const dateFormat = require('dateformat')
const config = require('config')

const app = express()

require('./model/connect')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(session({secret: 'secret key', saveUninitialized: false}))

// template 配置
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
template.defaults.imports.dateFormat = dateFormat
app.engine('art', require('express-art-template'))

const home = require('./route/home')
const admin = require('./route/admin')

app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'));
// console.log(process.env.NODE_ENV);

// 请求拦截 
app.use('/admin', require('./middleware/loginGuard'))

app.use('/home', home)
app.use('/admin', admin)

app.use((err, req, res, next) => {
  const result = JSON.parse(err)
  let params = []
  for (let attr in result) {
    if (attr != 'path') {
      params.push(attr + '=' + result[attr])
    }
  }
  res.redirect(`${result.path}?${params.join('&')}`)
})


app.listen(80, () => {
  console.log('success');
})
