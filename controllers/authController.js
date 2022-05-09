const jwt =require("jsonwebtoken");
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
        })
        .catch(error=>next(error));
        next(new Error("incorrect user or password!!"));
    }

}