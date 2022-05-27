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

    router.route("/events/:id")
    .get(
        [
            prams("id").isInt().withMessage("id should be int")
        ],
        controller.getEventbyid)
    .delete(
        [
            prams("id").isInt().withMessage("id should be int")
        ],
        controller.deleteEvents);
module.exports=router;
