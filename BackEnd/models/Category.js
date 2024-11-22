const mongoose = require('mongoose')
const CategorysSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
}
)

module.exports  = mongoose.model("Categorys",CategorysSchema)