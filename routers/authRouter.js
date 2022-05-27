//import pakages
const express=require("express");
const { body, param, query } = require("express-validator");


const router =express.Router();

const controller =require("../controllers/authController")





router.post("/login")
    .post(
        [
            body("email").isEmail().withMessage("email is not correct"),
            body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15")
        ],controller.login);

module.exports=router;