# node  


## 学习node第一天  
- npm 基本命令  
    +  --global (全局安装，当前在那个目录都可以)  缩写 -g
    + npm install  filename (安装filename)  filename：文件名  
    + npm i filename  效果与上一条相等  i 是 install 的缩写  
    + npm unstall filename

-   




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
  

