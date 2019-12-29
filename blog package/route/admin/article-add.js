const formidable = require('formidable')
const path = require('path')
const {Article} = require('../../model/article')

module.exports = (req, res) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm()
  // 配置上传文件的存放位置
  form.uploadDir = path.join(__dirname, '../../public/uploads')
  // 保留上传文件的后缀
  form.keepExtensions = true
  // 解析表单
  form.parse(req, async (err, fields, files) => {
    // 2. fields 普通表单数据
    // 3. files 上传文件的相关数据
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate || Date.now(),
      cover: files.cover.path.split('public')[1],
      content: fields.content
    })
    res.redirect('/admin/article')
  }) 
}