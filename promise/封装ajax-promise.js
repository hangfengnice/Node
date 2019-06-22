
function ajax_get_Promise(url, callback){
  return new Promise((resolve, reject) => {
    var xml = new XMLHttpRequest()
    xml.onload = () => {
      callback && callback(xml.responseText)
      resolve(xml.responseText)
    }
    xml.onerror = err => reject(err)
    xml.open('get',url)
    xml.send()
  })
}