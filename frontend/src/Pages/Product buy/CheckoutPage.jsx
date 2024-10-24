import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import visa from "../../Assests/Extras/visa.png"
import bob from "../../Assests/Extras/bob.jpg"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { productEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCartUpdate } from '../../Redux/Slices/authSlice'


function CheckoutPage() {

    const {register, handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate()
    const token = useSelector((state)=>state.auth.token)
    const [items, setItems]= useState([])
    const [total,setTotal] = useState(0)
    const [productIds, setProductIds] = useState([])
    const dispatch = useDispatch()





    const onsubmit =async (data)=>{

        try{

            if(productIds.length === 0){
                toast.error("No items in Cart")
                return;
            }
            data.productId = JSON.stringify(productIds)
            
            const response = await apiConnector("post", productEndpoints.PLACE_ORDER_API, data,{Authorization:`Bearer ${token}`})
            // console.log("Your response is : ", response)
            toast.success(response.data.message)
            
            navigate("/profile/my-orders")
            dispatch(setIsCartUpdate())
        }
        catch(error){
            toast.error(error.response.data.message);
            return ;
        }
    }

    const getCartItem = async ()=>{
        try{
            const response = await apiConnector("get", productEndpoints.GET_ALL_CART_PRODUCT_API, {},{Authorization:`Bearer ${token}`})
            setItems(response.data.details.cartItem)
        }
        catch(error){
            toast.error(error.response.data.message)
            return ;
        }
    }

    useEffect(()=>{
        getCartItem()
    },[])

    useEffect(() => {
        const totalPrice = items.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotal(totalPrice);
        const extractedIds = items.map((item) => item._id);
        setProductIds(extractedIds);
    }, [items]);


  return (
    <div className='lg:w-8/12 w-11/12 mx-auto  mb-24'>

        <form action='' onSubmit={handleSubmit(onsubmit)} className=' flex lg:flex-row flex-col-reverse lg:gap-32 gap-10 items-center pt-12'>

            {/* Left form div  */}
            <div className='lg:w-[35%] w-[90%] flex flex-col gap-6 '>
                <h1 className='text-3xl font-semibold'>Billing details </h1>

                <div className=' flex flex-col gap-6'>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-[15px] text-[#7D8184] pl-1'>Name<span className='text-red-600'>*</span> </label>
                            <input type="text" name='name' id='name' {...register("name",{required:true})}  className='px-4 py-2 rounded-lg text-[#7D8184] bg-[#F5F5F5] outline-none'/>
                            {errors.name && <p className='text-red-600'>Name is important!</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="address" className='text-[15px] text-[#7D8184] pl-1'>Street Address<span className='text-red-600'>*</span></label>
                            <input type="text" id='address' {...register("address",{required:true})}  className='px-4 py-2 rounded-lg text-[#7D8184] bg-[#F5F5F5] outline-none'/>
                            {errors.address && <p className='text-red-600'>Address is important!</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="appartment" className='text-[15px] text-[#7D8184] pl-1'>Appartment, floor etc. (optional)</label>
                            <input type="text" id='appartment' {...register("appartment")}  className='px-4 py-2 rounded-lg text-[#7D8184] bg-[#F5F5F5] outline-none'/>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="city" className='text-[15px] text-[#7D8184] pl-1'>Town/City<span className='text-red-600'>*</span></label>
                            <input type="text" id='city' {...register("city",{required:true})}  className='px-4 py-2 rounded-lg text-[#7D8184] bg-[#F5F5F5] outline-none'/>
                            {errors.city && <p className='text-red-600'>City is important!</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phoneNumber" className='text-[15px] text-[#7D8184] pl-1'>Phone Number<span className='text-red-600'>*</span></label>
                            <input type="text" id='phoneNumber' {...register("phoneNumber", {required:true})} className='px-4 py-2 rounded-lg text-[#7D8184] bg-[#F5F5F5] outline-none'/>
                            {errors.phoneNumber && <p className='text-red-600'>Phone Number is important!</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='text-[15px] text-[#7D8184] pl-1'>Email Address<span className='text-red-600'>*</span></label>
                            <input type="text" id='email' {...register("email", {required:true})} className='px-4 py-2 rounded-lg text-[#7D8184] bg-[#F5F5F5] outline-none'/>
                            {errors.email && <p className='text-red-600'>Email is important!</p>}
                        </div>


                </div>
            </div>

            {/* Right Payment div  */}
            <div className='lg:w-[40%] w-[90%] flex flex-col gap-4'>

                    {/* first all product  */}
                    
                    <div className='flex  flex-col gap-6'>

                        {items.map((item,index)=>{
                            return <div key={index} className='flex justify-between items-center'>
                                        <div className='flex lg:gap-16 gap-6 items-center'>
                                            <img src={item.imageUrl} alt="" className='w-[70px] h-[70px] object-contain' />
                                            <p>{item.productName}</p>
                                        </div>
                                        <p className='font-medium'>₹ {item.price}</p>
                                    </div>
                        })}

                    </div>

                    <div>
                        <div className='border-t mt-2'></div>
                        <div className='flex justify-between font-semibold mt-2'>
                            <p>Sub Total : </p>
                            <p className='font-normal'>₹ {total}</p>
                        </div>

                    </div>

                    <div>
                        <div className='border-t '></div>
                        <div className='flex justify-between font-semibold mt-2'>
                            <p>Shipping : </p>
                            <p className='font-normal'>Free</p>
                        </div>

                    </div>

                    <div>
                        <div className='border-t'></div>
                            <div className='flex justify-between font-semibold mt-3'>
                                <p>Total Amount : </p>
                                <p className='text-lg'>₹ {total}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 mt-6'>
                        <div className='flex gap-6'>
                            <input type="radio" value="bank" {...register("paymentOption", { required: true })} id='payment'  />
                            <div className="flex justify-between items-center w-full">
                                <p>Bank</p>
                                <div className='flex gap-4'>
                                    <img src={visa} alt="logo" className='w-[40px] object-contain' />
                                    <img src={bob} alt="logo"  className='w-[40px] object-contain' />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-6'>
                                <input type="radio" value="cashOnDelivery" {...register("paymentOption", { required: true })} />
                                <p>Cash on delivery</p>
                            </div>
                        {errors.paymentOption && <p className='text-red-600 mt-2'>payment is important!</p>}
                        </div>
                    </div>

                    <div>
                        <button  type='submit' value="Submit" className='px-6 py-2 rounded-lg bg-[#DB4444] text-white mt-4'>Place Order</button>
                    </div>
            </div>
        </form>

    </div>
  )
}

export default CheckoutPage
