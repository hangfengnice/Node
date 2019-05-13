



var http = require("http")

var server = http.createServer()
//request 请求对象 //#endregion
// response 相应对象
server.on('request',function(request,response){
    console.log('收到客户端的请求了，请求路径是：' + request.url)

    //response write //#endregion
    //write write 需要end 结束
    response.write('hello')
    response.end()
    
})

//绑定端口号，启动服务器
server.listen(3000,function(){
    console.log('服务器启动成功 可以')
})
