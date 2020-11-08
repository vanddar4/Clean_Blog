const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = new express()
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.listen(3333,()=>{
  console.log("App listening on port 3333")
})

//Mongoose
mongoose.connect('mongodb://localhost/clean_blog_db', 
  { useNewUrlParser: true,  
   useUnifiedTopology: true,
   useCreateIndex: true
   })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));
//In Case I want to use MongoDB Cloud mongo "mongodb+srv://cluster1.kec6x.mongodb.net/<dbname>" --username vanddar pass nexusair7

//Creating custom middleware
const validateMiddleWare = require("./middleware/validateMiddleware");
const customMiddleWare = (req,res,next)=>{
  console.log('Custom middleware called')
  next()
}
app.use(customMiddleWare)
app.use('/posts/store',validateMiddleWare)

//Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')


app.get('/posts/new', newPostController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/auth/register', newUserController)
app.get('/auth/login', loginController)

app.post('/posts/store', storePostController)
app.post('/users/register', storeUserController)
app.post('/users/login', loginUserController)


// Old Code
// const http = require('http');
// const fs = require('fs')
// const homePage = fs.readFileSync('index.html')
// const aboutPage = fs.readFileSync('about.html')
// const contactPage = fs.readFileSync('contact.html')
// const notFoundPage = fs.readFileSync('notfound.html')
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'index.html'))
//     res.sendFile(path.resolve(__dirname, 'pages/index.html'))
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
// app.get('/about',(req,res)=>{
//   // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
//   res.render('about')
// })
// app.get('/contact',(req,res)=>{
//   // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
//   res.render('contact')
// })
// const path = require('path')
// const BlogPost = require('./models/BlogPost.js')
//Routes
// app.get('/', async (req,res)=>{
//   const blogposts = await BlogPost.find({})
//   res.render('index',{
//     blogposts
//   });
//   //console.log(blogposts)
// })
// app.get('/post/:id',async (req,res)=>{
//   //console.log(req.params)
//   const blogpost = await BlogPost.findById(req.params.id)
//   res.render('post', {
//     blogpost
//   })
// })
// app.post('/posts/store', async (req,res)=>{
//   console.log(req.body)
//   let image = req.files.image;
//   image.mv(path.resolve(__dirname,'public/img', image.name), async(error)=>{
//     await BlogPost.create({
//       ...req.body,
//       image:'/img/' + image.name
//     })  
//     res.redirect('/')
//   })
// })