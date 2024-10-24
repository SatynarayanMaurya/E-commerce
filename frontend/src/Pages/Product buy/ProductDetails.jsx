import React, { useEffect, useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { ImPower } from "react-icons/im";
import { MdStarBorder } from "react-icons/md";
import logo from "../../Assests/Auth/logo_ShopNEXT.png"
import tokenn from "../../Assests/Auth/token.png"
import protectImage1 from "../../Assests/Auth/protect-image1.jpeg"
import protectImage2 from "../../Assests/Auth/protect-image2.jpeg"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiConnector } from '../../Services/apiConnector';
import { productEndpoints } from '../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartUpdate } from '../../Redux/Slices/authSlice';


function ProductDetails() {

    const {productId} = useParams()
    const [ProductDetails, setProductDetails] = useState({})
    const token = useSelector((state)=>state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector((state)=>state.auth.isAdmin)

    const getProductDetails = async()=>{
        try{
            const response = await apiConnector("get", productEndpoints.GET_SINGLE_PRODUCT_API, {}, {productId:productId})
            setProductDetails(response.data.product)
        }
        catch(error){
            toast.error(error.response.data.message)
            return;
        }
    }

    useEffect(()=>{
        getProductDetails()
    },[token])

    const addToCartHandler =async ()=>{
        try{
            if(token === 'null'){
                toast.error("Please login to add item")
                return;
            }
            if(admin === "true" || admin === true){
                toast.error("Admin can't buy Product")
                return;
            }
            const response = await apiConnector("put", productEndpoints.ADD_TO_CART_API, {},{Authorization:`Bearer ${token}`, productId:productId})
            toast.success(response.data.message)
            dispatch(setIsCartUpdate())
            navigate("/cart")
            
        }
        catch(error){
            toast.error(error.response.data.message);
            return;
        }
    }

  return (
    <div className='w-11/12 lg:w-10/12 mx-auto '>
        <div className='lg:pt-8 flex lg:flex-row flex-col lg:gap-0 gap-12 justify-between'>
            
                {/* Left part  */}
                <div className='flex pt-6 flex-col gap-3 lg:w-[480px] '>
                    <img src={ProductDetails.imageUrl}  alt="" className='ml-8 lg:ml-0 lg:w-[480px] w-[250px] lg:h-[480px] object-contain ' />
                    <div className='flex justify-between lg:mt-0 mt-6'>
                        <div onClick={addToCartHandler} className='flex gap-1 items-center text-white font-semibold lg:px-[53px] px-5 text-lg py-3 cursor-pointer bg-[#ff9f00]'>
                            <p><FaCartShopping/></p>
                            <button >Add To Cart</button>
                        </div>
                        <div onClick={addToCartHandler}  className='flex gap-1 items-center text-white font-semibold lg:px-[67px] px-8 text-lg py-3 cursor-pointer bg-[#fb641b]'>
                            <p className='mt-1'><ImPower/></p>
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
                
                {/* Right part */}
                <div className='lg:w-[730px] flex flex-col gap-6 pt-6 '>
                    
                    {/* first div  */}
                    <div className='flex flex-col gap-2'>

                        <p className='text-[21px] font-medium'>{ProductDetails.productDescription} </p>

                        <div className='flex gap-3 items-center'>

                            <div className='flex bg-green-600 px-3 rounded-lg gap-1 text-white items-center'>
                                <p>4.5</p>
                                <p><MdStarBorder/></p>
                            </div>
                            <p className='text-[#878787] font-semibold'>108 Ratings & 13 Reviews</p>
                            <div className='bg-[#2874f0] w-20 px-2 rounded-xl py-1'>
                                <img src={logo} alt="" />
                            </div>

                        </div>
                    </div>
                    
                    {/* Price  */}
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#388e3c] text-[14px] font-semibold'>Special Price</p>
                        <div className='flex gap-5 items-center'>
                            <p className='text-3xl font-semibold'>₹ {ProductDetails.price}</p>
                            <p className='text-[#388e3c] text-[15px] font-semibold'>50% OFF</p>
                        </div>
                    </div>
                    
                    {/* Availabe offers  */}
                    <div className='lg:flex hidden flex-col gap-2'>
                        <p className='font-semibold'>Available Offers</p>

                        <div className='flex flex-col gap-2 pl-4'>

                            <div className='flex gap-3'>
                                <img src={tokenn} alt="" className='w-[23px]  ' />
                                <p className='text-[#4f4f4f] font-semibold text-[14px] flex gap-2'><span className='text-black font-semibold text-[15px]'>Bank Offer 5%</span>  Unlimited Cashback on Flipkart Axis Bank Credit Card <span className='text-[#2455f4] font-semibold'>T&C</span></p>
                            </div>

                            <div className='flex gap-3'>
                                <img src={tokenn} alt="" className='w-[23px]' />
                                <p className='text-[#4f4f4f] font-semibold text-[14px] flex gap-2'><span className='text-black font-semibold text-[15px]'>Special price</span> Get extra 33% off (price inclusive of cashback/coupon) <span className='text-[#2455f4] font-semibold'>T&C</span></p>
                            </div>

                            <div className='flex gap-3'>
                                <img src={tokenn} alt="" className='w-[23px]' />
                                <p className='text-[#4f4f4f] font-semibold text-[14px] flex gap-2'>Buy Keyboard combo with Monitor and Get 5% Off<span className='text-[#2455f4] font-semibold'>T&C</span></p>
                            </div>

                            <div className='flex gap-3'>
                                <img src={tokenn} alt="" className='w-[23px]' />
                                <p className='text-[#4f4f4f] font-semibold text-[14px] flex gap-2'><span className='text-black font-semibold text-[15px]'>No cost EMI ₹1,417/month.</span> Standard EMI also available<span className='text-[#2455f4] font-semibold'>view plans</span></p>
                            </div>

                            <div className='flex gap-3'>
                                <img src={tokenn} alt="" className='w-[23px]' />
                                <p className='text-[#4f4f4f] font-semibold text-[14px] flex gap-2'>Buy UPS with Monitor and Get 5% Off<span className='text-[#2455f4] font-semibold'>view plans</span></p>
                            </div>

                            <div className='flex gap-3'>
                                <img src={tokenn} alt="" className='w-[23px]' />
                                <p className='text-[#7b7979] font-semibold text-[14px] flex gap-2'>Buy Webcam with Monitor and Get 5% Off<span className='text-[#2455f4] font-semibold'>view plans</span></p>
                            </div>

                        </div>
                    </div>
                    

                    {/* Protect your product  */}
                    <div className='border px-6 pt-3 mb-6'>

                        <div>
                            <p className='text-2xl font-semibold  pb-3 '>Protect your product</p>
                            <div className=' lg:w-[748px] border-b -ml-6'></div>                            
                        </div>

                        <div className='my-4'>

                            <div className='flex lg:flex-row flex-col gap-12 justify-between items-center'>
                                <div>
                                    <img src={protectImage1} alt="" className='w-[150px]' />
                                </div>

                                <div className='lg:w-[550px] flex flex-col gap-1'>
                                    <p className='font-semibold text-[17px]'>Extended Warranty</p>
                                    <p className='text-[14px]'>OneAssist Extended Warranty Plan - OneAssist Extended Warranty means an extension of the original manufacturers warranty on the concerned Product by a continuous period of 1 or 2 Years, starting from the expiry of manufacturers warranty. OneAssist Extended Warranty replicates the manufacturers warranty against any malfunctions or breakdown for the duration opted. Satynarayan Maurya <span className='text-[#2455f4]'>Know More</span> </p>
                                </div>
                            </div>

                            <div className=' lg:w-[748px] border-b -ml-6 mt-6'></div>   

                            <div className='flex lg:flex-row flex-col gap-12 mt-4 justify-between items-center'>
                                <div>
                                    <img src={protectImage2} alt="" className='w-[150px]' />
                                </div>

                                <div className='lg:w-[550px] flex flex-col gap-1'>
                                    <p className='font-semibold text-[17px]'>Digital Suraksha for Rs 25000 by Bajaj Allianz</p>
                                    <p className='text-[14px]'>Get your financial losses covered for online transaction frauds on all bank accounts, credit/ debit cards, mobile wallets. Covers scam calls, OTP SMS frauds, UPI, netbanking, Cyber Attacks, Sim-swapping, Phishing, Spoofing, and more.Know More
                                    Enjoy peace of mind against all kinds of Cyber Fraud! This is Satynarayan Maurya <span className='text-[#2455f4]'>Know More</span> </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default ProductDetails
