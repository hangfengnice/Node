const fs = require('fs')

// 读取文件目录
fs.readdir('/User/liyingying',(err, files) => {
  console.log(files)
})
