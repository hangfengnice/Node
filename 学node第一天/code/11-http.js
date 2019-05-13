var http = require('http')
var server = http.createServer();
server.on('request',function(req,res){

var  url=req.url
if(url === '/plain'){
    res.setHeader("Content-type","text/plain;charset=utf-8")
    res.end("hello 宝贝")
}else if(url === '/html')
res.setHeader('Content-type','text/html;charset=utf-8')
res.end('<h1>宝贝<h1>')
})
server.listen(3000,function(){
    console.log('servering')
})