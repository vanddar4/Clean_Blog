const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/clean_blog_db', {useNewUrlParser: true})

BlogPost.create({
  title: 'Trying Again',
  body: 'By Nerrad Vanddar'
}, (error, blogpost) =>{
  console.log(error,blogpost)
})