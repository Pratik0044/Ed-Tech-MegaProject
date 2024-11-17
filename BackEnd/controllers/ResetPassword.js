const User = require("../models/User");
const bcrypt = require("bcrypt")
const mailSender = require("../utils/mailSender");

// reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req ki body
    const email = req.body;

    // user exist or not, email validate
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your Email is not registered with us",
      });
    }
    // generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiretion
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPassswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    // link generate for front end

    const url = `http://localhost:3000/update-password/${token}`;
    // send mail containing the url
    await mailSender(
      process.env.MAIL_USER,
      "Reset Password Link",
      `Password Reset Link: ${token}`
    );

    //return res
    return res.json({
      success: true,
      message: "Link Sent successfully.",
    });
  } catch (er) {
    return res.status(400).json({
        success:false,
        message:"something went wrong, While sending reset  the password link."
    })
  }
};

// reset password

exports.resetPassword = async (req,res)=>{
    try{
        // fetch the data from req ki body
        const {newPassword, confirmPassword, token } = req.body
        // validate
        if(!newPassword || !confirmPassword || newPassword !== confirmPassword){
            return res.status(413).json({
                status:false,
                message:'Please enter correct and same data.'
            })
        }

        //get userDetailes from DB using token
        const user = await User.findOne({token:token})
        //if no entry
        if(!user){
            return res.status(413).json({
                status:false,
                message:'User not registered. | token is invalid'
            })
        }
        // token time check
        if(user.resetPassswordExpires < Date.now()){
            return res.status(413).json({
                status:false,
                message:'Your token is expired, please try again later'
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(newPassword,10)
        // update password
        await User.findOneAndUpdate({token:token},
                                    {password:hashedPassword},
                                    {new:true}
        );
        //return res
        return res.status(200).json({
            success:true,
            message:"Your Passwrd Reset Successfully"
        })
    }catch(er){
        return res.status(400).json({
            success:false,
            message:"something went wrong, While reseting the password."
        })
    }
}