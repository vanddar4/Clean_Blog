const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require ('express-session')
const fileUpload = require('express-fileupload')
const URI = require('dotenv').config({path: __dirname + '/.env'})

//Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
//console.log(require('dotenv').config())

//Creating custom middleware
const validateMiddleWare = require("./middleware/validateMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
// const customMiddleWare = (req,res,next)=>{
//   console.log('Custom middleware called')
//   next()
// }
const flash = require('connect-flash')

app.use(fileUpload())

//Mongoose - Need to connect to db with "mongod --config /usr/local/etc/mongod.conf"
//mongoose.connect('mongodb://localhost/clean_blog_db', 
mongoose.connect('dotenv',
  { useNewUrlParser: true,  
   useUnifiedTopology: true,
   useCreateIndex: true
   })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));
//In Case I want to use MongoDB Cloud mongo "mongodb+srv://cluster1.kec6x.mongodb.net/<dbname>" --username vanddar pass nexusair7

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3333;
}
app.listen(port, ()=>{
  console.log('App listening...')
})
// app.listen(3333,()=>{
//   console.log("App listening on port 3333")
// })

// app.use(customMiddleWare)
app.use('/posts/store',validateMiddleWare)

//Express Session
app.use(expressSession({
  secret: 'HibernationSquirrel2@',
  resave: true,
  saveUninitialized: true,
}))

//Accessing userId
global.loggedIn = null;
app.use("*",(req,res,next) => {
  loggedIn = req.session.userId;
  next()
})

app.use(flash());

//GET Routes
app.get('/posts/new', authMiddleware, newPostController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)

//POST Routes
app.post('/posts/store', authMiddleware, storePostController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

app.use((req, res) => res.render('notfound'));

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