const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// console.log(URI)
// mongoose.connect(URI);



const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection Successfull")
        
    } catch (error) {
        
        console.log("connection Failed" + error)
        process.exit(0);
    }
}

module.exports = connectDb;


