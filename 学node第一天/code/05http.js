



var http = require("http")

var server = http.createServer()

server.on('request',function(){
    console.log('shoudao qing qiu l ')
})

//绑定端口号，启动服务器
server.listen(3000,function(){
    console.log('服务器启动成功 可以')
})
