"use client";

import { useRef, useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function DoctorsSlider({ doctors }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [doctors]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      // Timeout to allow scroll to complete before checking arrows
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="relative group px-4 pb-12">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg border border-gray-100 dark:border-zinc-700 text-[#004E59] hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all hidden md:block"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}

      {/* Slider Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-4 py-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex-none w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] snap-start"
          >
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg border border-gray-100 dark:border-zinc-700 text-[#004E59] hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all hidden md:block"
          aria-label="Next"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
