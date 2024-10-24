import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../Services/apiConnector'
import { adminEndpoints } from '../../Services/apis'
import { toast } from 'react-toastify'

function MensCategory() {

  const {categoryName} = useParams()
  const [allProduct, setAllProduct] = useState([])

  const getProducts = async ()=>{
    try{
        const response = await apiConnector("get",adminEndpoints.GET_CATEGORY_PRODUCTS_API,{},{category:categoryName})
        setAllProduct(response.data.products)
    }
    catch(error){
      toast.error(error.response.data.message);
      // console.log("Error in finding category product : ", error)
      return ;
    }
  }
  useEffect(()=>{
    getProducts()
  },[categoryName])

  return (
    <div>
        <div className='w-10/12 mx-auto flex flex-col gap-8 mb-12'>
            <h1 className='text-3xl font-semibold'>All {categoryName} Categories</h1>

            <div className='flex  gap-12 flex-wrap'>

                {
                    allProduct.map ((product,index)=>{
                        return <div key={index} className='flex flex-col cursor-pointer  gap-4 '>
                                    <div>
                                        <img src={product.imageUrl} alt="" className='w-[280px] h-[280px] object-cover  hover:scale-105 transition-all duration-250 hover:shadow-xl' />
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
    </div>
  )
}

export default MensCategory
