"use client";

import Slider from "react-slick";
import DoctorCard from "./DoctorCard";

export default function DoctorsSlider({ doctors }) {
  const settings = {
    dots: true,
    arrows: true,
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
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </Slider>
  );
}
