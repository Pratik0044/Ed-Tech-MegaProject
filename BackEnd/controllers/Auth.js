
const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
require('dotenv').config();
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

        const otpUpload = await OTP.create({otpPayload})
        console.log("OTP Body:",otpUpload);

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
        const recentOTP = await OTP.find({email}.sort({createdAt:-1}).limit(1))
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
        const {email,password}  = req.body;

        // validate
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Each fields is required"
            })
        }
        // find user exist or not
        const userData = await User.findOne({email}).populate("additionalDetails")
        // if not exist return respose user not found try to signUP firstly
        if(!userData){
            console.log("user not exist:");
            
            return res.status(400).json({
                success:false,
                message:"User not registered, Try to register first"
            })
        }
        // else
        // verify the given password with our Db password
        
        if(await bcrypt.compare(password,userData.password)){
            const payload = {
                email: userData.email,
                id: userData._id,
                accountType: userData.accountType,
            }
            // Generate JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            userData.token = token
            userData.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now()+ 3*24*60*1000),
                httpOnly:true

            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                userData,
                token,
                message:"User LogedIn successfully"
            })
        }
        
        // return res
        else{
            return res.status(401).json({
                success:false,
                message:"Password has not matched, Please try with correct password."
            })
        }
    

    }catch(er){
        console.log("Something went worn in Login: ",er);
        return res.status(500).json({
            success:false,
            message:"LogIn attenmp fail, Try again later."
        })
    }
}
// ChangePassword
exports.changePassword = async (req,res)=>{
    // fetch the email from req ki body
    
   const {oldPassword,newPassword,confirmPassword} = req.body;
   if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(500).json({
            success:false,
            message:"Please enter all feilds."
        })
   }
    
   
   
}
