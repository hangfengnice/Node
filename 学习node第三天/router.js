var fs = require('fs')

var express = require('express')

var Student = require('./edit')

var router = express.Router()



router.get('/', function (req, res) {
    // fs.readFile('./post.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('Server error')
    //     }
    //     var posts = JSON.parse(data).posts
    //     res.render('index.html',{
    //         posts:posts
    //     })
    // })
    Student.find(function(err,posts){
       if(err){
           return res.status(300).send("server error")
       }
       res.render('index.html',{
           posts: posts
       })
    })



})

router.get('/new',function(req,res){
    res.render('new.html')
})


router.post('/new',function(req,res){
Student.save(req.body,function(err){
    if(err){
        return res.status(300).send('server bad')
    }
    // console.log(req.body)
    res.redirect('/')


})
})




module.exports = router