//import pakages
const express=require("express");
const body_parser=require("body-parser");
const mongoose =require("mongoose");


const studentrouter =require("./routers/StudentsRouters");
const speakersrouter=require("./routers/SpeakerRouters");
const Eventsrouter =require("./routers/EventsRouters");
const authRouter =require("./routers/authRouter");


//create server 
const server=express();
//db connection
mongoose.connect("mongodb://localhost:27017/events")
.then(()=>{
    console.log("DB connected");
    //listen port number
    server.listen(process.env.PORT||8080,()=>{
    console.log("I'm Listenin.....");
});
})
.catch(error=>{
    console.log("db connection failed");
})

//logger middleware
server.use((request,respons,next)=>{
    console.log(request.url,request.method);
    next();
});

//body parser mW
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

//authantication mw
server.use((request,response,next)=>{
    //response.send("second midlleware");
    if(true)
    {
        //authanticated
        next();
    }else{
        //not authanticated //redirect to login mw
        //error midlleware at the end of code 
        next(new Error("not authanticated"));
    }
});


//third mw
//server.use((request,response,next)=>{
    //response.send("authanticated");
//});


//routes
//1-home page
server.get("/home",(request,response,next)=>{
    response.send("home page");
})
//auth router
server.use(authRouter);
//2-studentsrouter
server.use(studentrouter);
//3-speakerRouter
server.use(speakersrouter);
//4-eventsrouter
server.use(Eventsrouter);





//not found middleware 
server.use((request,response,next)=>{
    response.status(404).json({meassge:"page is not found"});
})

//error middleware
server.use((error,request,response,next)=>{
response.status(500).json({meassge:error+""});
});
