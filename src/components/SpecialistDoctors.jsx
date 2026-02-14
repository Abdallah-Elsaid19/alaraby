import { fetchSpecialistDoctors } from '@/api/fetchSpecialistDoctors';
import React from 'react'
import DoctorsSlider from './DoctorsSlider';
import Link from 'next/link';

export default async function SpecialistDoctors() {
  const doctors = await  fetchSpecialistDoctors();
  return (
    <>
       <div className='w-full flex justify-between items-center'>
        <h2 className='font-semibold px-5 md:px-2 lg:px-0'>Specialist Doctors</h2>
        <Link href={"/doctors"} className='text-sm font-semibold secondary px-5 md:px-2 lg:px-0 cursor-pointer'>show all</Link>
       </div>
       <DoctorsSlider doctors={doctors} />

    </>
  )
}
