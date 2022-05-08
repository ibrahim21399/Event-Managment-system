//packages
const express =require("express");
const{body,prams,query}=require("express-validator");

const router =express.Router();
const controller=require("./../controllers/SpeakersController");
//main url for all students routers 
router.route("/speakers")

.get(controller.getAllSpeakers)

.post(
    //array of functions 
    [
        body("email").isEmail().withMessage("enter valid email"),
        body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15 numbers and letters"),
        body("username").notEmpty().withMessage("username is missing ")
    ]
    ,controller.addSpeaker)

.put(
    [
        body("email").isEmail().withMessage("enter valid email"),
        body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15 numbers and letters"),
        body("username").notEmpty().withMessage("username is missing ")
    ]
    ,controller.updateSpeaker)


.delete(controller.deleteSpeaker) 
router.get("/speakers/:id",controller.getSpeakerByID);
module.exports=router;
