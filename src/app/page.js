import AlarabyVideo from "@/components/AlarabyVideo";
import Carousel from "@/components/Carousel";
import SpecialistDoctors from "@/components/SpecialistDoctors";
import StatsSection from "@/components/StatsSection";
import { PlayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  return (
    <div className="row bg-white font-sans dark:bg-black">
       <Carousel />
       
       <AlarabyVideo />

      <div className=" px-5  lg:px-0">
        <p className="font-semibold mb-5">Some of the certificates we got</p>
        <Image src={'/certificates.png'} alt='logo' width={150} height={150} />
      </div>

      <div className=" my-20">
        <StatsSection/>
      </div>

      <div className="mb-5 md:mb-10 lg:mb-30">
        <SpecialistDoctors />
      </div>
    </div>
  );
}
