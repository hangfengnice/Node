const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./router");
const session = require("express-session");

var app = express();

app.use("/public/", express.static(path.resolve(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("html", require("./node_modules/express-art-template/src"));
app.set("views", path.join(__dirname, "./views")); // 默认就在 views 方便修改

app.use(
  session({
    secret: "keyboard cat", // 原来基础上加上字符串加密 防止恶意修改
    resave: false,
    saveUninitialized: true // 无论是否使用 session 默认给一个 session
  })
);

// 路由挂载到app
app.use(router);

app.listen(3000, err => console.log("running.."));
