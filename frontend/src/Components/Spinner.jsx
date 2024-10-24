import React from 'react'
import loading from "../Assests/Loading/gif1.gif"
function Spinner() {
  return (
    <div className='h-[106vh] flex items-center justify-center -mt-10 fixed inset-0 bg-black  bg-opacity-65 backdrop-blur-sm z-10'>
        <div  className=''>
            <img src={loading} alt="" width={300} />

        </div>
    </div>
  )
}

export default Spinner