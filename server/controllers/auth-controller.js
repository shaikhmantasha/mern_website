const User = require("../models/user_model")
const bcrypt = require("bcrypt")


const home = async (req, res) => {
    try {
        res.status(200).send("this is the home page wala")

    } catch (error) {
        console.log("error from home logic",error)
    }
}

// Registration Logic
const register = async (req, res) => {
    try {
        console.log("register req.body" ,req.body)
        const { username, email, phone, password} = req.body;
        // console.log("register" , req.body)

        const userExist = await User.findOne({ email });

        if (userExist) {
           return res.status(400).json({msg : "Email already exists"});
        }

        const userCreated = await User.create({ username ,email , phone, password})
        res.status(201).json({ msg: "Registration Successfull", token: await userCreated.generateToken() , userId : userCreated._id.toString()})
        // res.status(401).json({msg : "this is the data hhona cbhaiye"})
        console.log("user" , userCreated)
    } catch (error) {
        res.status(500).json("ERRROR from register logic")
    }   
}

//USER LOGIN LOGIC
const login = async(req , res) => {
    try {
        const {email , password} = req.body;
        console.log("login ka req.body" , req.body)
        const userExists = await User.findOne({email});
        console.log(userExists)

        if(!userExists){
            return res.status(400).json({msg : "User does not exist"})
        }
        const user = await bcrypt.compare(password , userExists.password);

        if(user){
            res.status(200).json({msg : "Login Succesfull" , token :await userExists.generateToken(),
             userId : userExists._id.toString(),
            })
        }
        else{
            res.status(401).json({message : "invalid email or password"})
        }

    } catch (error) {
        res.status(400).json("internal server error in login in auth controller ")
    }
}

// get user data

const user =async (req , res) => {
    try {
        const userData = req.user;
        console.log("auth controller userDAta",userData);
        
        return res.status(200).json({userData})

        // return res.status(200).json({userData})
    } catch (error) {
        console.log("error form user controller in auth controller" , error)
        
    }
}


module.exports = { home, register , login , user}