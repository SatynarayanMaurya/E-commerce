import React, { useEffect, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { FaJediOrder } from "react-icons/fa6";
import { NavLink, Outlet, useLocation,useNavigate  } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { setAdmin, setLoading, setToken } from '../../Redux/Slices/authSlice';
import { apiConnector } from '../../Services/apiConnector';
import { authEndpoints } from '../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineMenu } from "react-icons/ai";
function AdminDashboard() {


    const location = useLocation()
    const path = location.pathname
    const [userDetail, setUserDetail] = useState({})
    const token = useSelector((state)=>state.auth.token)
    const dispatch = useDispatch()
    const [menuButton, setMenuButton ] = useState(false)
    const navigate = useNavigate()

    const getUserDetails = async ()=>{
        try{
            dispatch(setLoading(true))
            const response =await apiConnector("get", authEndpoints.USER_DETAILS_API, {},{Authorization:`Bearer ${token}`})
            dispatch(setLoading(false))
            setUserDetail(response.data.user)
        }
        catch(error){
            dispatch(setLoading(false))
            if(error.response.data.message === "Token is invalid"){
                dispatch(setToken("null"))
                localStorage.setItem("token", 'null')
                
                dispatch(setAdmin(false))
                localStorage.setItem("admin", false)
                
                navigate("/")
                
            }
            toast.error(error.response.data.message)
            return ;
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[token])

  return (
    <div className='w-11/12 mx-auto'>
            <p className='text-3xl font-semibold lg:hidden ' onClick={()=>setMenuButton(!menuButton)}><AiOutlineMenu/></p>  
            <div className='flex justify-between '>
                {/* side bar  */}
                <div className={`lg:w-[20%] border shadow-xl lg:px-8 px-4 py-6 flex flex-col ${menuButton ? "flex absolute mt-2 z-20 bg-white":"hidden"} lg:flex`}>

                    <NavLink to="/dashboard" end className={({ isActive }) =>isActive ? ' flex gap-2 items-center px-8 py-3 bg-[#2874f0] text-white rounded-lg cursor-pointer' : 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'}>
                        <p className='text-xl'><MdDashboard/></p>
                        <p >Dashboard</p>
                    </NavLink>

                    <NavLink to="/dashboard/products"  className={({ isActive }) =>isActive ? 'text-white flex gap-2 items-center px-8 py-3 bg-[#2874f0] rounded-lg cursor-pointer' : 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'}>
                        <p className='text-xl'><FaRegComments/></p>
                        <p >Products</p>
                    </NavLink>

                    <NavLink to="/dashboard/category"  className={({ isActive }) =>isActive ? 'text-white flex gap-2 items-center px-8 py-3 bg-[#2874f0] rounded-lg cursor-pointer' : 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'}>
                        <p className='text-xl'><MdCategory/></p>
                        <p >Category</p>
                    </NavLink>

                    <NavLink to="/dashboard/orders"  className={({ isActive }) =>isActive ? 'text-white flex gap-2 items-center px-8 py-3 bg-[#2874f0] rounded-lg cursor-pointer' : 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'}>
                        <p className='text-xl'><FaJediOrder/></p>
                        <p >Orders</p>
                    </NavLink>

                    <div  className= 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'>
                        <p className='text-xl'><MdOutlineCrisisAlert/></p>
                        <p >Sales</p>
                    </div>

                    <div  className= 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'>
                        <p className='text-xl'><GoPeople/></p>
                        <p >Customers</p>
                    </div>

                    <NavLink to="/dashboard/logout"  className={({ isActive }) =>isActive ? 'text-white flex gap-2 items-center px-8 py-3 bg-[#2874f0] rounded-lg cursor-pointer' : 'text-black flex gap-2 items-center px-8 py-3 rounded-lg cursor-pointer'}>
                        <p className='text-xl'><FiLogOut/></p>
                        <p >Logout</p>
                    </NavLink>


                </div>

                {/* main content  */}
                <div className='lg:w-[79%] shadow-lg'>
                    <div className={`${path === "/dashboard" ? "block":"hidden"}`}>
                        <div className='flex flex-col gap-5 px-6 py-6 shadow-lg'>
                            
                            <div>
                                <p className='font-semibold'>Name :</p>
                                <p className='pl-4'>{userDetail.name}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Email :</p>
                                <p className='pl-4'>{userDetail.email}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Admin :</p>
                                <p className='pl-4'>{userDetail.admin ? "True" :"False"}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>About :</p>
                                <p className='pl-4'>This is me which is your product creater...</p>
                            </div>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </div>
    </div>
  )
}

export default AdminDashboard
