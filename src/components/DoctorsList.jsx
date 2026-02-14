import Image from 'next/image';
import React from 'react'

export default function DoctorsList({doctors}) {
  const {id , name, avatar, jobTitle, clinicHours} = doctors;
  return (
    
    <div key={id} className=' bg-white dark:bg-zinc-900 rounded-md  px-10 py-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5'>

      <div>
          <Image src={avatar || 'https://i.ibb.co/4Rhxdspc/image.png'} alt={name} width={250} height={250} className="object-cover" loading="lazy" />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>{name}</h3>
        <p className='text-sm text-gray-500'>{jobTitle}</p>
      </div>

      <div className='flex flex-col flex-1 rounded-md p-5 md:h-25 bg-[#F8F8F8] dark:bg-black col-span-2 '>
      <div className='flex items-center gap-2 mb-2'>
          <Image src={"/smallLogo.png"} alt='elaraby logo' width={20} height={20}  />
          <p className='text-sm font-semibold '>{clinicHours[0]?.clinic || 'No Clinic'}</p>
      </div>

        <div className='flex gap-1 md:gap-2  lg:gap-5 flex-wrap md:flex-nowrap '>
          {clinicHours.map((hour, index) => (
            <div key={index} className='flex  items-center gap-1 py-3 '>
              <p className='text-xs secondary dark:text-gray-200'>{hour.day}</p>
              <p
                className={`text-xs secondary dark:text-gray-200 pr-2 ${
                  index !== clinicHours.length - 1 ? 'border-r' : ''
                }`}
              >
                {hour.from}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  
  )
}
