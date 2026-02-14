import Image from 'next/image'
import React from 'react'

export default function ManagementMembers() {
  const members = [
    {id:1 , name:"Eng / Mohamed Mahmoud Elaraby" , postition:"CEO at ELARABY Group" , image:"/ceo.png"}, 
    {id:2 , name:"Mr / Wagdi Zeyad" , postition:"Deputy Medical CEO" , image:"/medicalCEO.png"},  
    {id:3 , name:"Dr / Said Elbarbary" , postition:"Deputy CEO Consultant" , image:"/ceoConsultant.png"}, 
    {id:4 , name:"Dr / Mohamed Ali Elaraby" , postition:"ELARABY Hospital CEO" , image:"/hospitalCeo.png"}, 
  ]
  return (
    <div className="row px-5  lg:px-0">
        
            <div>
              <h2 className="font-semibold py-10">Management Members</h2>
            </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10  pb-20">
              {members.map((item)=>(
                <div 
                  key={item.id}
                  className=" flex flex-col  items-center gap-1  rounded-lg  hover:shadow-2xl hover:shadow-[#00A5B2]/20 transition duration-300 ease-in-out "
                >
                  <Image src={item.image} alt={item.name} width={250} height={250} />
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm font-semibold text-gray-500 ">{item.postition}</p>
                </div>
              ))}
          </div>
        </div>
  )
}
