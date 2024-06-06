const express = require("express");
const authControllers = require("../controllers/auth-controller");
const router = express.Router();
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/authMiddleware");
const {signUpSchema , loginSchema} = require("../validators/auth_validator")




router.route('/').get(authControllers.home)
router.route("/register").post(validate(signUpSchema),authControllers.register); 
router.route("/login").post(validate(loginSchema), authControllers.login); 
router.route("/user").get(authMiddleware ,authControllers.user);

module.exports = router;