import Image from 'next/image';
import React from 'react'

export default function DoctorCard({ doctor }) {
  if (!doctor) return null;
  const { id, name, avatar, jobTitle } = doctor;
  return (
    <div key={id} className='flex flex-col items-center gap-2 text-center p-4'>
      <div className="relative w-full aspect-[4/5] max-w-[270px]">
        <Image
          src={avatar || "/doctor-placeholder.png"}
          alt={name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className='font-semibold mt-4 text-lg'>{name}</h3>
      <p className='font-medium text-sm text-gray-500 dark:text-gray-400'>{jobTitle}</p>
    </div>
  )
}
