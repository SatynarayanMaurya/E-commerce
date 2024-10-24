import React from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { setAdmin, setToken } from '../../Redux/Slices/authSlice'

function AdminLogout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logoutHandler = ()=>{
        dispatch(setToken("null"))
        localStorage.setItem("token", 'null')

        dispatch(setAdmin(false))
        localStorage.setItem("admin", false)

        navigate("/")
    }


  return (
    <div className='lg:ml-44  mt-24'>
        <div className='lg:w-[400px] w-[330px] h-[200px] border p-6 shadow-lg flex flex-col gap-3 rounded-xl'>
            <h1 className='text-2xl font-semibold'>Logout ?</h1>
            <p className='text-lg pl-3'>Do you want to log out ?</p>

            <div className='flex gap-4 mt-4 justify-end'>
                <button onClick={logoutHandler} className='px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg  transition-all duration-200  text-lg font-semibold text-white'>Yes</button>
                <button className='px-4 py-2 bg-zinc-500 hover:bg-zinc-700 transition-all duration-200 rounded-lg  text-lg font-semibold text-white'>No</button>
            </div>
        </div>
    </div>
  )
}

export default AdminLogout
