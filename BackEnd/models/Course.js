const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
    },
    courseDescription:{
        type:String,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,

    },
    courseContent:[{
        type:mongoose.Schema.type.ObjectId,
        ref:"Section"
    }],
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }]

}) 

module.exports =  mongoose.model("course",courseSchema);