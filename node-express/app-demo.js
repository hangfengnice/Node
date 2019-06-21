var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/', express.static('./public/'))

var comments = [
  {
    name: "hangfeng",
    message: 'move',
    dateTime: "2019-06-01"
  },
  {
    name: "yingying",
    message: 'running',
    dateTime: "2019-06-01"
  }
]

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'));
// express 为 response 相应对象提供一个方法: render
// render 默认无法使用,需要配置模版引擎
// res.render('html模版名',{模版数据})
// 第一个参数不写路径,默认到项目目录中 views 目录查找文件
// 就是说 express 有一个约定: 开发人员把所有视图文件都放到 views 目录中

app.get('/',(req,res) => {
res.render('index.html', {
  comments
})
})

app.get('/post', (req, res) => {
  res.render('post.html')
})

app.post('/post', (req, res) => {
  const comment = req.body
  comment.dateTime = Date()
  comments.unshift(comment)
  // 重定向
  res.redirect('/')
})

// app.get('/pinglun', (req, res) => {
//   const comment = req.query
//   comment.dateTime = Date()
//   comments.unshift(comment)
//   // 重定向
//   res.redirect('/')
// })

app.listen(3000,err => {
  console.log('running')
})