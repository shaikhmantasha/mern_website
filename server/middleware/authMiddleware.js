const jwt = require("jsonwebtoken");
const User = require("../models/user_model");


const authMiddleware = async(req , res , next) => {
    const token = req.header("Authorization");

    if(!token){
       return res.status(401).json({message : "token not found in auth middle ware"})
    }

    const jwtToken = token.replace("Bearer" , "").trim();
    console.log(jwtToken)

    try {
        const isVerified = jwt.verify(jwtToken , process.env.JWT_SECRET_KEY);
        // console.log(isVerified);

        const userData = await User.findOne({email: isVerified.email}).select({password:0,})
        console.log("userdata auth middleware" , userData)

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        
        next();

        
    } catch (error) {
        return res.status(404).json({message : "json web token error"})
    }
}
module.exports = authMiddleware;

