//packages
const express =require("express");
const{body,prams,query}=require("express-validator");

const router =express.Router();
const controller=require("./../controllers/EventsController")
//main url for all students routers 
router.route("/Events")

.get(controller.getAllEvents)

.post(
    [
        body("id").isInt().withMessage("id should be number"),
        body("title").isString().withMessage("required").notEmpty(),
        body("date").isDate().withMessage("date is invalid")
    ]
    ,controller.AddEvents)

.put(
    
    [
        body("id").isInt().withMessage("id should be number"),
        body("title").isString().withMessage("required").notEmpty(),
        body("date").isDate().withMessage("date is invalid")
    ]
    ,controller.updateEvents)

.delete(controller.deleteEvents)
 
router.get("/Events/:id",controller.getEventbyid);
module.exports=router;
