const fs = require("fs");

var dbPath = "./data/db.json";
//找学生
exports.find = function(callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
};

exports.save = function(student, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = students.length
      ? parseInt(students[students.length - 1].id) + 1
      : 1;
    students.push(student);
    var fileData = JSON.stringify({
      students
    });

    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

//更新

exports.updataById = (student, callback) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;

    // EcmaScript 6 find
    var stu = students.find(item => {
      // 转成数字
      return item.id === parseInt(student.id);
    });
    // 遍历拷贝对象
    for (var key in student) {
      stu[key] = student[key];
    }
    var fileData = JSON.stringify({
      students
    });
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

//

exports.findById = function(id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var stu = students.find(item => {
      return item.id === parseInt(id);
    });
    callback(null, stu);
  });
};
// 根据ID删除学生
exports.deleteById = function(id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    // 返回元素下标
    var deleteId = students.findIndex(item => {
      return item.id === parseInt(id);
    });
    // 删除
    students.splice(deleteId, 1);

    var fileData = JSON.stringify({
      students
    });
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
