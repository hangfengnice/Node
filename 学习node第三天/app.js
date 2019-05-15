var express = require('express')
var app = express()

var bodyParser = require('body-parser')

var router = require('./router')

var fs = require('fs')

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({
    entended: false
}))

app.use(bodyParser.json())

app.use('/public', express.static('public'))

app.use(router)

app.listen(3000, function (err) {
    console.log('running..')
})
