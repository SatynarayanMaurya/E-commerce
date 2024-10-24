import React, { useEffect, useState } from 'react'
import img1 from "../../Assests/Extras/led.jpg"
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { productEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from "../../Components/Spinner"
import { setLoading } from '../../Redux/Slices/authSlice'


function MyOrders() {


    const token = useSelector((state)=>state.auth.token)
    const [items, setItems] = useState([])
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()

    const getAllData = async ()=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("get", productEndpoints.ORDERED_PRODUCT_API, {},{Authorization:`Bearer ${token}`})
            dispatch(setLoading(false))
            setItems(response.data.details.orders)
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            return ;
        }
    }

    useEffect(()=>{
        getAllData()
    },[])

  return (
    <div className='lg:p-6 pt-6'>

        {loading && <Spinner/>}
        <div className='flex flex-col lg:gap-6 gap-2'>
            <div className='border-2 shadow-lg flex lg:px-10 px-4 py-3 text-lg justify-between font-semibold'>
                <p className='lg:w-[15%] w-[30%]'>Thumbnail</p>
                <p className='lg:w-[30%] w-[40%] '>Product</p>
                <p className='w-[12%]'>Price</p>
                <p className='lg:w-[20%] lg:block hidden'>Order State</p>

            </div>

            <div className='shadow-lg lg:px-10 px-4 border-t flex flex-col gap-2'>

                {items.map((item)=>{
                    return  item.productId.map((single,index)=>{
                        return <div key={index} className=' flex justify-between  items-center'>
                                    <div className='lg:w-[15%] w-[30%] '>
                                        <img src={single.imageUrl} alt="" className='object-contain w-[100px] h-[100px]' />
                                    </div>
                                    <p className='lg:w-[30%] w-[40%]'>{single.productName} </p>
                                    <p className='w-[12%]'>{single.price}</p>
                                    <p className='lg:w-[20%] lg:block hidden'>Out for delivery</p>
                                </div>
                    })
                })}
                
                {/* Products  */}

            </div>
        </div>
    </div>
  )
}

export default MyOrders
