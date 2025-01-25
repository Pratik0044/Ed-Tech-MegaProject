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
        const updatedCourseDetails = await Course.findById(
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