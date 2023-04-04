const express = require("express");
const router = express.Router();
// import model
const User = require("../models/userModel")

router.get("/signup", (req,res)=>{
    res.render("signup")
  });

  router.post("/signup", async(req,res)=>{
    console.log(req.body)
    try{
       const user = new User(req.body);
       let userName = await User.findOne({username: req.body.username})
      if(userName){
        return res.send("this unique id already exists")
      }
      else{
        await User.register(user,req.body.password,(error)=>{
          if(error){
            throw error
          }
  
        res.redirect("/students")
    })
  }
  }
    catch(error){
        res.status(400).send("sorry it seems there is trouble ccessing this page")
        console.log(err)
    }
})

  module.exports=router