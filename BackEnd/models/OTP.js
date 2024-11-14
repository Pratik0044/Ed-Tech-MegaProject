const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema = new mongoose.schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

// A FUNCTION TO SEND VERIFICATION EMAIL
async function sendVerifcationMail(email,otp) {
    try{
        const mailResponse = mailSender(email,"Verification Email from Leran Track: ",otp);
        console.log("Email send Successfully: ",mailResponse);
        
    }catch(er){
        console.log("Error occured while sending mails: ",er);
        throw er;
    }
}

otpSchema.pre("save",async function(next) {
    await sendVerifcationMail(this.email,this.otp)
    next()
})

module.exports = mongoose.model("OTP",otpSchema)