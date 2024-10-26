import React from 'react'
import mens from "../Assests/Products/fashion.png"
import woman from "../Assests/Products/woman.webp"
import mobile from "../Assests/Products/mobiles.png"
import electronic from "../Assests/Products/electronic.png"
import led from "../Assests/Products/led.jpg"
import sport from "../Assests/Products/sport.png"
import home from "../Assests/Products/Home.jpg"
import kids from "../Assests/Products/kida.png"
import surf from "../Assests/Products/surf.png"
import beauty from "../Assests/Products/Beauty.png"
import { Link } from 'react-router-dom'

function SecondNavbar() {
  return (
    <div className='mt-[64px]   h-[110px] border-b shadow-lg mb-4 '>

            <div className='w-[85%] mx-auto flex flex-wrap justify-between items-center'>

                <Link to={"/Man"}  className='flex flex-col items-center cursor-pointer'>
                    <img src={mens} width={75} alt="" />
                    <p className='font-semibold'>Man</p>
                </Link>
                
                <Link to={"/Woman"} className='flex flex-col items-center cursor-pointer'>
                    <img src={woman} width={75} alt="" />
                    <p className='font-semibold'>Womans</p>
                </Link>

                <Link to={"/Kids"} className='flex flex-col items-center cursor-pointer'>
                    <img src={kids} width={85} alt="" />
                    <p className='font-semibold'>Kids</p>
                </Link>

                <Link to={"/Mobile"} className='flex flex-col items-center cursor-pointer'>
                    <img src={mobile} width={75} alt="" />
                    <p className='font-semibold'>Mobiles</p>
                </Link>

                <Link to={"/Electronic"} className='flex flex-col items-center cursor-pointer'>
                    <img src={electronic} width={75} alt="" />
                    <p className='font-semibold'>Electronic</p>
                </Link>

                <Link to={"/Home"} className='flex flex-col items-center cursor-pointer'>
                    <img src={home} width={75} alt="" />
                    <p className='font-semibold'>Home & Furniture</p>
                </Link>

                <Link to={"/Grocery"} className='flex flex-col items-center cursor-pointer'>
                    <img src={surf} width={75} alt="" />
                    <p className='font-semibold'>Grocery</p>
                </Link>

                <Link to={"/Appliance"} className='flex flex-col items-center cursor-pointer'>
                    <img src={led} width={75} alt="" />
                    <p className='font-semibold'>Appliances</p>
                </Link>

                <Link to={"Books"} className='flex flex-col items-center cursor-pointer'>
                    <img src={beauty} width={75} alt="" />
                    <p className='font-semibold'>Books</p>
                </Link>

                <Link to={"/Sports"} className='flex flex-col items-center cursor-pointer'>
                    <img src={sport} width={75} alt="" />
                    <p className='font-semibold'>Sports</p>
                </Link>



            </div>
    </div>
  )
}

export default SecondNavbar
