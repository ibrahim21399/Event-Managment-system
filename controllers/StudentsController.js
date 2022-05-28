const { validationResult } = require("express-validator")
const students=require(".././modules/StudentsModel");

//get all students (get)
module.exports.getAllstudents=(request,response,next)=>{
    students.find({})
    .then((data)=>{
        response.status(200).json({data})//({meassge:"list of stusents"})
    })
    .catch(error=>{
        next(error);
    })
}
//get student by id
module.exports.getstudentbyid=(request,response)=>{
    response.status(200).json({meassge:"student by id "})
}
//add student (post)
module.exports.AddStutent=(request,response,next)=>{
   
    students.findOne({Email:request.body.Email})
    .then((data)=>{
        let results=validationResult(request);
        if(data)
        throw new Error("Email already exist");
        else if(!results.isEmpty()){
            let message=results.array.reduce((current,error)=>current+error.msg+" "," ")
            let error=new error(message);
            error.status=422;
            throw error;
        }
        let student =new students({
            _id:request.body.id,
            name:request.body.name,
            Email:request.body.Email,
            password:request.body.password
        })
        student.save()
        .then((data)=>{
            console.log(results);
            console.log(request.body); 
            response.status(201).json({meassge:"student created",data})
        })
        .catch(error=>{next(error);})

    })
    .catch(error=>{next(error);})
   

}

module.exports.updateStudent=(request,response,next)=>{
    students.updateOne({_id:request.body.id},{
        $set:{
            name:request.body.name,
            Email:request.body.Email,
            password:request.body.password        }
    }).then(data=>{
        if(data.matchedCount==0)
        throw new Error("student not exist");
        response.status(200).json({meassge:"Student updated",data});

    })
    .catch(error=>next(error))
}

module.exports.deleteStutent=(request,response,next)=>{

        students.findById(request.body.id)
        .then(data=>{
            if (data == null)
            throw new Error("student not found");
            else
            students.deleteOne(data)
            .then(()=>{
            response.status(200).json({meassge:"Delete Student"})
            })
            .catch(error=>next(error));
            
            

        })
        //if(data.matchedCount==0)
        //throw new Error("student not found")
        .catch(error=>next(error));
}