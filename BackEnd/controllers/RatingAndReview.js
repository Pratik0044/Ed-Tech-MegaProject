const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


// Create a new Rating 

exports.createRating = async (req,res) => {
    try {
        // get user id 
        const userId = req.user.id;
        // fetch data from request body
        const {rating, review, courseId} = req.body;
        // chech if user enrolled in the course or not
        const courseDetails = await Course.findOne({_id:courseId,
                                    studentsEnrolled: {$elemtMathch: {$eq:userId}},
        });
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"User is not enrolled in the course"
            });
        }
        // check if user already rated the course or not
        const alreadyRated = await RatingAndReview.findOne({user:userId, course:courseId});
        if(alreadyRated){
            return res.status(400).json({
                success:false,
                message:"User already rated the course"
            });
        }
        // create a new Rating
        const ratingReview = await RatingAndReview.create({
                                                    rating,review,
                                                    course:courseId,
                                                    user:userId,
        });

        // update the course rating and review
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            $push:{ratingAndReview:ratingReview._id},
        },
        {new:true,});
        
        // return  response
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            data:ratingReview,
        });


    }catch(err){
        return res.status(500).json({
            error:err.message,
            success:false,
            message:"Something went wrong while creating a new Rating"

        });
    }
}

// get Average Rating of a course

exports.getAverageRating = async (req,res) => {
    try {
        // get course id from request
        const courseId = req.body.courseId;
        // calculate average rating of a course
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ]);
        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                data:result[0].averageRating,
                averageRating:result[0].averageRating,
            });
        }

        // if no rating found
        return res.status(200).json({
            success:true,
            data:0,
            averageRating:0,
        });



    } catch (error) {
        return res.status(500).json({
            error:err.message,
            success:false,
            message:"Something went wrong while getting average rating of a course"

        });
        
    }
}

// get all Rating and review of a course

exports.getAllRatingAndReview = async (req,res) => {
    try {
        const allReview = await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image",
                                })
                                .populate({
                                    path:"course",
                                    select :"courseName",
                                })
                                .exec();

        return res.status(200).json({
            success:true,
            data:ratingAndReview,
            message:"All rating and review of a course fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error:err.message,
            success:false,
            message:"Something went wrong while getting all rating and review of a course"

        });
    }
}