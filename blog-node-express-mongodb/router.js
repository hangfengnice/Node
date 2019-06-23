const express = require("express");

const router = express.Router();

var User = require("./models/user");

router.get("/", (req, res) => {
  res.render("index.html", {
    user: req.session.user
  });
});

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", (req, res) => {
  res.render();
});

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.post("/register", (req, res) => {
  // 获取表单提交数据
  const body = req.body;
  User.findOne(
    {
      $or: [
        {
          email: body.email
        },
        {
          nickname: body.nickname
        }
      ]
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({
          error_code: 500,
          message: "server error"
        });
      }
      if (data) {
        return res.status(200).json({
          error_code: 1,
          message: "email or nickname already exist"
        });
      }
      new User(body).save((err, user) => {
        if (err) {
          return res.status(500).json({
            error_code: 500,
            message: "server error"
          });
        }
        req.session.user = user;
        res.status(200).json({
          error_code: 0,
          message: "ok"
        });
      });
    }
  );
});

module.exports = router;
