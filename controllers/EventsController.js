
const events = require("./../modules/EventsModel");

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
module.exports.updateEvents=(request,response,next)=>{}
module.exports.deleteEvents=(request,response,next)=>{}
module.exports.getEventbyid=(request,response,next)=>{}