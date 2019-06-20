const fs = require('fs')

fs.readFile('./data/hello.txt',(error, data) => {
  // 文件中存储的都是二进制 
  // 二进制转为16进制l
  console.log(data)//<Buffer 68 65 6c 6c 6f 20 68 61 6e 67 66 65 6e 67 0a>
  console.log(data.toString()) //hello hangfeng
  console.log(error) // null
  // 如果出错 data为undefined
})