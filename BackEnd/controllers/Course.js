// create courses
const Course = require("../models/Course")
const Tag  = require("../models/Tags")
const User = require("../models/User")
const {uploadImageToCloudinary} =require('../utils/imageUploader')
const isInstructor = require("../middleWare")

exports.createCourse = async (req,res,isInstructor)=>{
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body
        const courseThumbnail = req.files.thumbnail

        if(!courseName || ! courseDescription || !whatYouWillLearn || !price || !tag)
        {
            return res.status().json({
                success:false,
                message:"All feileds are require                                                      "
            })
        }
    }catch(er){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while cerating the courese for YOu!"
        })
    }
}


// fetch courses