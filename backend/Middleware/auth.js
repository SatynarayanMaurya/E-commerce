const jwt = require("jsonwebtoken")
require("dotenv").config();



exports.isAuth = async(req,res,next)=>{
    try{
        const token =  req.header("Authorization")?.split(" ")[1]
        // console.log("Received token in auth middleware is : ", token)

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found ?"
            })
        }

        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET)
            // console.log("Your decoded token is : ", decode)
            req.user = decode
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in auth middleware",
            errorMessage:error.message
        })
    }
}

exports.isAdmin = async(req,res,next)=>{
    try{
        const admin = req.user.admin;
        if(!admin){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for the admin"
            })
        }
        next()
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in isAdmin middleware",
            errorMessage:error.message
        })
    }
}