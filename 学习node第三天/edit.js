var fs = require('fs')

var dbPath = './post.json'

exports.find = function (callback){
fs.readFile(dbPath,'utf8',function(err,data){
if(err){
    return callback(err)
}
callback(null,JSON.parse(data).posts)
})
}

exports.save =function(student,callback){
fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
        return callback(err)
    }
    var posts = JSON.parse(data).posts
    
    student.id = posts[posts.length-1].id +1;
    posts.push(student)
    var ret = JSON.stringify({
        posts:posts
    })
    fs.writeFile(dbPath,ret,function(err,data){
        if(err){
        return callback(err)
            
        }
        callback(null)
    })
})
}