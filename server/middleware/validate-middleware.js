const validate = (Schema) => async(req , res , next) => {
    try {
    const parsebody = await Schema.parseAsync(req.body);
        req.body = parsebody;
        next()

    } catch (err) {
        const status = 422;
        const message = "fill the input properly"
        const extraDetails = err.errors[0].message; 

        const error = {
            status,
            message,
            extraDetails
        }
        console.log("error from validate middleware" , error)
        // res.status(400).json({message : message})
        next(error)

    }


}
module.exports = validate;