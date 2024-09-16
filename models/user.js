const mongoose = require("mongoose");
const { createHmac, randomBytes} = require("crypto")
const{createtokenfromuser }=require("../service/auth")
const data = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
       
    },
    password: {
        type: String,
        required: true,
    },
    profilephoto: {
        type: String,
        default:"/images/defalt.jpg"
    },
    role:{
        type: String,
        enum:["USER" , "ADMIN"],
        default: "USER",
    }
}, { timestamps: true });

data.pre('save', function(next){
    const user =this;
    if(!user.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hashpassword = createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt =salt;
    this.password = hashpassword;
    next();
})
data.static("matchemailandpassword",async function(email,password){
    const user = await this.findOne({email});
    if(!user){
        throw new Error("user not found")
    }
    const salt = user.salt;
    const hashpassword = user.password;
    const userprovided = createHmac("sha256" , salt).update(password).digest("hex");

    if(hashpassword!==userprovided){
        throw new Error("Email and password not match");
    } 
    const token = createtokenfromuser(user);
    return token;
    }
)
const create = mongoose.model("users" , data);

module.exports=create;
