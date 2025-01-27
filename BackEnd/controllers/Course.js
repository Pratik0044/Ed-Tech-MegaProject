// create courses
const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const isInstructor = require("../middleWare");
// create course
exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag } =
            req.body;
        const courseThumbnail = req.files.thumbnail;

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag
        ) {
            return res.status().json({
                success: false,
                message:
                    "All feileds are require                                                      ",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById({ userId });
        console.log("instructor Details: ", userId);

        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Instructor details not found",
            });
        }

        // check given tag is valid or not

        const tagDetails = await Tag.findById({ tag });
        if (!tagDetails) {
            return res.status(400).json({
                success: false,
                message: "Tag details not found",
            });
        }

        // Updload Imgae to cloudinary

        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        //create an entry for new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            courseContent,
            tag: tagDetails._id,
            thumbnail: thumbnailImage,
        });

        // add new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        );


        // return res
        return res.status(200).json({
            success:true,
            data:newCourse,
            message:`New course Create Successfully by instructor: ${instructorDetails.firstName}`
        })
    } catch (er) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while cerating the courese for YOu!",
        });
    }
};

// fetch courses
exports.getAllCourse = async (req,res) => {
    try{
        const user = req.user.id;
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const allCourse = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReview:true,
                                                studentsEnrolled:true
        }).populate("instructor").exec();
    }catch(er){
        return res.status(400).json({
            success: false,
            message: "Something went wrong while fetching the courese for YOu!",
        });
    }
}

// get course details

exports.getCourseDetails = async (req,res) => {
    try{
        // get course id
        const courseId = req.body;
        // find course details
        const courseDetails = await Course.find({_id:courseId})
                                                .populate({
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    }
                                                })
                                                .populate("category")
                                                .populate("ratingAndReview")
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection",
                                                    }
                                                })    
                                                .exec();

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Course not found the course with ${courseId}`
            })
        }

        // return res
        return res.status(200).json({
            success:true,
            data:courseDetails,
            message:"Course details found"
        })
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong while fetching the courese for YOu!",
        });
    }
}