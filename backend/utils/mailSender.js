const nodemailer = require("nodemailer")

const maileSender =async (email , title, body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        const info = await transporter.sendMail({
            from:"Shop Next | E-Commerce - by Satynarayan Maurya",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        return info;
    }
    catch(error){
        console.log("Error in sending the mail : ",error)
    }
} 
module.exports = maileSender