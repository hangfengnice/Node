const http = require('http')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

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

http
.createServer((req, res) => {
  // var url = req.url
  // 将查询字符串转为对象
  var parseObj = url.parse(req.url, true)
  var pathName = parseObj.pathname

  if(pathName === '/'){
    fs.readFile('../view/index.html', (err, data) => {
      if(err){
        return res.end('404 noy found')
      }
      var htmlStr = template.render(data.toString(),{
        comments
      })
      res.end(htmlStr)
    })
  } else if(pathName === '/post'){
    fs.readFile('../view/post.html', (err, data) => {
      if(err){
        return res.end('404 noy found')
      }
      res.end(data)
    })
  }else if(pathName === '/pinglun'){
    // res.end(JSON.stringify(parseObj.query))
    var comment = parseObj.query;
    comment.dateTime = Date()
    comments.push(comment)
    // 客户端收到服务器响应的状态码是302 自动去响应头中找location
    res.statusCode = 302
    res.setHeader('Location','/')
    res.end()
  }
})
.listen(3000, err => {
  console.log('running..')
})
