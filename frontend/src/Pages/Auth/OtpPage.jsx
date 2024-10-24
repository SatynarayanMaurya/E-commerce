import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image  from "../../Assests/Auth/signupImage.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../Services/apiConnector'
import { authEndpoints } from '../../Services/apis'
import { setSignupData } from '../../Redux/Slices/signupSlice'
import { toast } from 'react-toastify'
import { setLoading } from '../../Redux/Slices/authSlice'
import Spinner from '../../Components/Spinner'
function OtpPage() {


    const navigate = useNavigate()
    const signupData = useSelector((state)=>state.signup.signupData)
    const dispatch = useDispatch()
    const [otp,setOtp] = useState("");
    const loading = useSelector((state)=>state.auth.loading)

    const handleOtpChange = (e)=>{
        setOtp(e.target.value)

    }
    const handleSubmit =async (e)=>{
        try{
            e.preventDefault();
            const newData = {...signupData,otp:otp}
            dispatch(setLoading(true))
            const response = await apiConnector("post", authEndpoints.SIGNUP_API, newData)
            dispatch(setLoading(false))
            dispatch(setSignupData(null))
            toast.success(response.data.message)
            navigate("/login")
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            return;
        }

    }

  return (
    <div className='flex justify-between w-9/12 mx-auto items-center  mt-8 h-[85vh] '>
            {loading && <Spinner/>}
    <img src={image} width={900} className='-ml-48 -mt-8'  alt="" />

    <div className='w-[400px] px-8 py-6 rounded-lg  flex flex-col gap-2'>

      <h1 className='text-3xl font-semibold'>Enter OTP</h1>
      <p className=' font-semibold mt-2'>Enter OTP for creating an account</p>

        <form action="" onSubmit={handleSubmit} className='mt-6 flex flex-col gap-6'>

             
              <div>
                  <input type="text" onChange={handleOtpChange} name='email' id='email' placeholder='OTP' maxLength="6" className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1  w-full'/>
              </div>

             

              <div className='flex justify-between items-center mt-2'>
                  <button type='submit' className='bg-[#fb641b] px-4 py-2 rounded-lg text-white'>Create Account</button>
              </div>
        </form>

          <div className='flex gap-3 justify-center items-center mt-3'>
              <p>Already have account ?</p>
              <button className='text-start text-blue-600 ' onClick={()=>navigate("/login")}>Log in</button>
          </div>
    </div>

  </div>
  )
}

export default OtpPage
