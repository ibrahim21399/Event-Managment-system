//import pakages
const speaker = require("./../modules/SpeakersModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
//const checkValidation = require("./../middle wares/checkValidationFn");

module.exports.getAllSpeakers = (request, response, next) => {
    speaker.find({})
        .then((data) => {
            response.status(200).json({ message: "getAllSpeakers", data });
        })
        .catch(error => next(error));
}

module.exports.addSpeaker = (request, response, next) => {
    checkValidation(request)
    speaker.findOne({ Email: request.body.email })
        .then((data) => {
            if (data)
                throw new Error("email already exist");
            // encrypt the password
            bc.hash(request.body.password, 10).then((hash) => {
                // add the speaker
                let newSpeaker = new speaker({
                    _id: mongoose.Types.ObjectId(),
                    Email: request.body.email,
                    username: request.body.username,
                    password: hash,
                    address: {
                        city: request.body.address.city,
                        street: request.body.address.street,
                        building: request.body.address.building
                    }
                });
                newSpeaker.save()
                    .then((data) => {
                        response.status(201).json({ message: "speaker added", data });
                    }).catch(error => next(error));
            });
        }).catch(error => next(error));
}

module.exports.updateSpeaker = async(request, response, next) => {
    checkValidation(request);
    let newEmail = "";
    // check on the object id of the request
    if (!mongoose.Types.ObjectId.isValid(request.body.id))
        throw new Error("object id is invalid");
    // check for email uniqueness get the registered email of the requested speaker and compare to the incoming one
    // to check if he wants to update it
    await speaker.findOne({ _id: request.body.id })
        .then(data => {
            if (data)
                newEmail = (data.Email == request.body.email) ? "" : request.body.email;
        }).catch(error => next(error));
    await speaker.findOne({ Email: newEmail })
        .then((data) => {
            if (data)
                throw new Error("this email is already taken");
            // encrypt the password
            bcrypt.hash(request.body.password, 10).then((hash) => {
                // update the speaker
                speaker.updateOne({ _id: request.body.id }, {
                    $set: {
                        Email: request.body.email,
                        username: request.body.username,
                        password: hash,
                        address: {
                            city: request.body.address.city,
                            street: request.body.address.street,
                            building: request.body.address.building
                        }
                    }
                }).then((data) => {
                    if (data.matchedCount != 0)
                        response.status(200).json({ message: "speaker updated", data });
                    else
                        throw new Error("speaker not found");
                }).catch(error => next(error));
            });
        }).catch(error => next(error));
}

module.exports.deleteSpeaker = (request, response, next) => {
    // checkValidation(request)
    if (!mongoose.Types.ObjectId.isValid(request.params.id))
        throw new Error("object id is invalid");
    speaker.deleteOne({ _id: request.params.id })
        .then((data) => {
            if (data.deletedCount != 0)
                response.status(200).json({ message: "speaker deleted", data })
            else
                throw new Error("speaker doesnot exist");
        }).catch(error => next(error))
}

module.exports.getSpeakerByID = (request, response, next) => {
    checkValidation(request);
    if (!mongoose.Types.ObjectId.isValid(request.params.id))
        throw new Error("object id is invalid");
    speaker.find({ _id: request.params.id })
        .then((data) => {
            if (data.length > 0)
                response.status(200).json({ message: "get speaker by ID", data });
            else
                throw new Error("speaker doesnot exist");
        })
        .catch(error => next(error));
}