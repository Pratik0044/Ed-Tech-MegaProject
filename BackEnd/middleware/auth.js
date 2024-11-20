const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")


// auth
exports.auth = async (req,res,next)=>{
    try{
        // find JWT token 
        const token = req.body.token 
                        || req.cookies.token 
                        || req.header("Autherization").replace("Beare_","");
        // token nahi mila bhai
        if(!token){
            return res.status(401).jsno({
                success: false,
                message:"Token not found"
            })
        }
        // Token mil gya bhai
        try{
            const decode =  jwt.verify(token,process.env.JWT_SECRET);
            console.log("Token Verify:",decode);
            // user ke andar token hi dal diya taki token se autherization kar sake

            req.user = decode;
            
        }catch(er){
            return res.status(400).json({
                success:false,
                message:"Token verification failed"
            })
        }
        next()

    }catch(er){
            return res.status(400).json({
                success:false,
                message:"Somthing went wrong while validating the token"
            })
    }
}
//isStudent

exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accoutType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected rout for student only."
            })
        }
        next()
    }catch(er){
        return res.status(500).json({
            success:false,
            message:"User role cann't be verify"
        })
    }
}


//isInstuctor
exports.isInstructor = async (req,res,next)=>{
    try{
        if(req.user.accoutType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected rout for Instructor only."
            })
        }
        next()
    }catch(er){
        return res.status(500).json({
            success:false,
            message:"User role cann't be verify"
        })
    }
}

//isAdmin
exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accoutType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected rout for Admin only."
            })
        }
        next()
    }catch(er){
        return res.status(500).json({
            success:false,
            message:"User role cann't be verify"
        })
    }
}