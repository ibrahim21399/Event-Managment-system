//packages
const express =require("express");
const{body,prams,query}=require("express-validator");

const router =express.Router();
const controller=require("./../controllers/EventsController")
//main url for all students routers 
router.route("/Events")

.get(controller.getAllEvents)

.post(controller.AddEvents)

.put(controller.updateEvents)

.delete(controller.deleteEvents)
 
router.get("/Events/:id",controller.getEventbyid);
module.exports=router;
