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
            notes:{
                courseId: courseId,
                userId: userId,
            }
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

        const shasum = crypto.createHmac('sha256', webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex');

        if (signature !== digest) {
            return res.status(400).json({
                error: 'Bad Request',
                success:false,
                message:"Invalid Signature"
            });
        }

        console.log("Payment Authorized");

        // extract the order details and user detail frome the notes of the payment response
        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            // fulfil the action

            // enroll the user for the course
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    error: 'Internal Server Error',
                    success:false,
                    message:"course not found. || somthing went wrong while enrolling the course"
                });
            }

            // find the student and add the course to the student
            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{course:courseId}},
                {new:true}
            )
            if(!enrolledStudent){
                return res.status(500).json({
                    error: 'Internal Server Error',
                    success:false,
                    message:"student not found. || somthing went wrong while enrolling the student"
                });
            }

            // send the mail to the student
            const student = await User.findById(userId);
            const course = await Course.findById(courseId);
            const mailData = {
                to: student.email,
                subject: 'Course Enrolled',
                text: `You have successfully enrolled for the course ${course.courseName}`
            }
            mailSender(mailData);

        }catch(err){
            return res.status(500).json({
                error: 'Internal Server Error',
                success:false,
                message:"somthing went wrong while fetching the course"
            });
        }
        
        return res.status(200).json({
            success:true,
            message:"Payment Successfull"
        });

    }
    catch(err){
        return res.status(500).json({
            error: 'Internal Server Error',
            success:false,
            message:"somthing went wrong while verifying the signature"
        });
    }
}