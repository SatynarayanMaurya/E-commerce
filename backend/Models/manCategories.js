const mongoose = require("mongoose");

const MensCategorySchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    totalCategory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})

module.exports = mongoose.model("ManCategory", MensCategorySchema)