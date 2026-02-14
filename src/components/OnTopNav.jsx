import { PhoneIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

export default function OnTopNav() {
  return (
    <>
     <div className='bg-[#F6F8F9] dark:bg-black py-3'>
      <div className='flex items-center justify-between  px-5 md:px-10 lg:px-20 bg-[#F6F8F9] dark:bg-black py-2  '>
       <div>
         <Image src={'/logo.png'} alt='logo' width={150} height={150} />
       </div>
       <div className=' flex items-center gap-5'>
        <div className=' hidden lg:block'>
          <Image src={'/certificates.png'} alt='logo' width={150} height={150} />
        </div>
         <div className='bg-[#004E59] w-px h-15'></div>
         <div className='flex flex-col items-start'>
            <div className='flex items-center gap-1 '>
              <h1 className='text-3xl text-[#004E59]'>19444 </h1>
               <PhoneIcon className='w-7 h-7 bg-[#004E59] p-1 rounded-full text-white'/>
            </div>
            <p className=' text-gray-700 dark:text-gray-300 text-xs ms-1'>Available daily for 24 hours</p>
         </div>
       </div>
      </div>
     </div>
    </>
  )
}
