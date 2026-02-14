"use client";

import Slider from "react-slick";
import Image from "next/image";

export default function Carousel() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,

    appendDots: (dots) => (
      <div className="absolute top-30 left-0 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        <Image
          src="/carouselOne.png"
          alt="1"
          width={1500}
          height={600}
        
        />
        <Image
          src="/carouselTwo.png"
          alt="2"
          width={1500}
          height={600}
      
        />
        <Image
          src="/carouselThree.png"
          alt="3"
          width={1500}
          height={600}
      
        />
      </Slider>
    </div>
  );
}
