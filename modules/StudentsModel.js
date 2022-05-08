//import pakages
const mongoose=require("mongoose");

//create schema
let StudentSchema =new mongoose.Schema({
    _id:{type: Number, required:true},
    name:{type:String,required:true},
    Email: {type: String, required: true},
    password: {type: String, required: true}
})


//register to acollection
module.exports = mongoose.model("students", StudentSchema);
