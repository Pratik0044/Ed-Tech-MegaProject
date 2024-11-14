const mongoose = require("mongoose")
const subSection = new mongoose.Schema({
    title:{
        type:String,

    },
    timeDuration:{
        type:String,
    },
    discription:{
        type:string,
    },
    videoUrl:{
        type:String,
    }


}) 

module.exports =  mongoose.model("subSection",subSection);