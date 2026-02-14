import BookingWizard from '@/components/booking/BookingWizard'
import React from 'react'

export default function Appointment() {
  return (
    <div className='bg-gray-50 dark:bg-black'>
      <div className='row '>
         <BookingWizard />
      </div>
    </div>
  )
}
