require('dotenv').config()

const express = require("express");
const path =require("path");
const router = require("./routes/user");
const blogrouter = require("./routes/blog");
const mon = require("mongoose")
const cookie =require("cookie-parser");
const ejs =require("ejs");
const all = require("./models/blog");
const { authuser } = require("./middleware/verf");


const port = process.env.PORT || 8002;
const app = express();

mon.connect(process.env.MONGOS_URL).then( ()=>{
    console.log("database is connected");
})
app.use(express.static(path.resolve("./newpublic")));
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

app.use(cookie());
app.use(authuser("token"));

app.get("/",async (req,res)=>{
    const allblog = await all.find({}).populate("createdby"); 
    return res.render("Home",{
      here: req.user,  
      showblog: allblog,
    });
})

app.use("/user" , router);
app.use("/blog" ,blogrouter);


app.listen(port,()=>{
    console.log(`my server is started in the port = ${port}`);
})


