import Image from "next/image";
import React from "react";

export default function OurMotto() {
  const motto = [
    {
      id: 1,
      title: "Our Values",
      description:
        "Loyalty and Dedication: We value loyalty and dedication among our staff, ensuring a strong commitment to our patients and their well-being.Compassion and Supportiveness: Demonstrating compassion and support in patient care, providing a humanistic healthcare experience.Collaboration: We build a culture of teamwork and collaboration, where our medical professionals work together to provide comprehensive care.Continuous Learning: We are dedicated to learning and growth, staying updated with the latest medical advancements to provide the best possible care.Trust and Reliability: Trust is the foundation of our relationships with patients, their families, and the community. We are committed to being a reliable source of healthcare support.",
      image: "/ourValues.png",
    },
    {
      id: 2,
      title: "Our Vision",
      description: "To be the hospital of choice for patients and healthcare professionals in the middle east and north Africa region by providing a continuum of high quality care in a convenient way for patients, families and healthcare providers.",
      image: "/ourVision.png",
    },
    {
      id: 3,
      title: "Our Mission",
      description: "We are committed to providing excellence in healthcare implementing best technology and state of the art management systems, developing and maintaining competences of our professionals, providing safe and healthy food, meeting the needs and exceeding the expectations of our exceptional patients and community.",
      image: "/ourMission.png",
    },
  ];

  return (
    <div className="row mb-0 px-5  lg:px-0 dark:bg-zinc-900">
    
        <div>
          <h2 className="font-semibold py-15">Our motto is to positively influence the health of patients and alleviate their suffering</h2>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  pb-20 ">
          {motto.map((item)=>(
            <div 
              key={item.id}
              className="dark:bg-black flex flex-col  items-center gap-5 text-center border border-[#00A5B2] bg-white p-10  rounded-lg  hover:shadow-2xl hover:shadow-[#00A5B2]/20 transition duration-300 ease-in-out "
            >
              <Image src={item.image} alt={item.title} width={120} height={120} />
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm ">{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
