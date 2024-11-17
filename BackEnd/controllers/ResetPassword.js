const User = require("../models/User");
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
        message:"something went wrong, Link cann't send for reset password."
    })
  }
};

// reset password
