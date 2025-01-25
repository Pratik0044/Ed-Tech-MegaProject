const SubSection = require("../models/SubSection")
const Section = require("../models/Section")
const uploadFileToCloudinary = require("../utils/fileUploader")
// create subsection

exports.createSubSection = async (req,res)=>{
    try{
        // fetch data from req body
        const {sectionId, titel, timeDuration, description} = req.body;
        // extract file/ video
        const video = req.files.videoFile;
        // validation
        if(!sectionId || !titel || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        // upload video to cloudinary
        const videoUrl = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
        // create subsection
        const subSectionDetails = await SubSection.create({title:titel,timeDuration:timeDuration,description:description,videoUrl:videoUrl});
        // insert id of subsection into the section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true}
        )
        // Populating the subSection
        await updatedSection.populate("subSection").execPopulate();
        // return res
        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully.",
            updatedSection
        })
    }
    catch(er){
        return res.status(500).json({
            success:false,
            message:"Something error while creating a SubSectition"
        })
    }
}

// update subsection

exports.updateSubSection = async (req,res)=>{
    try{
        // fetch data from req body
        const {sectionId, subSectionId, titel, timeDuration, description} = req.body;  
        // validation
        if(!sectionId || !subSectionId || !titel || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        // find subsection
        const subSection = await SubSection.findById(subSectionId);
        // extract file/ video
        const video = req.files.videoFile;
        // upload video to cloudinary
        const videoUrl = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
        // update subsection
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title:titel,
                timeDuration:timeDuration,
                description:description,
                videoUrl:videoUrl
            },
            {new:true}
        )
        // return res
        return res.status(200).json({
            success:true,
            message:"SubSection Updated Successfully.",
            updatedSubSection
        })
    }
    catch(er){
        return res.status(500).json({
            success:false,
            message:"Something error while updating a SubSectition"
        })
    }
}
// delete subsection
exports.deleteSubSection = async (req,res)=>{ 
    try{
        // fetch data from req body
        const {sectionId, subSectionId} = req.body;
        // validation
        if(!sectionId || !subSectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        // delete subsection
        await SubSection.findByIdAndDelete(subSectionId);
        // delete subsection id from section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull:{
                    subSection:subSectionId,
                }
            },
            {new:true}
        )
        // Populating the subSection
        await updatedSection.populate("subSection").execPopulate();
        // return res
        return res.status(200).json({
            success:true,
            message:"SubSection Deleted Successfully.",
            updatedSection
        })
    }catch(er){
        return res.status(500).json({
            success:false,
            message:"Something error while deleting a SubSectition"
        })
    }
}