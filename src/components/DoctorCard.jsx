import Image from 'next/image';
import React from 'react'

export default function DoctorCard({doctor}) {
  if (!doctor) return null;
  const {id , name , avatar , jobTitle} = doctor;
  return (
    <div key={id} className='flex  flex-col items-center gap-2 text-center'>
      <Image src={avatar || "/doctor-placeholder.png"} alt={name} width={270} height={250} loading='lazy' className='px-5 md:px-3 lg:px-0' />
      <h3 className='font-semibold mt-5'>{name}</h3>
      <p className=' font-semibold text-sm px-5 text-gray-500'>{jobTitle}</p>
    </div>
  )
}
