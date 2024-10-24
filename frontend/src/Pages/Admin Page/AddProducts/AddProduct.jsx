import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";
import { apiConnector } from '../../../Services/apiConnector';
import { adminEndpoints } from '../../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../Redux/Slices/authSlice';
import Spinner from "../../../Components/Spinner"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const [ category, setCategory] = useState([])
    const [ size, setSize] = useState([])
    const [file ,setFile] = useState("")
    const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state=>state.auth.loading))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCategoryOption = (e)=>{
        setCategory([...category,e.target.value])
    }
    const deleteCategory = (index)=>{
        const updatedTags = [...category];
        updatedTags.splice(index, 1);
        setCategory(updatedTags);
    }
    const handleSizeOption = (e)=>{
        setSize([...size,e.target.value])
    }
    const deleteSize = (index)=>{
        const updatedTags = [...size]; 
        updatedTags.splice(index, 1); 
        setSize(updatedTags);
    }
    const fileChange = (e)=>{
        const isFile = e.target.files[0];
        if(isFile){
            setFile(isFile)
        }
    }

    const onsubmit =async (data)=>{
        try{
            data.category = JSON.stringify(category);
            data.productImage = file;
            data.size = JSON.stringify(size)
            dispatch(setLoading(true))
            const response = await apiConnector("post", adminEndpoints.ADD_PRODUCT_API, data,{Authorization:`Bearer ${token}`,'Content-Type': 'multipart/form-data'} )
            toast.success(response.data.message)
            dispatch(setLoading(false))
            console.log("Resonnce is : ",response)
            navigate("/dashboard/products")
            
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            console.log("Error in creating add product : ", error)
            return ;
        }
    }

  return (
    <div>
        <div className=' gap-6 lg:mt-10 mt-4 flex  flex-col justify-center items-center mb-12'>
            {loading && <Spinner/>}

            <h1 className='  text-3xl font-semibold '>Add Product</h1>

            <div className='flex justify-center items-center shadow-xl rounded-lg border-t-2 lg:w-[45%] px-6 py-6'>
                <form action="" onSubmit={handleSubmit(onsubmit)} className='lg:w-full w-[78vw] flex flex-col gap-4'>

                        {/* Title  */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="productName" className='text-lg'>Product Name*</label>
                            <input type="text" id='productName' placeholder='Product Name' {...register("productName",{required:true})} className='px-4 py-2 border border-black rounded-lg outline-none' />
                            {errors.productName && <p className='text-red-600'>Name is important*</p>}
                        </div>

                        {/* Description  */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="productDescription" className='text-lg'>Product Description*</label>
                            <textarea type="" id='productDescription' rows={3}  placeholder='Product Description' {...register("productDescription", {required:true})} className='px-4 py-1 border border-black rounded-lg outline-none' />
                            {errors.productDescription && <p className='text-red-600'>Product Description is important*</p>}
                        </div>

                        {/* Price  */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="price" className='text-lg'>Price*</label>
                            <input type="text" id='price' placeholder='Price' {...register("price", {required:true})} className='px-4 py-2 border border-black rounded-lg outline-none' />
                            {errors.price && <p className='text-red-600'>Price is important*</p>}
                        </div>
                        
                        {/* category  */}
                        <div  className='flex justify-between items-center'>
                           <div  className='flex flex-col gap-1'>
                                <label htmlFor="" className='text-lg'>Category*</label>
                                <div className='border-2 px-3 py-1 rounded-lg flex  gap-4 h-[40px] w-[180px] lg:w-[360px]'>
                                    {
                                        category.map((cat,index)=>{
                                            return <div key={index} className='flex gap-2 items-center  px-2 py-1 bg-[#d6d5d5] rounded-md'>
                                                        <p className='text-sm'>{cat}</p>
                                                        <p onClick={()=>deleteCategory(index)} className='mt-[3px] text-sm cursor-pointer'><RxCross1/></p>
                                                    </div>
                                        })
                                    }
                                        
                                </div>
                           </div>

                            <div className='mt-5 '>
                                <select name="" id="" onChange={handleCategoryOption} className='mt-3'>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Man">Man</option>
                                    <option value="Woman">Woman</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Home">Home</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Appliance">Appliance</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Books">Books</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>
                        </div>

                        {/* Size */}
                        <div  className='flex justify-between items-center'>
                           <div  className='flex flex-col gap-1'>
                                <label htmlFor="" className='text-lg'>Size*</label>
                                <div className='border-2 px-3 py-1 rounded-lg flex  gap-4 h-[40px] w-[220px] lg:w-[360px]'>
                                    {
                                        size.map((cat,index)=>{
                                            return <div key={index} className='flex gap-2 items-center  px-2 py-1 bg-[#d6d5d5] rounded-md'>
                                                        <p className='text-sm'>{cat}</p>
                                                        <p onClick={()=>deleteSize(index)} className='mt-[3px] text-sm cursor-pointer'><RxCross1/></p>
                                                    </div>
                                        })
                                    }
                                        
                                </div>
                           </div>

                            <div className='mt-5 '>
                                <select name="" id="" onChange={handleSizeOption} className='mt-3'>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                        </div>

                        {/* Image  */}
                        <div className='flex flex-col gap-1'>
                            <p>Images*</p>
                            <div id='courseThumbnail' className="flex gap-6 items-center justify-center bg-[#cad5ea] rounded-lg h-[80px]">
                                    
                                <input id="file-upload" type="file" className="hidden" onChange={fileChange} />
                                <label htmlFor="file-upload"  className="cursor-pointer px-4 py-2  text-white rounded-md shadow-sm bg-blue-700 focus:ring-blue-500">Upload Image</label>
                                {file ? <p>{file.name}</p> :""}
                            </div>
                        </div>

                        <button className='bg-yellow-400 py-2 rounded-full font-semibold' type='submit'>Submit Item</button>

                       
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddProduct
