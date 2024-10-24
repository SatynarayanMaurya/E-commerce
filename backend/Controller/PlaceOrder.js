const { model } = require("mongoose");
const BillingDetails = require("../Models/BillingDetails")
const User = require("../Models/userSchema")

exports.placeOrder = async (req,res)=>{
    try{
        const emaill = req.user.email
        const { name, email, phoneNumber, address, appartment, city, paymentOption, productId } = req.body;
        if(!name || !email || !phoneNumber || !address || !city || !paymentOption || !productId){
            return res.status(401).json({
                success:false,
                message:"All fields are required !"
            })
        }
        const productIds = JSON.parse(productId)
        const userId = req.user.id
        const existingUser = await User.findById({_id:userId})
        const billingDetails = await BillingDetails.create({userId:userId, name, email, phoneNumber, address, appartment , city, paymentOption, productId:productIds })
        const updateUser = await User.findOneAndUpdate({email:emaill},{$push:{orders:billingDetails._id }},{new:true}, )
        existingUser.cartItem= [];
        existingUser.save()
        
        return res.status(200).json({
            success:true,
            message:"Order placed ♥",
            billingDetails:billingDetails,
            user:updateUser
        })

    }   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while placing the order",
            errorMessage:error.message
        })
    }
}

exports.orderedProducts = async (req,res)=>{
    try{
        const id = req.user.id;
        if(!id){
            return res.status(401).json({
                success:false,
                message:"Id not found"
            })
        }

        const userDetails  = await User.findById({_id:id}).populate({
                                                                      path: "orders" ,
                                                                      populate:{
                                                                        path:"productId",
                                                                        model:"Product"
                                                                      } 
                                                                    })
        return res.status(200).json({
            success:true,
            message:"Ordered product fetched successFully",
            details:userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while getting the ordered product",
            errorMessage:error.message
        })
    }
}


exports.userDetails = async (req,res)=>{
    try{
        const userId = req.user.id
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id not found"
            })
        }

        const detail = await User.findById({_id:userId})
        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            user:detail
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting user Details ",
            errorMessage:error.message
        })
    }
}