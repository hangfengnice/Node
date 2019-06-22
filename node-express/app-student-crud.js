const express = require("express");
const router = require("./route/router-student-crud");
// const router = require('./route/router')
var bodyParser = require("body-parser");

const app = express();

app.use("/public/", express.static("./public/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("html", require("express-art-template"));

app.use(router);

app.listen(3000, err => {
  console.log("running");
});
