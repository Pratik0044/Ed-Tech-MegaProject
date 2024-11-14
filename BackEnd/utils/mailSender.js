const nodemailer = require("nodemailer")

const mailSender = async (email,title,body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        const info = await transporter.sendMail({
            from:'"Learn track send a mail for Verification" <learntracrps@gmail.com>',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log("INFO:",Info);
        
        return info;
    }catch(er){
        console.log(er.message)
    }
}

module.exports = mailSender;