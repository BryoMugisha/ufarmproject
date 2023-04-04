const express = require("express");
const router = express.Router();
// import model
const Register = require("../models/registerModel")

router.get("/register", (req,res)=>{
    res.render("register")
  });

// node sees files as modules
module.exports = router

// must be the same name as the post in the pug file
router.post("/register", async(req,res)=>{
    try{
        const register = new Register(req.body);
        await register.save()
        res.redirect("/students") // we redirect to a path
        console.log(req.body)
    } 
    catch (err){
        res.status(400).render("/")
        
    }

}) 
// we redirect to a path then render to a file
router.get("/students", async(req,res)=>{
    try {
        let items = await Register.find(); // find everyhting in Register and store it in the varibale items
        let fees = await Register.aggregate([
            {
                "$group": {_id: "$all",
                totalFees: {$sum: "$fees"} }
            }
        ])

        res.render("students",{students:items, total:fees[0]})
    } 
    catch (err){
        console.log(err)
        res.send("failed to retrieve student details")
    }
    
  });

// delete functionality 
router.post("/students/delete", async(req,res)=>{
    try {
        await Register.deleteOne({_id:req.body.id}); // inbuilt delete function keyword in express e.g delete all
        res.redirect("back") // keeps us on the same page
    } 
    catch (err){
        console.log(err)
        
    }
});

//update functionality
router.get("/edit_student/:id", async(req,res)=>{
    try {
        const item = await Register.findOne({_id:req.params.id});
        res.render("student_edit", {student:item});
    } 
    catch (err) {
        res.send("could not find student");
        console.log(err)
    }
});

// post route
router.post("/edit_student", async(req,res)=>{
    try {
        await Register.findOneAndUpdate({_id:req.query.id},req.body);
        res.redirect("/students")
    } 
    catch (err) {
        res.send("failed to update student details");
        console.log(err)
    }
});


  module.exports = router