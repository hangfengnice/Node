const fs = require('fs')

// 只接受一个参数
fs.writeFile('./data/hi.txt','hello yingying',(error) => {
  console.log('success')
  console.log(error) // null
})