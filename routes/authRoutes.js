const express = require("express");
const { Model } = require('mongoose');
const passport = require("passport");
const router = express.Router();
// imported model
const User = require("../models/userModel")

router.get("/login", (req,res)=>{
    res.render("Login")
  });

router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}),async(req,res)=>{
    req.session.user = req.user
    let userExist = await User.findOne({username: req.user.username,password: req.user.password});
    console.log("this user exists", userExist)
    console.log("this is the user session", req.session)
    res.redirect("/students")
})


module.exports = router


