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