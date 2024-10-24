const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    cartItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})

module.exports = mongoose.model("Cart", cartSchema)