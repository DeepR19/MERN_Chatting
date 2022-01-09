const jwt  = require("jsonwebtoken");
const Register = require("../models/usersSchema");

const auth = async (req, res, next) => {
       
    try{ 
       
        const token = req.cookies.jwtoken;
        
        const verifyToken = jwt.verify(token, "mynameisdeepakfromcomputerbranch");

        const id = verifyToken;
        // console.log(id)
        const rootUser = await Register.findOne({_id: id._id, "tokens.token": token});

        if(!rootUser){ 
            console.log("user not found");
            throw new Error("User not Found")
        };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    }
    catch(e){
        res.status(401).send("Unauthorized: No token provided");
    }
}


module.exports = auth;