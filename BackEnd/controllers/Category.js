const Category = require("../models/Category")


// create Category handler
exports.createCategory = async (req,res)=>{
    try{
        // fetch data
        const {name,description} = req.body
        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // create entry in db
        const tagsDetails = await create.Category({name:name,description:description})
        console.log("Categorys Detail:",tagsDetails);
        // return res

        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
        })
        
    }catch(er){
        return res.status(400).json({
            success:false,
            message:"Something went wrong creatino of tags"
        });
    }
}

// Get all Categorys handler
exports.showAllCategorys = async (req,res)=>{
    try{
        const allCategorys = await Category.find({}, {name:true,description:true});

        return res.status(200).json({
            success:true,
            message:"All tags fetch successfully"
        })
    }catch(er){
        return res.status(400).json({
            success:false,
            message:'Something went wront while fetching all tags from DB'
        })
    }
}

// category page details
exports.categoryDetails = async (req,res)=>{
    try{

        // get category id
        const cotegoryId = req.body;

        // fetch all courses related to given category
        const selectedCategory = await Category.findById({_id:cotegoryId})
                                                        .populate("courses")
                                                        .exec();
        // validate
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"Data not found"
            })
        }

        // get the courses with diffrent category
        const diffrentCategories = await Category.find({_id:{$ne:cotegoryId},}).populate("courses").exec();
        // get top selling courses
        const topSellingCourses = await Category.aggregate([
            { $unwind: "$courses" },
            {
                $lookup: {
                    from: "courses",
                    localField: "courses",
                    foreignField: "_id",
                    as: "courseDetails"
                }
            },
            { $unwind: "$courseDetails" },
            {
                $sort: {
                    "courseDetails.enrolledStudents": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    courses: { $push: "$courseDetails" }
                }
            },
            { $limit: 10 }
        ]);
        // return res

        return  res.status(200).json({
            success:true,
            message:"Category details fetch successfully",
            data:{
                selectedCategory:selectedCategory,
                diffrentCategories:diffrentCategories,
                topSellingCourses:topSellingCourses
            }
        })
    }catch(er){
        return res.status(400).json({
            success:false,
            message:'Something went wront while fetching category details from DB'
        })
    }
}