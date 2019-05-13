var fs = require('fs')
fs.readFile('./data/hel.txt',function(error,data){
// console.log(data.toString());
console.log(error);
})