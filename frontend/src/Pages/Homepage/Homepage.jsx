import React from 'react'
import SecondNavbar from '../../Components/SecondNavbar'
import { Outlet } from 'react-router-dom'

function Homepage() {
  return (
    <div>

      <div>
          <SecondNavbar/>
      </div>

      <div>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Homepage
