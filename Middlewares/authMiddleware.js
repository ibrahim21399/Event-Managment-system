//install pakages
const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{

let token,decodedtoken;
try{
  token= req.get("Authorization").split(" ")[1];
 decodedtoken=jwt.verify(token,"mysecretkey");

 //authanticated
req.decodedtoken=decodedtoken.role;
next();
}
catch(error){
    next(new Error("not Authorized"));
} 


}

