const adminMiddleware = (req , res , next) => {
    try {
        const adminRole = req.user.isAdmin;
        console.log("this is the admin" , req.user);
        if(!adminRole){
            return res.status(403).json({msg : "access denied you are not the Admin"})
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = adminMiddleware;