// const http = require('http');
// const fs = require('fs')
// const homePage = fs.readFileSync('index.html')
// const aboutPage = fs.readFileSync('about.html')
// const contactPage = fs.readFileSync('contact.html')
// const notFoundPage = fs.readFileSync('notfound.html')
const express = require('express')
const path = require('path')
const app = new express()
app.use(express.static('public'))
const ejs = require('ejs')
app.set('view engine','ejs')

app.listen(3333,()=>{
  console.log("App listening on port 3333")
})

app.get('/',(req,res)=>{
  //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
  res.render('index')
})
app.get('/about',(req,res)=>{
  // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
  res.render('about')

})
app.get('/post',(req,res)=>{
  // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
  res.render('post')

})
app.get('/contact',(req,res)=>{
  // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
  res.render('contact')

})

// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'index.html'))
// })
// app.get('/contact',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'contact.html'))
// })
// app.get('/about',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'about.html'))
// })
// const server = http.createServer((req,res) =>{
//   if(req.url === '/about')
//     res.end(aboutPage);
//   else if(req.url === '/contact')
//     res.end(contactPage);
//   else if(req.url === '/')
//     res.end(homePage);
//   else {
//     res.writeHead(404)
//     res.end(notFoundPage)
//   }
// })

// server.listen(3333)