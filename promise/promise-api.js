const fs = require('fs')

console.log(1)

new Promise(() => {
  console.log(2)
  fs.readFile('./data/hello.txt', 'utf8', (err, data) => {
    if(err){
      console.log(err)
    }
    else{
      console.log(3)
    }
    console.log(data)
    
  })
})

console.log(4)

//node 执行该文件后输出:

// 1
// 2
// 4
// 3
// hello hangfeng
