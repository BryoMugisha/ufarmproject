const express = require("express");
const { resolve } = require('path');
const app = express();
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("passport")

// creates an environment file for private data
// require("dotenv").config();
const User = require("./models/userModel")
const config = require("./config/database")

const employeeRoutes = require("./routes/employeeRoutes")
const cartRoutes = require("./routes/cartRoutes")
const contactRoutes = require("./routes/contactRoutes")
const aboutRoutes = require("./routes/aboutRoutes")
const agricRoutes = require("./routes/agricRoutes")
const registerRoutes = require("./routes/registerRoutes")
const signupRoutes = require("./routes/signupRoutes")
const authRoutes = require("./routes/authRoutes")

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized:false
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


// creating mongodb connection
mongoose.connect(config.database,{
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
const db = mongoose.connection

// checking if db has connected
db.once("open", ()=>{
  console.log("connected to db")
})
db.on("error",(err)=>{
  console.error(err)
})



app.set("view engine","pug")
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public"))); 


// router.get("/", (req,res)=>{  
//   res.render("employees")
// })


  
app.use("/",employeeRoutes)
app.use("/",cartRoutes)
app.use("/",contactRoutes)
app.use("/",aboutRoutes)
app.use("/",agricRoutes)
app.use("/",registerRoutes)
app.use("/",signupRoutes)
app.use("/",authRoutes)
app.use("/auth/register",router)



app.get("*", (req,res)=>{
  res.status(404).send("page does not exist")
})


app.listen(3000, () => 
console.log('listening on port 3000'));