import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { FaJediOrder } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

function Profile() {


    const [menuButton, setMenuButton ] = useState(false)


  return (
    <div className='lg:w-10/12 w-11/12 mx-auto '>
         <p className='text-3xl font-semibold lg:hidden ' onClick={()=>setMenuButton(!menuButton)}><AiOutlineMenu/></p>
        <div className='lg:pt-10 flex  relative  justify-between'>
       
            {/* side bar  */}
            <div className={`lg:w-[20%] w-[65%] border-2  flex-col gap-4 h-[100vh] ${menuButton ? "flex absolute z-20 bg-white":"hidden"} lg:flex`}>
                
                <NavLink to={"/profile"} end className={({ isActive }) =>
                    isActive
                        ? "bg-[#2874f0] text-white flex gap-3 items-center lg:pl-16 pl-6 py-2  cursor-pointer" // Active tab styles
                        : "text-black flex gap-3 items-center lg:pl-16 pl-6  py-2  cursor-pointer" // Inactive tab styles
                    }>
                    <p className='text-2xl '><CgProfile/></p>
                    <p className='text-lg'>Dashboard</p>
                </NavLink>
                
                <NavLink to={"/profile/my-orders"} className={({ isActive }) =>
                    isActive
                        ? "bg-[#2874f0] text-white flex gap-3 items-center lg:pl-16 pl-6 py-2  cursor-pointer" // Active tab styles
                        : "text-black flex gap-3 items-center lg:pl-16 pl-6 py-2  cursor-pointer" // Inactive tab styles
                    }>
                    <p className='text-2xl '><FaJediOrder/></p>
                    <p className='text-lg'>Orders</p>
                </NavLink>

                <NavLink to={"/profile/logout"} className={({ isActive }) =>
                    isActive
                        ? "bg-[#2874f0] text-white flex gap-3 items-center lg:pl-16 pl-6 py-2  cursor-pointer" // Active tab styles
                        : "text-black flex gap-3 items-center lg:pl-16 pl-6  py-2  cursor-pointer" // Inactive tab styles
                    }>
                    <p className='text-2xl '><FiLogOut/></p>
                    <p className='text-lg'>Logout</p>
                </NavLink>
                

            </div>

            <div className='lg:w-[77%] '>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Profile
