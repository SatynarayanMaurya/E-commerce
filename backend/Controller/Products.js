const BillingDetails = require("../Models/BillingDetails")
const User = require("../Models/userSchema")
const Product = require("../Models/products")


exports.getOrderedData = async(req,res)=>{
    try{
       const details = await BillingDetails.find({}).populate("productId")
       return res.status(200).json({
            success:true,
            message:"Data is fetched successfully ",
            data:details
       })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting ordered data",
            errorMessage:error.message
        })
    }
}

exports.deleteFromCart = async (req,res)=>{
    try{
        const {productId} = req.body;
        const userId = req.user.id;

        if(!productId || !userId){
            return res.status(401).json({
                success:false,
                message:"Product id or userId not found"
            })
        }

        const userDetails = await User.findByIdAndUpdate({_id:userId},{$pull:{cartItem:productId}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Cart item deleted ",
            user:userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in deleting the cart Item",
            errorMessage:error.message
        })
    }
}