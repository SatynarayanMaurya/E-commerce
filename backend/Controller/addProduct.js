const Product = require("../Models/products")
const {uploadFileToCloudinary} = require("../utils/uploadToCloudinary")
const User = require("../Models/userSchema")

exports.addProduct = async(req,res)=>{
    try{
        const { productName, productDescription, price}= req.body;

        const size = JSON.parse(req.body.size)
        const category = JSON.parse(req.body.category)
        const productImage = req.files.productImage


        if(!productDescription || !productName || !price || !size || !category || !productImage){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const uploadImage = await uploadFileToCloudinary(productImage,process.env.PRODUCT_FOLDER_NAME)
        
        const productsDetails = await Product.create({productName, productDescription, price, size, category, imageUrl:uploadImage.secure_url})
        return res.status(200).json({
            success:true,
            message:"Product added successfully",
            productsDetails:productsDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while adding the product",
            errorMessage:error.message
        })
    }
}


exports.getAllProduct = async (req,res)=>{
    try{
        const allProducts = await Product.find({})

        return res.status(200).json({
            success:true,
            message:"All Product are fetched succfully",
            Products:allProducts
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in fetching all the products",
            errorMessage:error.message
        })
    }
}


exports.getCategoryProduct = async (req,res)=>{
    try{
        const findCategory = req.header("category")
        const getProducts = await Product.find({category:findCategory})
        return res.status(200).json({
            success:true,
            message:"Category's product fetched successfully",
            products:getProducts
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while fetching the man produces",
            errorMessage:error.message
        })
    }
}


exports.getSingleProduct = async(req,res)=>{
    try{
        const productId = req.header("productId")
        if(!productId){
            return res.status(401).json({
                success:false,
                message:"Product ID not found"
            })
        }

        const productDetails = await Product.findById({_id:productId})

        return res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            product:productDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting single product",
            errorMessage:error.message
        })
    }
}


exports.addToCart = async (req,res)=>{
    try{
        const productId = req.header("productId")
        const email = req.user.email
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Email not found"
            })
        }
        const userDetails = await User.findOneAndUpdate({email:email },{$push:{cartItem:productId}},{new:true}).populate("cartItem")

        return res.status(200).json({
            success:true,
            message:"product is added to the cart",
            userDetails:userDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in adding to cart ",
            errorMessage:error.message
        })
    }
}

exports.getAllCartProductOfUser = async(req,res)=>{
    try{
        const email = req.user.email;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Email not found"
            })
        }
        const userDetails = await User.findOne({email:email}).populate("cartItem")
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            details:userDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error of fetching all the products of the user",
            errorMessage:error.message
        })
    }
}