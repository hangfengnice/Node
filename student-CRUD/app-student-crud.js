const express = require("./node_modules/express");
const router = require("./route/router-student-crud");
// const router = require('./route/router')
var bodyParser = require("./node_modules/body-parser");

const app = express();

app.use("/public/", express.static("./public/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("html", require("./node_modules/express-art-template/src"));

app.use(router);

app.listen(3000, err => {
  console.log("running");
});
