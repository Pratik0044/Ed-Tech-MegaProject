const { default: mongoose } = require("mongoose");
require("dotenv").config()

exports.connect = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("DATABASE connected successfully")
    })
    .catch((er)=>{
        console.log("Error in DATABASE connection:",er);
        console.error(er)
        process.exit(1)
        
    })
}