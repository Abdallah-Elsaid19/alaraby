import AlarabyVideo from "@/components/AlarabyVideo";
import ManagementMembers from "@/components/ManagementMembers";
import OurMotto from "@/components/OurMotto";
import StatsSection from "@/components/StatsSection";
import { PlayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const revalidate = 0; 

export default function About() {
  
  return (
    <div className="bg-white dark:bg-black ">
      <section className="relative  overflow-hidden">
        {/* Image */}
        <Image
          src="/about.png"
          alt="About Us"
          width={1920}
          height={1024}
          className="  object-contain "
        />

        {/* Content */}
        <div className="absolute top-0 left-0 md:top-10 md:left-10 z-10">
          <div className="px-10 text-white max-w-3xl">
            <h2 className="text-sm md:text-lg font-bold md:mb-4">About US</h2>
            <p className="text-xs md:text-sm leading-relaxed ">
              ELARABY Hospital is the largest accredited medical institution in
              the Delta. The hospital also holds the national accreditation
              (GAHAR) from the General Authority for Health Accreditation and
              Control in Egypt.
            </p>
          </div>
        </div>
      </section>  

    <div className="row ">
        <AlarabyVideo />
    </div>

      <div className="row px-5  lg:px-0">
        <p className="font-semibold mb-5">Some of the certificates we got</p>
        <Image src={'/certificates.png'} alt='logo' width={150} height={150} />
      </div>

      <div className="row ">
        <StatsSection/>
      </div>

      <div className="  bg-[#F2FCFB] dark:bg-zinc-900">
        <OurMotto/>
      </div>

      <div className="   dark:bg-zinc-900">
        <ManagementMembers />
      </div>
    </div>
  );
}
