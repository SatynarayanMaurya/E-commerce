const express = require("express")

const router = express.Router();

const {signup,login, sendOtp } = require("../Controller/auth");
const { isAuth, isAdmin } = require("../Middleware/auth");
const { addProduct, getAllProduct, getCategoryProduct, getSingleProduct, addToCart, getAllCartProductOfUser } = require("../Controller/addProduct");
const { placeOrder, orderedProducts, userDetails } = require("../Controller/PlaceOrder");
const { getOrderedData, deleteFromCart } = require("../Controller/Products");

router.post("/auth/sendotp", sendOtp)
router.post("/auth/signup",signup)
router.post("/auth/login",login)

router.post("/add-product",isAuth,isAdmin,addProduct);
router.get("/get-all-product",getAllProduct);
router.get("/get-category-products", getCategoryProduct)
router.get("/get-single-product", getSingleProduct)

router.put("/add-to-cart", isAuth, addToCart)
router.get("/get-all-cart-product",isAuth, getAllCartProductOfUser)

router.post("/place-order", isAuth, placeOrder)

// For user ordered product
router.get("/ordered-product", isAuth, orderedProducts)

router.get("/user-details", isAuth, userDetails)

// for admin all ordered product
router.get("/all-ordered-product", isAuth, isAdmin, getOrderedData)

router.put("/delete-from-cart", isAuth, deleteFromCart)

module.exports = router