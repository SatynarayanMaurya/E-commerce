const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String
    },
    price:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    size:[{
        type:String,
        enum:["S", "M", "L", "XL", "XXL"]
    }],
    category:[{
        type:String,
        required:true
    }]
})

module.exports = mongoose.model("Product", productSchema)