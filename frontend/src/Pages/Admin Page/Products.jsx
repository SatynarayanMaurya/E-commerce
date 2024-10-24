import React, { useEffect, useState } from 'react'
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../Services/apiConnector';
import { adminEndpoints } from '../../Services/apis';

function Products() {

  const navigate = useNavigate()
  const [allProduct, setAllProduct] = useState([])

  const getAllProducts = async (req,res)=>{
    try{
      const response = await apiConnector('get', adminEndpoints.GET_ALL_PRODUCTS_API,{});
      setAllProduct(response.data.Products.reverse())
    }
    catch(error){
      console.log("Error in getting all the products : ",error)
      return 

    }
  }

  useEffect(()=>{
    getAllProducts()
  },[])



  return (
    <div className='mt-2  flex flex-col gap-5'>
          <div className='lg:text-3xl text-2xl flex justify-between items-center font-semibold border-2 shadow-md px-8 lg:py-3 py-2'>
              <h1>Products</h1>
              <div onClick={()=>navigate("/dashboard/products/add-product")} className='flex items-center lg:text-xl text-lg bg-yellow-400 px-3 py-2 rounded-lg cursor-pointer'>
                <p><LuPlus/></p>
                <p>New</p>
              </div>
          </div>

          <div className='shadow-md  pb-4 '>
               
               {/* Navbar  */}
              <div className='flex justify-between border-b border-t py-3 lg:px-8 px-4 text-lg font-semibold'>
                  <div className='flex justify-between lg:w-[65%] w-full'>
                    <p>Products</p>
                    <div className='flex lg:w-[330px] justify-between'>
                      <p className='lg:block hidden'>Category</p>
                      <p>Price</p>
                    </div>
                  </div>
                  <div className='flex  lg:w-[250px] justify-between'>
                    <div className='lg:flex hidden gap-3'>Size</div>
                    <div className='lg:flex hidden gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                  </div>
              </div>

              {/* Products  */}
              <div className='px-8 pt-3 flex flex-col gap-6'>

                { 
                  allProduct.length === 0 ? <p className='text-2xl font-semibold text-center'>No Products Here</p> :
                  allProduct.map((product,index)=>{
                    return <div className='flex justify-between  text-lg ' key={index}>
                              <div className='flex justify-between lg:w-[65%] w-full'>
                                <div className='flex gap-3 items-center'>
                                  <img src={product?.imageUrl} alt="" className='w-[40px]  h-[40px]  object-cover' />
                                  <p>{product.productName}</p>
                                </div>
                                <div className='flex lg:w-[330px] justify-between'>
                                  <div className='lg:flex hidden gap-3'>{product.category.map((single,index)=>{return <div key={index}>{single}</div>})}</div>
                                  <p>₹{product?.price}</p>
                                </div>
                              </div>
                              <div className='flex lg:w-[250px] justify-between'>
                                <div className='lg:flex hidden gap-3'>{product.size.map((single,index)=>{return <p key={index}>{single}</p>})}</div>
                                <div className='lg:flex hidden gap-8 text-2xl'>
                                  <p><BiSolidEditAlt/> </p>
                                  <p><RiDeleteBin4Line/></p>
                                </div>
                              </div>
                          </div>
                  })
                }

                {/* <div className='flex justify-between  text-lg '>
                    <div className='flex justify-between w-[70%]'>
                      <div className='flex gap-3 items-center'>
                        <img src={img1} alt="" className='w-[40px]  h-[40px]  object-cover' />
                        <p>Jackets</p>
                      </div>
                      <div className='flex w-[260px] justify-between'>
                        <p>Man</p>
                        <p>₹1299</p>
                      </div>
                    </div>
                    <div className='flex gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                </div>

                <div className='flex justify-between  text-lg '>
                    <div className='flex justify-between w-[70%]'>
                      <div className='flex gap-3 items-center'>
                          <img src={img2} alt="" className='w-[40px] h-[40px]  object-cover' />
                          <p>Saree</p>
                        </div>
                      <div className='flex   w-[260px] justify-between '>
                        <p>Woman</p>
                        <p>₹299</p>
                      </div>
                    </div>
                    <div className='flex gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                </div>

                <div className='flex justify-between  text-lg '>
                    <div className='flex justify-between w-[70%]'>
                      <div className='flex gap-3 items-center'>
                          <img src={img3} alt="" className='w-[40px]  h-[40px] object-cover' />
                          <p>Shoes</p>
                        </div>
                      <div className='flex   w-[260px] justify-between '>
                        <p>Man</p>
                        <p>₹999</p>
                      </div>
                    </div>
                    <div className='flex gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                </div>

                <div className='flex justify-between  text-lg '>
                    <div className='flex justify-between w-[70%]'>
                      <div className='flex gap-3 items-center'>
                          <img src={img4} alt="" className='w-[40px]  h-[40px]  object-cover' />
                          <p>Watch</p>
                        </div>
                      <div className='flex   w-[260px] justify-between '>
                        <p>Electronic</p>
                        <p>₹1499</p>
                      </div>
                    </div>
                    <div className='flex gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                </div>

                <div className='flex justify-between  text-lg '>
                    <div className='flex justify-between w-[70%]'>
                      <div className='flex gap-3 items-center'>
                          <img src={img5} alt="" className='w-[40px] h-[40px] object-cover' />
                          <p>Hair Dryer</p>
                        </div>
                      <div className='flex   w-[260px] justify-between '>
                        <p>Electronic</p>
                        <p>₹399</p>
                      </div>
                    </div>
                    <div className='flex gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                </div>

                <div className='flex justify-between  text-lg '>
                    <div className='flex justify-between w-[70%]'>
                      <div className='flex gap-3 items-center'>
                          <img src={img6} alt="" className='w-[40px] h-[40px] object-cover' />
                          <p>Jackets</p>
                        </div>
                      <div className='flex   w-[260px] justify-between '>
                        <p>Man</p>
                        <p>₹1499</p>
                      </div>
                    </div>
                    <div className='flex gap-8 text-2xl'>
                      <p><BiSolidEditAlt/> </p>
                      <p><RiDeleteBin4Line/></p>
                    </div>
                </div> */}


              </div>
          </div>
    </div>
  )
}

export default Products
