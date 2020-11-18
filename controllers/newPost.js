module.exports = (req,res) => {
  if(req.session.userId){
    return res.render("create",{
      createPost:true
    });
  }
  // session doesn't contain user id
  res.redirect('/auth/login')
}