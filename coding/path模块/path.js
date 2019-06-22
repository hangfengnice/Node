console.log(__dirname)  //  /Users/liyingying/Documents/Node/coding/path
console.log(__filename) //  /Users/liyingying/Documents/Node/coding/path/path.js

const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'../data/hello.txt'),'utf8',(err, data) => {
  console.log(data) //hello hangfeng
})
