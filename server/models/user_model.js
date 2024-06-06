const mongoose  = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    phone : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },

})
userSchema.pre('save' ,async function(next){
    const user = this;

    console.log("pre method" ,this)



    if(!user.isModified('password'))
    next()

    try {
        const salt_round = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password , salt_round)
        user.password = hash_password;
        
    } catch (error) {
        next(error)
        
    }
})

userSchema.methods.generateToken = async function(){

    try {
    console.log("this is the username" ,this.username)

        return jwt.sign(
            {
                username : this.username,
                userId : this._id.toString(),
                email : this.email,
                isAdmin : this.isAdmin,

            },
            
            process.env.JWT_SECRET_KEY,
    
            {
                expiresIn : "30d",
            }
        )
        
    } catch (error) {
        console.error("error from user model")
    }
    
}

const User = new mongoose.model("User" , userSchema);
module.exports = User;
