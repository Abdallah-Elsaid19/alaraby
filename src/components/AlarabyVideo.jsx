import { PlayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

export default function AlarabyVideo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 mb-20 px-5  lg:px-0    gap-5 ">
        <div className="col-span-2   pr-0 lg:pr-20 border-black/10 dark:border-white/10 ">
          <p className="text-lg font-semibold mb-2">
            Welcome ELARABY Hospital
          </p>
          <p className="text-sm font-semibold leading-loose">
            ELARABY Hospital is the largest accredited
            medical institution in the Delta. The hospital also holds the
            national accreditation (GAHAR) from the General Authority for Health
            Accreditation and Control in Egypt. Moreover, the hospital holds the
            (ISO 22000) certificate for the third time in a row, which aims to
            provide safe food for patients and visitors. ELARABY Hospital
            provides all medical specialties to be capable of providing the best
            health care using the latest diagnostic and therapeutic devices,
            with a capacity of up to 300 beds. The hospital has 8 operating
            rooms, which allows many operations to be performed at the same
            time. The operating rooms are designed with a capsule system, and
            this system matches the highest standers of infection control. In
            addition, the operating department is prepared with the newest and
            latest devices of microscopic and laparoscopic surgeries to be used
            in all surgical specialties such as general surgery, neurosurgery,
            vascular surgery, ophthalmology surgery, ENT surgeries, Obstetrics
            and gynecological surgeries, Maxillofacial surgery, and orthopedic
            surgeries. All operating corridors are equipped with a PVC system,
            which is an isolation system against bacteria.
          </p>
        </div>
        <div className="col-span-2 flex flex-col justify-start items-center">
          <Image src={"/welcome.png"} alt="ELARABY Hospital" width={700} height={700} />
          
          {/* Hidden checkbox للتحكم في الـ modal */}
          <input type="checkbox" id="modal-toggle" className="hidden peer" />
        
          {/* الزر */}
          <label
            htmlFor="modal-toggle"
            className="flex items-center gap-2 cursor-pointer mt-4"
          >
            <PlayIcon className="w-10 h-10 p-2 bg-[#0093A1] rounded-full text-gray-200" />
            <span className="text-sm font-semibold">Watch ELARABY Hospital</span>
          </label>
        
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-opacity duration-300">
            <div className="relative w-full max-w-4xl p-4">
              {/* زر إغلاق */}
              <label
                htmlFor="modal-toggle"
                className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
              >
                &times;
              </label>
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/EOW6vUcE_AE"
                  title="ELARABY Hospital"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
