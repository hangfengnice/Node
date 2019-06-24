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

router.post("/login", (req, res, next) => {
  // 获取表单数据
  // 查询数据库用户名是都正确
  // 发送响应数据
  let body = req.body
  User.findOne({
    email: body.email,
    password: body.password
  }, (err, user) => {
    if(err){
      // return res.status(500).json({
      //   err_code: 500,
      //   message: err.message
      // })
      return next(err)
    }

    if(!user){
      return res.status(200).json({
        err_code: 1,
        message: "Email or password is invalid"
      })
    }

    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  })
});

router.get('/logout', (req, res) => {
  // 清除登录状态
  req.session.user = null
  // 重定向登录页面  a 链接是同步请求

  res.redirect('/login')
})

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.post("/register", (req, res, next) => {
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
        // return res.status(500).json({
        //   error_code: 500,
        //   message: "server error"
        // });
        return next(err)
      }
      if (data) {
        return res.status(200).json({
          error_code: 1,
          message: "email or nickname already exist"
        });
      }
      new User(body).save((err, user) => {
        if (err) {
          // return res.status(500).json({
          //   error_code: 500,
          //   message: "server error"
          // });
          return next(err)
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
