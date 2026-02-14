import DoctorFilteration from '@/components/DoctorFilteration'
import React from 'react'

export default function Doctors() {
  return (
    <div className='bg-gray-50 dark:bg-black'>
     <div className='h-30 md:h-50 w-full bg-contain md:bg-cover bg-no-repeat'
      style={{backgroundImage:"url('/ourDoctors.png')"}}
     > 
       <h2 className='row pt-5 md: lg:pt-20 text-lg font-bold'> Our Doctors </h2>
     </div>
      <div className='row py-10 px-5 lg:px-0'>
        <DoctorFilteration/>
      </div>
    </div>
  )
}
