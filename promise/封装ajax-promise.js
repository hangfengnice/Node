
function ajax_get_Promise(url, callback){
  return new Promise((resolve, reject) => {
    var xml = new XMLHttpRequest()
    xml.onload = () => {
      // 防止链式调用 出错
      callback && callback(xml.responseText)
      resolve(xml.responseText)
    }
    xml.onerror = err => reject(err)
    xml.open('get',url)
    xml.send()
  })
}

//正常
ajax_get_Promise('./data/hello.txt',(data) => {
  // your coding
})

// 链式
ajax_get_Promise('./data/hello.txt')
.then((data) => {
  // your coding

})