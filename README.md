# Node  

## 核心模块

- fs 文件操作模块
- http 网络服务构建模块
- os 操作系统模块
- path 路径处理模块
- url 路径操作模块

## 模块系统

- require

- 语法

```javascript
var 自定义变量名称 = require('模块')
```

- 第三方模块加载过程

```javascript
//以 art-template 为例
var template = require('art-template')
//先找到当前文件所处目录中的 nodu_modules 目录
// nodu_modules/art-template
// nodu_modules/art-template/package.json 文件
// nodu_modules/art-template/package.json 文件中的 main 属性
// main 属性中记录了 art-template 的入口模块

// 如果 package.json 文件不存在或者 main 指定的入口模块没有
// 则 node 会找 nodu_modules/art-template 目录下的 index.js
// index.js 会作为一个备选项

// 当前目录没有就上一级目录的 nodu_modules
// 上一级目录没有就上上一级目录的 nodu_modules ...
// 直到磁盘根目录还没有,最后报错:
// can not find module xxx
```

- 作用
  - 加载文件模块并且执行里面的代码
  - 拿到被加载文件模块导出的接口对象

- 导出
  - 推荐使用`module.exports`. `exports` 是`module.exports`引用

```javascript
var exports = module.exports
```

- 导出多个成员

```javascript
exports.add = () => {}
exports.num = 2
```

- 导出单个成员

```javascript
module.exports = function(){}
```

## 服务器级别的API

- fs -- 操作文件

```javascript
const fs = require('fs') // 必须要引入"fs" 模块

// 读文件
fs.readFile('./data/hello.txt',(error, data) => {
  // 文件中存储的都是二进制 
  // 二进制转为16进制l
  console.log(data)//<Buffer 68 65 6c 6c 6f 20 68 61 6e 67 66 65 6e 67 0a>
  console.log(data.toString()) //hello hangfeng
  console.log(error) // null
  // 如果出错 data为undefined
})

// 写文件

// 只接受一个参数
fs.writeFile('./data/hi.txt','hello yingying',(error) => {
  console.log('success')
  console.log(error) // null
})

```

- http

```javascript
const http = require('http')
const server = http.createServer()
server.on('request',function(request, response){
  console.log('收到请求')
  // res.setHeader('Content-type','text/plain;charset=utf-8')// 告诉浏览器按什么模式来解析
  response.write('hello hangfeng')
  response.end()
})
server.listen(3000,() => {
  console.log('loading')
})
```

- 重定向

```javascript
 // 客户端收到服务器响应的状态码是302 自动去响应头中找location
    res.statusCode = 302
    res.setHeader('Location','/')
```

```javascript

```

- npm 基本命令  
   +  --global (全局安装，当前在那个目录都可以)  缩写 -g
   + npm install  filename (安装filename)  filename：文件名  
   + npm i filename  效果与上一条相等  i 是 install 的缩写  
   + npm unstall filename

## 学习node第二天  

- 了解路径问题 
   +  "/"表示当前文件根目录  
   +  "./"表示在同一目录下  
   +  "../"表示上一级目录  
- 插件express  
   +  `app.use('/node_modules',express.static('./node_modules/'))` 开放资源资源 设置静态API  
   +  当express使用art-template时需要装express-art-template和art-template 前者依赖后者 
- 插件art-template 
   + 模版引擎  
- 核心模块`fs`  
   + `fs.readFile('./db.json',"utf8",function(err,data){})` 读取文件的时候是二进制形式，可以通过第二个参数utf8 ，告诉她弄成我们可以看懂的        字符    串或者data.toString()  
    
## 学习node第三天  

- 模块化  
   + 每个文件处理单独的内容，类似html,css,js,内容,样式,行为 相分离  
- callback  
   + 写的不多需要多写，多理解
   + 可以通过ajax的异步请求帮助理解  
- bootstrap  
   + 模版基本都有，可以复制copy  
- package-lock  
   + 下载时不会出现提高版本等级的现象，重下插件更加快。  
   
## 学习node第四天  

- mongoose  
   + 基本配置  
   ```javascript
   //引包
   var mongoose = require('mongoose')
   var Schema = mongoose.Schema
   //{ useNewUrlParser: true } 这个不能少
   mongoose.connect('mongodb://127.0.0.1:27017/itcast',{ useNewUrlParser: true })
   //限制类型 
   var userSchema = new Schema({
    name : String,
    age : Number,
    face : String
    })
    var User = mongoose.model("User",userSchema)
    var admin = new User({
    name : "ying",
    age: 1
    })
    //保存
    admin.save(function(err,data){
    console.log(data)
    })  
   ```   
- Promise  
   + Http-server & json-server  
   + art-template  
   + jquery  jquery有Promise的类似方法  
   ```javascript 
   //下面是jquery方法
   var data = {}
        $.get('http://127.0.0.1:3000/user/4')
            .then(function (user) {
                data.user = user
                return $.get('http://127.0.0.1:3000/jobs') //返回的值由下方76行jobs接受
            })
            .then(function (jobs) {
                data.jobs = jobs
                var htmlStr = template('tpl', data)
                //   console.log(htmlStr)
                document.querySelector('#user_form').innerHTML = htmlStr
                console.log('a')

            })  
   ```    
## 学习node第五天  

- path模块  
  + __dirname 和 __filename
  + **动态的** 获取当前文件或者文件所处目录的绝对路径
  + 用来解决文件操作路劲的相对路径问题
  + 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
  + 所以为了尽量避免这个问题，都建议文件操作的相对路劲都转为：**动态的绝对路径**
  + 方式：`path.join(__dirname, '文件名')` 避免手动添加路径时的小问题


   

  

