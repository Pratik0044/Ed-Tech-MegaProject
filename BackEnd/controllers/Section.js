const Section = require("../models/Section")
const Course = require("../models/Course")

exports.createSection = async (req,res) =>{
    try{
        //data fetch
        const {sectionName,courseId} = req.app.use(bodyParser.json());
        // data validation
        if(!sectionName || !courseId){
            return res.satatus.json({

            })
        }
        // create section

        // update course with section objectID
        // return res
    }catch(er){
        return res.status(400).json({
            success:false,
            message:"Something error while creating a Sectition"
        })
    }
}