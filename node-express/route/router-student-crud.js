
const express = require("express");

var router = express.Router();

var Student = require("../student");

router.get("/students", (req, res) => {
  // fs.readFile('./data/db.json', 'utf8', (err, data) => {
  //   if(err){
  //     return res.status(500).send('error')
  //   }
  //   // console.log(typeof data) // string
  //   // 文件读取的是字符串,需要手动转成对象
  //   var students = JSON.parse(data).students
  //   res.render('student-index.html', {
  //     fruits: [
  //       '西瓜',
  //       '苹果',
  //       '橘子',
  //       '香蕉'
  //     ],
  //     students
  //   })
  // })

  Student.find((err, students) => {
    if (err) {
      return res.status(500).send("error");
    }
    res.render('student-index.html', {
          fruits: [
            '西瓜',
            '苹果',
            '橘子',
            '香蕉'
          ],
          students
        })

  });
});

router.get("/students/new", (req, res) => {
  res.render("students-new.html");
});

router.post("/students/new", (req, res) => {
  Student.save(req.body, err => {
    if (err) {
      return res.status(500).send("error");
    }
    res.redirect('/students')
  })
});

module.exports = router;

// module.exports = ( app ) => {
//   app.get('/', (req, res) => {
//     fs.readFile('./data/db.json', 'utf8', (err, data) => {
//       if(err){
//         return res.status(500).send('error')
//       }
//       // console.log(typeof data) // string
//       // 文件读取的是字符串,需要手动转成对象
//       var students = JSON.parse(data).students
//       res.render('student-index.html', {
//         fruits: [
//           '西瓜',
//           '苹果',
//           '橘子',
//           '香蕉'
//         ],
//         students
//       })
//     })
//   })
// }
