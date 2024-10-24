import React, { useEffect, useState } from 'react'
import logo from "../Assests/Auth/logo_ShopNEXT.png"
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiConnector } from '../Services/apiConnector';
import { productEndpoints } from '../Services/apis';
import { CgProfile } from "react-icons/cg";
import { setAdmin,setToken } from '../Redux/Slices/authSlice';
function Navbar() {

    const navigate = useNavigate()
    const token = useSelector((state)=>state.auth.token);
    const [cartLength , setCartLendth] = useState(0)
    const isCartUpdate = useSelector((state)=>state.auth.isCartUpdate)
    const admin = useSelector((state)=>state.auth.isAdmin)

    const profileHandler = ()=>{
        if(admin === true || admin === "true"){
            navigate("/dashboard")
        }
        else{
            navigate("/profile")
        }
    }

    const findCartLength = async ()=>{
        try{
            if(token === "null"){
                return ;
            }
            
            const response = await apiConnector("get", productEndpoints.GET_ALL_CART_PRODUCT_API,{},{Authorization:`Bearer ${token}`})
            setCartLendth(response.data.details.cartItem.length)
        }
        catch(error){
            if(error.response.data.message === "Token is invalid"){
                dispatch(setToken("null"))
                localStorage.setItem("token", 'null')
        
                dispatch(setAdmin(false))
                localStorage.setItem("admin", false)
        
                navigate("/")
                return ;
              }
            toast.error(error.response.data.message);
            // console.log("Error while findinf the lenght")
            return;
        }
    }
    useEffect(()=>{
        findCartLength();
    },[isCartUpdate])

  return (
    <div className='bg-[#2874f0] h-[58px] lg:h-[64px] flex items-center fixed left-0 top-0 w-full '>
            <div className='w-10/12 mx-auto  text-white flex justify-between items-center'>

                <div onClick={()=>navigate("/")} className='cursor-pointer'>
                    <img src={logo} alt="logo" className='w-[110px] lg:w-[120px]'/>
                </div>

                <div className=' hidden lg:flex items-center relative'>
                    <input type="text" placeholder='Search...' className='pl-8 pr-12 py-2 rounded-xl  w-[600px] outline-none text-black' />
                    <p className='text-2xl absolute text-black right-2'><IoSearch/></p>
                </div>

                <div className='flex items-center lg:gap-8  gap-4'>
                    {
                        token === 'null' ? <button className=' border px-2 lg:px-4 lg:py-1 rounded-lg text-lg' onClick={()=>navigate("/login")}>Login</button> : <p onClick={profileHandler} className='text-3xl cursor-pointer'><CgProfile/></p>
                    }

                    <div className='relative'>
                        <p className='text-3xl cursor-pointer ' onClick={()=>navigate("/cart")}><FaCartShopping/></p>
                        <p className={`${token === "null" ? "hidden" : "block"} absolute -top-2 left-5 w-5 h-5 text-sm  text-center pr-[1px]  rounded-full bg-red-600`}>{cartLength}</p>
                        
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Navbar
