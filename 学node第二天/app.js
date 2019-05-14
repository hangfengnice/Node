var express = require('express');

var fs = require('fs')

var app = express();


app.use('/node_modules',express.static('./node_modules/'))
app.use('/public',express.static('./public/'))

app.engine('html',require('express-art-template'));

app.get('/',function(req,res){
// res.send('hello world')
// 读取文件的时候是二进制形式，可以通过第二个参数utf8 ，告诉她弄成我们可以看懂的字符串
// 或者data.toString()
fs.readFile('./db.json',"utf8",function(err,data){
    if(err){
        return res.status(500).send('Server error')
    }
    // console.log(typeof data)
    res.render('index.html',{
        fruits:[
            '苹果',
            '香蕉',
            '橘子'
        ],
        students: JSON.parse(data).students
    })
})

})
app.listen(3000,function(){
    console.log('running...')
})