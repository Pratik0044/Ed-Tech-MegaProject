
const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")
// sendOTP
exports.sendOTP = async (req,res)=>{
    try{
        const {email} =req.body;
        // check if user already exit
        const isUserPresent = await User.findOne({email})
        //validate the email
        const emailTest =  emailValidator.validate(email)
        if(!emailTest){
            console.log("Invalid email id:");
            
            return res.status(422).json({
                success:false,
                message:"Invalid email id"
            })
        }
        // if user already exist, then return a response
        if(isUserPresent){
            return res.status(401).json({
                success:false,
                message:"This email id already exist."
            })
        }
        //generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("OTP generated: ", OTP);
        // check unique OTP or not

        let result = await OTP.findOne({otp: otp})
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({otp: otp})
        }

        const otpPayload = {email,otp}
        // create an entry in DB

        const optUpload = await OTP.create({otpPayload})
        console.log("OTP Body:",optUpload);

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully."
        })
        
    }catch(er){
        console.log("Error in generating OTP :",er);
        
        res.status(500).json({
            success:false,
            message:"Error in OTP send:",
        })
    }
}

// Signup
exports.signUp = async (req,res)=>{
    try{
        //data fetch from request ki body
        const {firstName,lastName,email,mobNo,pass, confirmPass, accountType} = req.body;

        // validate the email
        const emailTest =  emailValidator.validate(email)
        if(!emailTest){
            console.log("Invalid email id:");
            
            return res.status(422).json({
                success:false,
                message:"Invalid email id"
            })
        }
        // match the both password
        if(pass !== confirmPass){
            return res.status(400).json({
                success:false,
                message:"Please enter same Password in both fields"
            })
        }

        // check user already exist or not
        const isUserPresent = await User.findOne({email});
        // if user already exist 
        if(isUserPresent){
            return res.status(401).json({
                success:false,
                message:"This email id already exist."
            })
        }
        
        // else

            // find most recent OTP stored for the user

            // validate OTP 
            
            // Hashing the password
        let hashedPass;
        try{
            hashedPass = await bcrypt.hash(pass,10);

        }catch(er){
            console.log("Error in incription of password:",er);
            return res.status(400).json({
                success:false,
                message:"Error in incription of password:"
            })
            
        }

            


            


    }catch(er){
        console.log("An error occure while creating an account:",er);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

// Login

// ChangePassword
