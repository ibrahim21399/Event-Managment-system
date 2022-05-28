//import pakages
const express=require("express");
const { body, param, query } = require("express-validator");


const router =express.Router();

const controller =require("../controllers/authController")





router.post("/login",controller.login);
module.exports=router;