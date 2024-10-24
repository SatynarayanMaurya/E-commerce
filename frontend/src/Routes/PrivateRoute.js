import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) =>{

    const isAdmin = useSelector((state)=>state.auth.isAdmin);
    // console.log("Your admin is : ",isAdmin)

    if(isAdmin === 'true' || isAdmin === true){
        return children;
    }
    else{
        return <Navigate to="/"/>
    }
 
}

export default PrivateRoute
