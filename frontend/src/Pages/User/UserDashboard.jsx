import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { authEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import {setLoading} from "../../Redux/Slices/authSlice"
import Spinner from '../../Components/Spinner'
function UserDashboard() {


    const token = useSelector((state)=>state.auth.token)
    const [userDetail, setUserDetail] = useState({})
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()

    const getUserDetails = async ()=>{
        try{
            dispatch(setLoading(true))
            const response =await apiConnector("get", authEndpoints.USER_DETAILS_API, {},{Authorization:`Bearer ${token}`})
            dispatch(setLoading(false))
            setUserDetail(response.data.user)
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            return ;
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[token])


  return (
    <div className='border p-6 lg:mt-0 mt-6'>
        {loading && <Spinner/>}
        <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-1'>
                <p className='font-semibold'>Name : </p>
                <p className='pl-2'>{userDetail.name}</p>
            </div>

            <div className='flex flex-col gap-1'>
                <p className='font-semibold'>Email : </p>
                <p className='pl-2'>{userDetail.email}</p>
            </div>

            <div className='flex flex-col gap-1'>
                <p className='font-semibold'>Admin : </p>
                <p className='pl-2 uppercase'>{userDetail.admin ? "True":"False"}</p>
            </div>

        </div>
    </div>
  )
}

export default UserDashboard
