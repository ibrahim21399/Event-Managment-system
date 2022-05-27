const jwt =require("jsonwebtoken");
const student = require("./../modules/StudentsModel");
const speaker = require("./../modules/SpeakersModel");
const checkValidation = require("./../Middlewares/checkValidation");

let admin = false;

module.exports.login=(request,response,next)=>{
    const students =require("./../modules/StudentsModel")
    let token;
    if(request.body.email=="admin@gmail.com"&&request.body.password=="admin123")
    {
       token = jwt.sign({_id:data._id,email:data.email,role:"admin"},"mysecretkey",{expiresIn:"1h"});
       response.status(200).json({msg:"admin login",token})
        
       admin=true;
    }
    else if(admin==false){
        students.findOne({email:request.body.email,password:request.body.password})
        .then(data=>{
            if(data==null)throw new Error("incorrect user or password!!");

            token = jwt.sign({_id:data._id,email:data.email,role:"student"},"mysecretkey",{expiresIn:"1h"});
            response.status(200).json({msg:"student login",token})
            console.log("student");
            
        })
        .catch(error=>next(error));
        next(new Error("incorrect user or password!!"));
    }

    if (admin==false) {
        // check if it's a speaker
        console.log("speaker");
        await speaker.findOne({
            Email: request.body.Email
            ,password:request.body.password})
            .then(data=>{
                if(data==null)throw new Error("incorrect user or password!!");
    
                token = jwt.sign({_id:data._id,email:data.email,role:"student"},"mysecretkey",{expiresIn:"1h"});
                response.status(200).json({msg:"Speakerlogin",token})
                console.log("speaker");
                
            })
            .catch(error=>next(error));
            next(new Error("incorrect user or password!!"));
        }

}