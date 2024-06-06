const Service = require("../models/service-model")

const services =async(req , res) => {
    try {
        const response = await Service.find();
        if(!response){
            res.status(404).json({msg : "No Service Found"})
            return;
        }
        res.status(200).json({msg : response})


        
    } catch (error) {
        console.log(`services error ${error}`)
    }
}

module.exports = services