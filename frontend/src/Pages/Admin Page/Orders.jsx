import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { productEndpoints } from '../../Services/apis'
import { setLoading } from '../../Redux/Slices/authSlice'
import Spinner from '../../Components/Spinner'
function Orders() {

  const token = useSelector((state)=>state.auth.token)
  const [items, setItems]= useState([])
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch();

  const getAllOrderedProducts = async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", productEndpoints.GET_ALL_ORDERED_PRODUCT_ADMIN_API, {},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      setItems(response.data.data)
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return ;
    }
  }

  useEffect(()=>{
    getAllOrderedProducts()
  },[token])


  return (
    <div>
      {loading && <Spinner/>}
      <div className='shodow-lg lg:w-full w-[92vw] lg:p-8 px-3 py-8 flex flex-col gap-4'>

        <h1 className='font-semibold text-3xl'>Orders :</h1>

          <div className='lg:pl-4 flex flex-col gap-4'>
              {/* <h1 className='font-semibold text-xl'>No Orders yet</h1> */}

              <div className='shadow-md lg:ml-12 mt-4 flex justify-between items-center py-4 border-t lg:px-12 px-3 text-lg font-semibold'>
                  <p className='lg:w-[20%]'>Thumbnail</p>
                  <p className='lg:w-[55%] '>Product Name</p>
                  <p className='w-[20%] lg:block hidden '>User Name</p>
              </div>

              <div className='flex flex-col gap-4'>
                {
                  items.map((item)=>{
                    return item.productId.map((single,index)=>{
                      return <div key={index} className='shadow-md lg:ml-12 flex justify-between items-center  border-t lg:px-12 px-3 text-lg '>
                                <div className='lg:w-[20%]'><img src={single.imageUrl} alt=""  className='lg:w-[100px] w-[70px] h-[100px] object-contain'/></div>
                                <p className='lg:w-[55%] '>{single.productName}</p>
                                <p className='w-[20%] lg:block hidden '>{item.name}</p>
                            </div>
                    })
                  })
                }
              </div>

          </div>
      </div>
    </div>
  )
}

export default Orders
