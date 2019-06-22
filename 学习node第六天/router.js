var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
    // console.log(req.session.user)
    res.render('index.html',{
        user : req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    // console.log(req.body)
    var body = req.body
    User.findOne({
        email : body.email,       
        password:  md5(md5(body.password))
    },function(err,user){
if(err){
    return res.status(500).json({
        err_code : 500,
        message : err.message
    })
}

if(!user){
    return res.status(200).json({
        err_code : 1,
        message : 'Email or password is invalid'
    })
}
//
req.session.user = user
res.status(200).json({
    err_code: 0,
    message:'Ok'
})
    })
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    //1.获取表单提交的数据
    //2.操作数据库
    //3.发送响应
    var body = req.body
    User.findOne({
        $or :[
            {
                email : body.email
            },
            {
                nickname : body.nickname
            }
        ]
    },function(err,data){
        if(err){
            return res.status(500).json({
                err_code : 500,
                message : '服务端错误'
            })
        }
        // console.log(data)
        if(data){
            return res.status(200).json({
                err_code : 1,
                message : 'Email or nickname already exists'
            })

        }
        body.password = md5(md5(body.password))
        new User(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                err_code : 500,
                    message : 'Internal error.'
                })
            }
            req.session.user = user
            res.status(200).json({
                err_code : 0,
                message : 'Ok'
            })
            // //服务端重定向 只针对同步请求
            // res.redirect('/')
        })
       
        
    })

})



router.get('/logout',function(req,res){
req.session.user = null
res.redirect('/login')
})




// router.post('/register', async function(req,res){
// var body = req.body
// try{
//     if(await User.findOne({email : body.email})){
//         return res.status(200).json({
//             err_code : 1,
//             message : '邮箱已存在'
//         })
//     }
//     if(await User.findOne({nicknam : body.nicknam})){
//         return res.status(200).json({
//             err_code : 2,
//             message : '昵称已存在'
//         })
//     }
//     body.password = md5(md5(body.password))

//     await new User(body).save()

//     res.status(200).json({
//         err_code : 0,
//         message : 'Ok'
//     })
    

// }catch(err){
//     res.status(500).json({
//         err_code : 500,
//         message : err.message
//     })
// }
// })


module.exports = router