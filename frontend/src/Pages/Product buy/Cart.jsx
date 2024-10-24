import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { productEndpoints } from '../../Services/apis'
import { setLoading } from '../../Redux/Slices/authSlice'
import Spinner from '../../Components/Spinner'
import { IoMdClose } from "react-icons/io";

function Cart() {

    const navigate = useNavigate()
    const token = useSelector((state)=>state.auth.token)
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const [isDeleted, setIsDeleted] = useState(false)

    const getAllData = async ()=>{
        try{
            if(token === "null"){
                console.log("NO token is available")
                return;
            }
            dispatch(setLoading(true))
            const response = await apiConnector("get", productEndpoints.GET_ALL_CART_PRODUCT_API, {}, {Authorization:`Bearer ${token}`})
            dispatch(setLoading(false))
            setCartItems(response.data.details.cartItem)

            

        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message);
            return;
        }
    }

    const crossHandler = async(productId)=>{
        try{
            await apiConnector("put", productEndpoints.DELETE_FROM_CART_API, { productId:productId }, {Authorization:`Bearer ${token}`})
            // console.log("Response is : ", response)
            setIsDeleted(!isDeleted)

        }
        catch(error){
            toast.error(error.response.data.message)
            return ;
        }
    }
    

    useEffect(()=>{
         getAllData()
    },[token,isDeleted])

    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotal(totalPrice);
      }, [cartItems]);
      
  


  return (
    <div className='lg:w-10/12 w-11/12 mt-28  mx-auto '>
            {loading && <Spinner/>}
        <div className='flex flex-col gap-8 mt-6'>

            {/* uppar part  */}
            <div className='lg:px-32  flex flex-col gap-6'>
                
                {/* Navbar  */}
                <div className='flex justify-between lg:px-12 px-3 py-4 font-medium border-t shadow-lg'>
                    <p className='lg:w-[50%] w-[67%]'>Product</p>
                    <div className='lg:w-[50%] w-[33%]  flex lg:gap-1 gap-6'>
                        <div className='flex lg:gap-20 gap-8'>
                            <p className='lg:w-[100px] '>Price</p>
                            <p className='lg:w-[100px] lg:block hidden '>Quantity</p>
                            <p className='lg:w-[100px] lg:block hidden'>Subtotal</p>
                        </div>
                        <div className='text-2xl lg:w-[50px] cursor-pointer bg-red-400'></div>
                    </div>
                </div>


                {/* All products here  */}
                {token === "null" ? <p className='text-center text-3xl font-semibold my-4'>No Products here </p> : 

                    <div className='flex flex-col gap-6'>

                        {/* All Products are here  */}
                        {cartItems.map((cartItem,index)=>{
                            return <div key={index} className='flex flex-col gap-6'>
                                        <div className='flex justify-between items-center lg:px-12 px-1 py-2 font-medium  shadow-md'>
                                            <div className='flex lg:w-[50%] w-[67%] lg:gap-12 gap-4 items-center'>
                                                <img src={cartItem.imageUrl} alt="" className='w-[75px] h-[65px] object-contain' />
                                                <p>{cartItem.productName}</p>
                                            </div>
                                            <div className='lg:w-[50%] w-[33%] flex lg:gap-1 gap-6'>
                                                <div className='flex   lg:gap-20 gap-8 '>
                                                    <p className='lg:w-[100px]'>₹ {cartItem.price}</p>
                                                    <p className='lg:w-[100px] lg:block hidden pl-6'>1</p>
                                                    <p className='lg:w-[100px] lg:block hidden'>₹ {cartItem.price}</p>
                                                </div>
                                                <p onClick={()=>crossHandler(cartItem._id)} className='text-2xl lg:w-[50px] cursor-pointer text-red-600'><IoMdClose/></p>
                                            </div>
                                        </div>
                                    </div>
                        })}
                    </div>
                }
                <div onClick={()=>navigate("/")} className='flex cursor-pointer'>
                    <button className='border-2 px-8 py-2 rounded-lg font-medium'>Return to Shop </button>
                </div>

            </div>

            {/* Lower part  */}
            {token !== "null" && 
                    cartItems.length !== 0 && 
                <div className='flex  justify-center items-center mb-16'>
                    <div  className='lg:px-6 px-10 lg:mt-0 mt-8 py-4 border border-black w-[400px] flex flex-col shadow-lg gap-3'> 
                        <h1 className='font-semibold text-lg'>Cart Total</h1>

                        <div>
                            <div className='flex justify-between items-center mt-3 px-4'>
                                <p>Subtotal : </p>
                                <p>₹ {total}</p>
                            </div>
                            <div className='border-t border-black my-3 w-[397px] -ml-6'></div>
                            <div className='flex justify-between items-center px-4'>
                                <p>shipping : </p>
                                <p>Free</p>
                            </div>
                            <div className='border-t border-black my-3 w-[397px] -ml-6'></div>
                            <div className='flex justify-between items-center font-medium px-4'>
                                <p>Total : </p>
                                <p>₹ {total}</p>
                            </div>

                            
                            <div className='flex justify-center items-center mt-5 mb-2'>
                                <button onClick={()=>navigate("/buy-product/checkout")} className=' bg-[#fb641b] text-white px-6 py-2 rounded-full'>Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            }
        </div>
    </div>
  )
}

export default Cart
