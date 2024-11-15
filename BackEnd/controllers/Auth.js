
const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")
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
        const {firstName,
            lastName,
            email,
            mobNo,
            pass, 
            confirmPass, 
            accountType,
            otp,
    } = req.body;

        // validate the email
        if(!firstName || !lastName|| !email|| !mobNo || !pass || !confirmPass || !otp){
            console.log("Please enter all feilds:");
            
            return res.status(403).json({
                success:false,
                message:"All feilds are required"
            })
        }
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
                message:"Password and Confirm Password are not matching, Please Try again!"
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
        const recentOTP = await OTP.find({email}.sort({createdAT:-1}).limit(1))
        console.log("Recent OTP : ", recentOTP);
        
        // validate OTP 
        if(recentOTP.length == 0 ){
            return res.status(400).json({
                success:false,
                message:"OTP not Found"
            })
        } else if(recentOTP !== otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        // Hashing the password
        
        const hashedPass = await bcrypt.hash(pass,10);
        
        // create entry in DB
        const profileDetails =  await Profile.create({
            gender:null,dateOfBirth:null,about:null,contactNumber:mobNo
        })
        const userData = await User.create({
            firstName,
            lastName,
            email,
            mobNo,
            pass:hashedPass,  
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return response

        return res.status(200).json({
            success:true,
            message:"User is registered successfully.",
            userData,
        })
    }catch(er){
        console.log("An error occure while creating an account:",er);
        
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

// Login
exports.logIn =async (req,res)=>{
    try{
        // fetch data from request ki body

        // validate

        // find user exist or not

        // if not exist return respose user not found try to signUP firstly

        // else
        // verify the given password with our Db password

        // return res
    }catch(er){
        console.log("Something went worn in Login: ",er);
        return res.status(400).json({
            success:false,
            message:"LogIn attenmp fail, Try again later."
        })
    }
}
// ChangePassword
