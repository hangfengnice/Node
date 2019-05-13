

var http = require('http')

var server = http.createServer()

server.on('request',function(req,res){
// console.log('收到请求了，请求路径是：', req.url)
// res.end('nice baby')


// if(url === '/'){
// res.end("index page")
// }else if(url === '/login'){
//     res.end('login page')
// }else{
//     res.end('404 not found')
// }
var url = req.url;

if(url === '/product'){
var product = [
    {
        name:'贫国',
        price:6666
    },
    {
        name:'贫国',
        price:6666
    },{
        name:'贫国',
        price:6666
    }
]
res.end(JSON.stringify(product))
}


})


server.listen(3000,function(){
    console.log('服务器启动成功过； 可以访问了')

})