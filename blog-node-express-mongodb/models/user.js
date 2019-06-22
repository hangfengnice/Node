const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


const Schema = mongoose.Schema

const userSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  nickname:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  created_time:{
    type: Date,
    default: Date
  },
  last_modified_time:{
    type: Date,
    default: Date
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ""
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 根据状态 有不同权限
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User',userSchema)