var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/itcast',{ useNewUrlParser: true })

var userSchema = new Schema({
    name : String,
    age : Number,
    face : String

})

var User = mongoose.model("User",userSchema)

var admin = new User({
    name : "ying",
    age: 12
})

admin.save(function(err,data){
console.log(data)
})
