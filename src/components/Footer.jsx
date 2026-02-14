"use client"
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'
import MapSection from './MapSection'

export default function Footer() {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  }
  return (
    <div 
      className=' bg-cover bg-[#004E59] bg-blend-color-burn dark:bg-black dark:bg-blend-normal '
      style={{backgroundImage:"url('/footer.png')"}}
    >
    <div className='row py-15  px-5 lg:px-0'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 md-gap-7 lg-gap-5 '>

        <div >
          <Image src={"/whiteLogo.png"} alt='White Logo' width={250} height={200} onClick={goHome} className='cursor-pointer' />
          <div className='flex flex-col gap-5 md:gap-7 lg:gap-10 mt-10'>
            <Link href={"/"}><p className='text-gray-100 text-xs font-semibold hover:text-teal-200'>Home</p></Link>   
            <Link href={"/about"}><p className='text-gray-100 text-xs font-semibold hover:text-teal-200'>About US</p></Link>
            <Link href={"/doctors"}><p className='text-gray-100 text-xs font-semibold hover:text-teal-200'>Our Doctors</p></Link>
          </div>
        </div>

        <div className='flex flex-col gap-7 '>
          <p className='text-gray-100 text-sm font-semibold'>Address</p>
          <div className='flex items-center gap-1'>
            <MapPinIcon className='h-4 w-4 text-[#00A5B2] '/>
            <p className='text-gray-300 text-xs font-semibold'>11 Salah Salem , Al Sarayat, Al Waili, Cairo Governorate</p>
          </div>
          <MapSection/>
        </div>

        <div>
          <p className='font-semibold text-sm text-gray-100'>Subscribe to see latest news</p>
          <div className='flex mt-5'>
            <button className=' bg-[#00A5B2] hover:bg-[#89C9C8] text-gray-100 hover:text-white px-8 py-4  text-sm font-semibold rounded-l-lg cursor-pointer'>Subscribe now </button>
            <input type='email' placeholder='email@example.com' className='flex-1 px-2  text-xs rounded-r-lg focus:outline-none bg-white'/>
          </div>
        </div>

         <div className='flex flex-col items-center lg:items-start'>
            <div className='flex items-center gap-2 '>
              <PhoneIcon className='w-7 h-7 text-[#004E59] p-1 rounded-full bg-gray-100'/>
              <h1 className='text-3xl text-gray-100'>19444 </h1>
            </div>
            <p className=' text-gray-100 dark:text-gray-300 font-semibold text-xs ms-1 mt-0.5 '>Available daily for 24 hours</p>
            <p className=' text-gray-100 dark:text-gray-300 font-semibold text-xs ms-1 mt-2'>contactus@elarabyhospital.com</p>
         </div>
        <div className='flex items-center justify-center gap-10'>
          <i className="fa-brands fa-facebook text-2xl text-gray-100 hover:text-teal-100 cursor-pointer"></i>
          <i className="fa-brands fa-instagram text-2xl text-gray-100 hover:text-teal-100 cursor-pointer"></i>
          <i className="fa-brands fa-linkedin text-2xl text-gray-100 hover:text-teal-100 cursor-pointer"></i>
          <i className="fa-brands fa-youtube text-2xl text-gray-100 hover:text-teal-100 cursor-pointer"></i>
        </div>
        <div className='flex items-center justify-center'>
          <p className='text-gray-100 text-xs font-semibold'>تم تطويره بواسطة ادارة الحلول الرقمية | E-Business Department</p>
        </div>
      </div>
    </div>
    </div>
  )
}
