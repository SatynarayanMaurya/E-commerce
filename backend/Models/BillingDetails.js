const mongoose = require("mongoose")

const billingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    appartment:{
        type:String,
        default:null
    },
    city:{
        type:String,
        required:true
    },
    paymentOption:{
        type:String
    },
    productId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",

        required:true
    }],
    productName:{
        type:String,
        default:null
    }
})

module.exports = mongoose.model("BillingDetails", billingSchema)