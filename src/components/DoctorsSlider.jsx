"use client";

import Slider from "react-slick";
import DoctorCard from "./DoctorCard";

export default function DoctorsSlider({ doctors }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    appendDots: (dots) => (
      <div className="absolute -bottom-10 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false },
      },
    ],
  };

  return (
    <div className="pb-12 px-4">
      <Slider {...settings}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="px-2">
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
