const jwt = require("jsonwebtoken");
const secrat = "lundkhabc@123"

function createtokenfromuser(user){
    const payload = {
        _id :user._id ,
        email: user.email,
        profilphoto:user.profilphoto,
        role:user.role,

    }
    const token  = jwt.sign(payload , secrat);
    return token;
}


function validatetoken(token){
    const paylod = jwt.verify(token ,secrat);
    return paylod;
}

module.exports={
 createtokenfromuser,
 validatetoken,   
}