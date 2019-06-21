const http = require('http')

const server = http.createServer()

server.on('request',function(){
  console.log('收到请求')
})

server.listen(3000,() => {
  console.log('loading')
})