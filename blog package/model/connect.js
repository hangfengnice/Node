const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
  .then(() => console.log('mongodb connect success!'))
  .catch(() => console.log('mongodb error'))