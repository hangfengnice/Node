# Node

## 核心模块

- fs 文件操作模块
- http 网络服务构建模块
- os 操作系统模块
- path 路径处理模块
- url 路径操作模块

## 模块系统

- require

- 模块引入语法

```javascript
var 自定义变量名称 = require("模块");
```

- 作用

  - 加载文件模块并且执行里面的代码
  - 拿到被加载文件模块导出的接口对象

- 模块导出
  - 推荐使用`module.exports`. `exports` 是`module.exports`引用

```javascript
var exports = module.exports;
```

- 导出多个成员

```javascript
exports.add = () => {};
exports.num = 2;
```

- 导出单个成员

```javascript
module.exports = function() {};
```

- 第三方模块加载过程

```javascript
//以 art-template 为例
var template = require("art-template");
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

## 服务器级别的 API

- fs -- 操作文件

```javascript
const fs = require("fs"); // 必须要引入"fs" 模块

// 读文件
fs.readFile("./data/hello.txt", (error, data) => {
  // 文件中存储的都是二进制
  // 二进制转为16进制l
  console.log(data); //<Buffer 68 65 6c 6c 6f 20 68 61 6e 67 66 65 6e 67 0a>
  console.log(data.toString()); //hello hangfeng
  console.log(error); // null
  // 如果出错 data为undefined
});

// 写文件

// 只接受一个参数
fs.writeFile("./data/hi.txt", "hello yingying", error => {
  console.log("success");
  console.log(error); // null
});
```

- http

```javascript
const http = require("http");
const server = http.createServer();
server.on("request", function(request, response) {
  console.log("收到请求");
  // res.setHeader('Content-type','text/plain;charset=utf-8')// 告诉浏览器按什么模式来解析
  response.write("hello hangfeng");
  response.end();
});
server.listen(3000, () => {
  console.log("loading");
});
```

- 重定向

```javascript
// 客户端收到服务器响应的状态码是302 自动去响应头中找location
res.statusCode = 302;
res.setHeader("Location", "/");
```

```javascript
```

## npm

- 基本命令
  - --global (全局安装，当前在那个目录都可以) 缩写 -g
  - npm install filename (安装 filename) filename：包名
  - npm i filename 效果与上一条相等 i 是 install 的缩写
  - npm unstall filename 删除包名

## express

- 静态资源
  - 直接访问`http://127.0.0.1:3000/hello.txt`

```javascript
var express = require("express");
var app = express();
app.use(express.static("./public/")); // 访问public目录下不需要/public/
```

- 加上/public/访问`http://127.0.0.1:3000/public/hello.txt`

```javascript
var express = require("express");
var app = express();
app.use("/public/", express.static("./public/")); // 访问public目录需要/public/
```

- art-template
  - 当 express 使用 art-template 时需要装`express-art-template`和`art-template`前者依赖后者
  - 配置

```javascript
// 下面第一个参数为文件的后缀名
app.engine("html", require("express-art-template"));
// express 为 response 相应对象提供一个方法: render
// render 默认无法使用,需要配置模版引擎
// res.render('html模版名',{模版数据})
// 第一个参数不写路径,默认到项目目录中 views 目录查找文件
// 就是说 express 有一个约定: 开发人员把所有视图文件都放到 views 目录中

// 如果希望改路径 app.set('views',目录路径)
app.get("/", (req, res) => {
  res.render("index.html");
});
```

- 获取 post 请求的数据
  - bodyParser

```javascript
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//使用
app.post("/post", (req, res) => {
  const comment = req.body;
  comment.dateTime = Date();
  comments.unshift(comment);
  // 重定向
  res.redirect("/");
});
```

## 封装调用

- 调用文件

```javascript
const express = require("express");

var router = express.Router();

var Student = require("../student");

router.get("/students", (req, res) => {
  // fs.readFile('./data/db.json', 'utf8', (err, data) => {
  //   if(err){
  //     return res.status(500).send('error')
  //   }
  //   // console.log(typeof data) // string
  //   // 文件读取的是字符串,需要手动转成对象
  //   var students = JSON.parse(data).students
  //   res.render('student-index.html', {
  //     fruits: [
  //       '西瓜',
  //       '苹果',
  //       '橘子',
  //       '香蕉'
  //     ],
  //     students
  //   })
  // })

  Student.find((err, students) => {
    if (err) {
      return res.status(500).send("error");
    }
    res.render("student-index.html", {
      fruits: ["西瓜", "苹果", "橘子", "香蕉"],
      students
    });
  });
});

router.get("/students/new", (req, res) => {
  res.render("students-new.html");
});

router.post("/students/new", (req, res) => {
  Student.save(req.body, err => {
    if (err) {
      return res.status(500).send("error");
    }
    res.redirect("/students");
  });
});

router.get("/students/edit", (req, res) => {
  Student.findById(parseInt(req.query.id), (err, student) => {
    if (err) {
      return res.status(500).send("error");
    }
    res.render("students-edit.html", {
      student
    });
  });
});

router.post("/students/edit", (req, res) => {
  Student.updataById(req.body, err => {
    if (err) {
      return res.status(500).send("error");
    }
    res.redirect("/students");
  });
});

router.get("/students/delete", (req, res) => {
  Student.deleteById(parseInt(req.query.id), err => {
    if (err) {
      return res.status(500).send("error");
    }
    res.redirect("/students");
  });
});

module.exports = router;

// module.exports = ( app ) => {
//   app.get('/', (req, res) => {
//     fs.readFile('./data/db.json', 'utf8', (err, data) => {
//       if(err){
//         return res.status(500).send('error')
//       }
//       // console.log(typeof data) // string
//       // 文件读取的是字符串,需要手动转成对象
//       var students = JSON.parse(data).students
//       res.render('student-index.html', {
//         fruits: [
//           '西瓜',
//           '苹果',
//           '橘子',
//           '香蕉'
//         ],
//         students
//       })
//     })
//   })
// }

```

- 封装文件

```javascript
const fs = require("fs");

var dbPath = "./data/db.json";
//找学生
exports.find = function(callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
};

exports.save = function(student, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = students[students.length - 1].id + 1;
    students.push(student);
    var fileData = JSON.stringify({
      students
    });
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

//更新
exports.updataById = (student, callback) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    // EcmaScript 6 find
    var stu = students.find(item => {
      return item.id === student.id;
    });
    // 遍历拷贝对象
    for (var key in student) {
      stu[key] = student[key];
    }
    var fileData = JSON.stringify({
      students
    });
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

// 根据id找学生
exports.findById = function(id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var stu = students.find(item => {
      return item.id === id;
    });
    callback(null, stu);
  });
};
// 根据ID删除学生
exports.deleteById = function(id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    // 返回元素下标
    var deleteId = students.findIndex(item => {
      return item.id === id;
    });
    // 删除
    students.splice(deleteId, 1);
    var fileData = JSON.stringify({
      students
    });
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
```

## Promise

- promise readFile 函数封装

```javascript
const fs = require('fs')

function promiseReadFile(filePath){
 return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
        reject(err)
      }
      else{
        resolve(data)
      }
    })
  })
}

promiseReadFile('./data/hello.txt')
  .then((data) => {
    console.log(data)
    return promiseReadFile('./data/learn.txt')
  })
  .then((data) => {
    console.log(data)
    return promiseReadFile('./data/play.txt')
  })
  .then((data) => {
    console.log(data)
  })
```
