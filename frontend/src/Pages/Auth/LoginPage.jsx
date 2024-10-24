import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import image from "../../Assests/Auth/loginImage.avif"
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../Services/apiConnector';
import { authEndpoints } from '../../Services/apis';
import { toast } from 'react-toastify';
import { setAdmin, setIsCartUpdate, setLoading, setToken } from '../../Redux/Slices/authSlice';
import Spinner from '../../Components/Spinner';
function LoginPage() {

  const [eyeButton, setEyeButton] = useState(false)
  const navigate = useNavigate()
  const {register, handleSubmit, formState: { errors }} = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.auth.loading)


  const eyeHandler = () =>{
    setEyeButton(!eyeButton)
  }

  const onsubmit = async(data)=>{

    try{
      dispatch(setLoading(true))
      const response = await apiConnector("post", authEndpoints.LOGIN_API, data)
      dispatch(setLoading(false))
      dispatch(setAdmin(response.data.userDetails.admin))
      localStorage.setItem("admin", response.data.userDetails.admin)
      toast.success(response.data.message)

      dispatch(setToken(response.data.token))
      localStorage.setItem("token", response.data.token)
      dispatch(setIsCartUpdate())

      
      if(response.data.userDetails.admin){
        navigate("/dashboard")
      }
      else{
        navigate("/")
      }
      
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return;
    }
  }


  return (
    <div className='flex lg:flex-row flex-col gap-4 lg:gap-0 lg:justify-between w-10/12 lg:w-9/12 mx-auto items-center mt-20  lg:mt-8 h-[85vh] '>
      {loading && <Spinner/>}
      <img src={image}  alt="" />

      <div className='lg:w-[400px] lg:px-8 px-2 py-6 rounded-lg  flex flex-col gap-2'>

        <h1 className='text-3xl font-semibold'>Login to ShopNext</h1>
        <p className=' font-semibold mt-2'>Enter your details below</p>
          <form action="" onSubmit={handleSubmit(onsubmit)} className='mt-6 flex flex-col gap-6'>

                <div>
                  <input type="email" name='email' {...register("email", {required:true})} id='email' placeholder='Email'  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1  w-full'/>
                  {errors.email && <p className='text-red-600'>*email is required!</p>}
                </div>

                <div className='relative '>
                  <input type={`${eyeButton ? "text": "password"}`} {...register("password", {required:true})} name='password' id='password' placeholder='Password'  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1 pr-12  w-full'/>
                  {errors.password && <p className='text-red-600'>*password is required!</p>}
                  <p onClick={eyeHandler} className='absolute right-3 top-0 cursor-pointer text-xl pt-2'>
                    {!eyeButton ? <VscEye/> : <VscEyeClosed/>} 
                  </p>
                </div>

                <div className='flex justify-between items-center mt-2'>
                    <button type='submit' className='bg-[#fb641b] px-4 py-2 rounded-lg text-white'>Login</button>
                    <button className='text-[#fb641b]'>Forgot Password?</button>
                </div>
          </form>

          <button className='text-start mt-3 text-blue-600 ' onClick={()=>navigate("/signup")}>Create an account</button>
      </div>

    </div>
  )
}

export default LoginPage
