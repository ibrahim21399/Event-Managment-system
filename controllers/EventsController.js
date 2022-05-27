
const events = require("./../modules/EventsModel");
const checkValidation = require("../Middlewares/checkValidation");


module.exports.getAllEvents=(request,response,next)=>{
    events.find({})
    .then(data=>{
        response.status(200).json({data})
    })
    .catch(error=>next(error));
}
module.exports.AddEvents=(request,response,next)=>{
    let event =new events(
        {
            _id: request.body.id,
            title: request.body.title,
            date: request.body.date,
            mainSpeakerID: request.body.mainSpeakerID,
            otherSpeakersID: request.body.otherSpeakersID,
            students: request.body.students
        }
    );
    event.save()
    .then(()=>{
        response.status(200).json({message:"event created"})
    })
    .catch(error=>next(error));
}
module.exports.updateEvents=(request,response,next)=>{
    if (request.role != "admin")
    throw new Error("Not Authorized!");
checkValidation(request);
event.updateOne({ _id: request.body.id }, {
        $set: {
            _id: request.body.id,
            title: request.body.title,
            date: request.body.date,
            mainSpeakerID: request.body.mainSpeakerID,
            otherSpeakersID: request.body.otherSpeakersID,
            students: request.body.students
        }
    })
    .then(data => {
        if (data.matchedCount != 0)
            response.status(200).json({ message: "event updated", data });
        else
            throw new Error("event doesnot exist");
    }).catch(error => next(error));
}
module.exports.deleteEvents=(request,response,next)=>{
    if (request.role != "admin")
        throw new Error("Not Authorized!");
    checkValidation(request);
    events.deleteOne({ _id: request.params.id })
        .then((data) => {
            if (data.deletedCount != 0)
                response.status(200).json({ message: "event deleted", data })
            else
                throw new Error("event doesnot exist");
        }).catch(error => next(error)) 
}
module.exports.getEventbyid=(request,response,next)=>{
    events.find({ _id: request.params.id })
        .then((data) => {
            if (data.length > 0)
                response.status(200).json({ message: "get event by ID", data });
            else
                throw new Error("event doesnot exist");
        })
        .catch(error => next(error));
}