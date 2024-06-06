const {z} = require('zod')

const signUpSchema = z.object({
    username : z
    .string({required_error :"Name is Required"})
    .trim()
    .min(3 , {message : "name must be atleast 3 characters long"})
    .max(256 , {message: "name must not be more than 256 letters"}),

    email : z
    .string({required_error :"email is Required"})
    .trim()
    .email({message : "Invalid Email Adress"})
    .min(3 , {message : "name must be atleast 3 characters long"})
    .max(256 , {message: "name must not be more than 256 letters"}),

    phone : z
    .string({required_error :"phone is Required"})
    .trim()
    .min(10 , {message : "phone must be atleast 10 characters long"})
    .max(20 , {message: "phone must not be more than 20 characters"}),

    password : z
    .string({required_error :"password is Required"})
    .min(6 , {message : "passwrod must be atleast 6 characters long"})
    .max(20, {message: "password must not be more than 20 letters"}),

})

const loginSchema = z.object({
    email : z
    .string({required_error :"email is Required"})
    .trim()
    .email({message : "Invalid Email Adress"})
    .min(3 , {message : "name must be atleast 3 characters long"})
    .max(256 , {message: "name must not be more than 256 letters"}),

    password : z
    .string({required_error :"password is Required"})
    .min(6 , {message : "passwrod must be atleast 6 characters long"})
    .max(20, {message: "password must not be more than 20 letters"}),

})

module.exports = {signUpSchema , loginSchema};