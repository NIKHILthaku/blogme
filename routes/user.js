const express =require("express");
const user =require("../models/user");
const cookieParser = require("cookie-parser");
const router = express.Router();


router.get("/login" , (req,res)=>{
    return res.render("login")
})

router.get("/signin" , (req,res)=>{
    return res.render("signin")
})

router.get("/signin" , (req,res)=>{
    return res.render("signin")
})

router.post("/signin" ,async (req,res)=>{
  try{
    const {fullname , email , password} = req.body;
    await user.create({
        fullname,
        email,
        password,
    })
    return res.redirect("/")
  } catch(Error){
    return res.render("signin", {
        signinerror: "please enter the given information!"
    })
  }  
})
router.post("/login" , async (req,res)=>{
 try{
    const {email , password} = req.body;
    const token = await user.matchemailandpassword(email,password);
 
    return res.cookie("token",token).redirect("/");
 } catch(Error){
   return res.render("login", {
    error: "email and password is not correct",
   })
 }
 
})
router.get("/logout" ,(req,res)=>{
res.clearCookie("token").redirect("/");
})
module.exports=router;