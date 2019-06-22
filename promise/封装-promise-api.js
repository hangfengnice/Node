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
