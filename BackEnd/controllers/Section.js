const Section = require("../models/Section")
const Course = require("../models/Course")

exports.createSection = async (req,res) =>{
    try{
        //data fetch
        const {sectionName,courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.satatus.json({
                success:false,
                message:"Missing Properties"
            })
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course with section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id,
                                                }
                                            },
                                            {new:true},
        )
        //HW: how to use populate to show section and subsection in the updatedCourseDetails
        // return res
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully.",
            updatedCourseDetails
        })
    }catch(er){
        return res.status(500).json({
            success:false,
            message:"Something error while creating a Sectition"
        })
    }
}

exports.updateSection = async (req,res) =>{
    try{

        // data input
        const {sectionName, sectionId} = req.body;
        // data validate
        if(!sectionName || !sectionId){
            return res.satatus.json({
                success:false,
                message:"Missing Properties"
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        // return res
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully.",
            
        })
    }
    catch(er){
        return res.status(500).json({
            success:false,
            message:"Something error while Updating a Sectition"
        })
    }
}

exports.deleteSection = async (req,res)=>{
    try{
        // data input
        const sectionId = req.params;
        // validate

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please enter the valid data."
            })
        }
        // findByIdand Delete
        const section = await Section.findByIdAndDelete(sectionId)


        return res.status(200).json({
            success:true,
            message:"Section deleted Successfully.",
            
        })
    }
    catch(er){
        return res.status(500).json({
            success:false,
            message:"Something error while Updating a Sectition"
        })
    }
}