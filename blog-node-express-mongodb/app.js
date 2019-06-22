const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router')

var app = express()

app.use('/public/',express.static(path.resolve(__dirname,'public')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("html", require("./node_modules/express-art-template/src"));
app.set('views',path.join(__dirname,'./views')) // 默认就在 views 方便修改

// 路由挂载到app
app.use(router)

app.listen(3000,err => console.log('running..'))
