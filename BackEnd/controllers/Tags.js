const Tag = require("../models/Tags")


// create Tag handler
exports.createTag = async (req,res)=>{
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
        const tagsDetails = await create.Tag({name:name,description:description})
        console.log("Tags Detail:",tagsDetails);
        // return res

        return res.status(200).json({
            success:true,
            message:"Tag created Successfully"
        })
        
    }catch(er){
        return res.status(400).json({
            success:false,
            message:"Something went wrong creatino of tags"
        });
    }
}

// Get all Tags handler
exports.showAllTags = async (req,res)=>{
    try{
        const allTags = await Tag.find({}, {name:true,description:true});

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