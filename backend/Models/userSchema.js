const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    cartItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BillingDetails"
    }]
})

module.exports = mongoose.model("User", userSchema)