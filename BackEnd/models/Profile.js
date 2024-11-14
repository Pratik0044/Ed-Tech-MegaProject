const mongoose = require("mongoose")
const profileSchema = new mongoose.Schema({
    gender:{
        typs:String,

    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true
    }

}) 

module.exports =  mongoose.model("profile",profileSchema);