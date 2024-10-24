import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../Services/apiConnector'
import { adminEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux/Slices/authSlice'
import Spinner from '../../Components/Spinner'
import { useNavigate } from 'react-router-dom'


function AllCategory() {

    const [allProduct,setAllProduct] = useState([])
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log("Online or offline : ",navigator.onLine)

    const getAllProducts =async ()=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("get", adminEndpoints.GET_ALL_PRODUCTS_API,{});
            dispatch(setLoading(false))
            setAllProduct(response.data.Products.reverse())
            
            
        }
        catch(error){
            dispatch(setLoading(false))
            console.log("error in finding all the produces : ", error)
            return ;

        }
    }
    useEffect(()=>{
        
        isOnline && getAllProducts();
        
    },[])


    const productClicked = (productId)=>{
        navigate(`/product/${productId}`)
    }


  return (
    <div className='lg:mt-2 mt-20'>
        {loading && <Spinner/>}

        {isOnline ?  

            <div className='w-10/12 mx-auto flex flex-col gap-8 mb-12'>
            <h1 className='text-3xl font-semibold'>All Categories</h1>

            <div className='flex gap-8 lg:gap-12 flex-wrap'>

                {
                    allProduct.map ((product,index)=>{
                        return <div onClick={()=>productClicked(product._id)} key={index} className='flex flex-col cursor-pointer  gap-4 '>
                                    <div>
                                        <img src={product.imageUrl} alt="" className='w-[280px] h-[280px] object-contain  hover:scale-105 transition-all duration-250 hover:shadow-xl' />
                                    </div>
                                    <div className='flex justify-between items-center gap-1 '>
                                        <div className='flex gap-1 flex-col'>
                                            <p className='text-xl font-semibold'>{product.productName}</p>
                                            <p className='text-[#388e3c]'>min. 50% Off</p>
                                        </div>
                                        <p className='text-blue-500 text-xl mr-6'>₹ {product.price}</p>
                                    </div>
                                </div>
                    })
                }

            </div>
            </div>
         : <p className='text-3xl font-semibold text-center mt-8'>No internet Connection</p>
        }
    </div>
  )
}

export default AllCategory
