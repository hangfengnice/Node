const http = require('http')

var server = http.createServer()

server.on('request',(req,res) => {
  // res.write('hello hangfeng')
  // res.end()

  // res.end('hello world') // 响应同时 发送内容
  // res.setHeader('Content-type','text/plain;charset=utf-8')// 解决中文问题
  // res.end('hello 航锋')
  res.setHeader('Content-type','text/html;charset=utf-8')// 解决中文问题
  res.end('<h1>hello 航锋<h1>')

})

server.listen(3000, () => {
  console.log('on servering')
})