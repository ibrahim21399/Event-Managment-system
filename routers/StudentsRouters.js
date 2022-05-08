//packages
const express =require("express");
const{body,prams,query}=require("express-validator");

const router =express.Router();
const controller=require("./../controllers/StudentsController");
//main url for all students routers 
router.route("/students")

.get(controller.getAllstudents)

.post(
    //array of functions 
    [
        body("id").isInt().withMessage("id should be numbers"),
        body("name").isAlpha().withMessage("name should be in letters").isLength({max:10}).withMessage("should be <10")
    ]
    ,controller.AddStutent)

.put(controller.updateStudent)

.delete(controller.deleteStutent)
 
router.get("/students/:id",controller.getstudentbyid);
module.exports=router;
