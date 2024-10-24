const User = require("../Models/userSchema")
const OTP = require("../Models/otpSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")

exports.sendOtp = async (req,res)=>{
    try{
        const {email}  = req.body;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Email is not fount for sending the OTP"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User is already registered"
            })
        }
        const otp = otpGenerator.generate(6, {
                                                    upperCaseAlphabets:false,
                                                    lowerCaseAlphabets:false,
                                                    specialChars:false
        })

        const saveToSchema = await OTP.create({email,otp})

        return  res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otpDetails : saveToSchema
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while sending the otp"
        })
    }
}

exports.signup = async(req,res)=>{
    try{
        const {name, email, password,otp} = req.body;
        if(!email || !name || !password || !otp){
            return res.status(401).json({
                success:false,
                message:"All fields are required!"
            })
        }
        var adminn = false
        
        if(email === "satynarayanmaurya113@gmail.com"){
            adminn= true;
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exist !"
            })
        }
        // Check otp is correct or not 
        const newlyOTP = await OTP.findOne({email}).sort({createdAt:-1}).limit(1)
        console.log("Your are here 4")
        
        if(newlyOTP?.otp !== otp){
            return res.status(401).json({
                success:false,
                message:"OTP is incorrect"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const userDetails = await User.create({name,email,password:hashedPassword,admin:adminn})
        return res.status(200).json({
            success:true,
            message:"User registered successfully ",
            userDetails:userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch Error while sign up!",
            errorMessage:error.message
        })
    }
}


exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registerd"
            })
        }
        const matchPassword = await bcrypt.compare( password,existingUser.password)
        if(matchPassword){
                const token =  jwt.sign(
                    {
                        email:existingUser.email,
                        id:existingUser._id,
                        admin:existingUser.admin
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:"24h"
                    }
                )

                req.user = token

                const options = {
                    expires:new Date(Date.now() + 24 * 3600 * 1000),
                    httpOnly:true
                }
                return res.cookie("token",token,options).status(200).json({
                    success:true,
                    message:"User logged in successfullly",
                    userDetails:existingUser,
                    token :token
                })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password not matched"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while login !",
            errorMessage:error.message
        })
    }
}