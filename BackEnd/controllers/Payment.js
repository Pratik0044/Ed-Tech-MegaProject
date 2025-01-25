const razorpay = require('razorpay');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
// const {couuseEnrolledMail} = require('../utils/mailTemplates');


// capture payment and intiaate the razorpay order

exports.capturePayment = async (req, res) => {
    try{
        // get the course id and user id
        const {courseId} = req.body;
        const userId = req.user._id;
        // validate

        // valide courseId
        if(!courseId){
            return res.status(400).json({
                error: 'Bad Request',
                success:false,
                message:"valid courseId is required"
            });
        }
        // valide courseDetail
        try{
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    error: 'Not Found',
                    success:false,
                    message:"Course not found"
                });
            }
        }catch(err){
            return res.status(500).json({
                error: 'Internal Server Error',
                success:false,
                message:"somthing went wrong while fetching the course"
            });
        }

        // user already pay for the same course
        const userDetail = await User.findById(userId).populate('course');
        const isEnrolled = userDetail.course.find(course => course._id.toString() === courseId.toString());
        if(isEnrolled){
            return res.status(400).json({
                error: 'Bad Request',
                success:false,
                message:"You already enrolled for this course"
            });
        }
        // create order
        const options ={
            amount: course.price * 100,
            currency: 'INR',
            receipt: `receipt_${userId}_${courseId}`,
            payment_capture: 1,
        }

        try{
            const order = await instance.orders.create(options);
            console.log(order);
            
            return res.status(200).json({
                success:true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                order_id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
            });
        }catch(err){
            return res.status(500).json({
                error: 'Internal Server Error',
                success:false,
                message:"somthing went wrong while creating the order"
            });
        }
        // return response
    }catch(er){
        return res.status(500).json({
            error: 'Internal Server Error',
            success:false,
            message:"somthing went wrong while capturing the payment"
        });
    }
}

// verify signature fo Razorpay and server

exports.verifySignature = async (req, res) => {
    try{
        const webhookSecret = "1234567890";

        const signature = req.headers['x-razorpay-signature'];

        

    }
    catch(err){
        return res.status(500).json({
            error: 'Internal Server Error',
            success:false,
            message:"somthing went wrong while verifying the signature"
        });
    }
}