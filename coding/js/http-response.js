const http = require('http')

const server = http.createServer()

server.on('request',function(request, response){
  console.log('收到请求')
  response.write('hello hangfeng')
  response.end()
})

server.listen(3000,() => {
  console.log('loading')
})