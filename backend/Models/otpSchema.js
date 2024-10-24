const mongoose = require("mongoose")
const maileSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 20*60
    }
})

async function sendVerificationEmail (email,otp){
    try{
        await maileSender(email, "Verification Email from e-commerce website", otp)
    }
    catch(error){
        console.log("Error while sending the verfication email")
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("OTP", otpSchema)