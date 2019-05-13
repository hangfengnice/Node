var http = require("http");
var fs = require("fs");
var server = http.createServer();
server.on("request", function(req, res) {
  var url = req.url;
  if (url === "/") {
    fs.readFile("./resource/index.html", function(err, data) {
      if (err) {
        res.setHeader("Content-Type", "text/plain;charset=utf-8");
        res.end("文件读取失败，请稍后再试");
      } else {
        res.setHeader("Content-Type", "text/html;charset=utf-8");

        res.end(data);
      }
    });
  } else if (url == "/baba") {

    fs.readFile("./resource/ab2.jpg", function(err, data) {
        if (err) {
          res.setHeader("Content-Type", "text/plain;charset=utf-8");
          res.end("文件读取失败，请稍后再试");
        } else {
          res.setHeader("Content-Type", "image/jpeg");
  
          res.end(data);
        }
      });

  }
});
server.listen(3000, function() {
  console.log("servering");
});
