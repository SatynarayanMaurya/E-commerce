import React from 'react'

function CategoryPage() {
  return (
    <div className='p-6 shadow-lg flex flex-col gap-4'>
        <h1 className='text-3xl font-semibold'>Categories :</h1>


        <div className='pl-4 flex flex-col gap-2'>
          <p className='font-semibold'>1. Clothes</p>
          <p className='font-semibold'>2. Man's Fashion</p>
          <p className='font-semibold'>3. Woman's Fashion</p>
          <p className='font-semibold'>4. Kid's </p>
          <p className='font-semibold'>5. Electronic</p>
          <p className='font-semibold'>6. Mobiles</p>
        </div>
    </div>
  )
}

export default CategoryPage
