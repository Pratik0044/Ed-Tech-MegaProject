const Profile = rquire('../models/Profile');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    try{
        // get data and user id
        const {dob="",about="",contactNumber,gender} = req.body;
        const userId = req.user._id;
        // validation
        if(!contactNumber || !gender || !userId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        // find profile
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        // update profile
        profileDetails.dob = dob;
        profileDetails.about = about;  
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        // DB me to save karana padega dost
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
        });
    }catch(er){
        return res.status(500).json(
            {
                success:false,
                message: "Somthing went wrong while updating profile"
            });
    }
}

// delete profile
exports.deleteProfile = async (req, res) => {
    try{
        // get user id
        const userId = req.user._id;
        // validation
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found."
            });
        }
        // find profile
        const profileId = userDetails.additionalDetails;
        // delete profile
        await Profile.findByIdAndDelete(profileId);
        // delete user
        await User.findByIdAndDelete(userId);
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile deleted successfully"
        });
    }catch(er){
        return res.status(500).json(
            {
                success:false,
                message: "Somthing went wrong while deleting profile"
            });
    }
}