const session = require('express-session');
const path = require('path')
const BlogPost = require('../models/BlogPost.js')

module.exports = (req,res) =>{
  let image = req.files.image;
  image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error)=>{
    await BlogPost.create({
      ...req.body,
      image: '/img/' + image.name,
      userid: req.session.userId
    })
    res.redirect('/')
  })
}