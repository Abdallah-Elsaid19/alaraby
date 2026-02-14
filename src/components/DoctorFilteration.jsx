"use client";

import { useEffect, useState } from "react";
import { fetchOurDoctors } from "@/api/fetchOurDoctors";
import { fetchSpecialty } from "@/api/fetchSpecialty";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import DoctorsList from "./DoctorsList";
import Image from "next/image";
import Pagination from "./Pagination";

export default function DoctorFilteration() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [tempSearchName, setTempSearchName] = useState("");
  const [appliedSearchName, setAppliedSearchName] = useState("");
  

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  // fetch doctors
  useEffect(() => {
    fetchOurDoctors().then((data) => {
      setDoctors(data);
      setFilteredDoctors(data);
    });
  }, []);

  // fetch specialties
  useEffect(() => {
    fetchSpecialty().then((data) => {
      setSpecialties(data);
    });
  }, []);

  // filter doctors
  useEffect(() => {
    let filtered = doctors;

    if (selectedSpecialty) {
      filtered = filtered.filter((d) => d.specialty === selectedSpecialty);
    }

    if (appliedSearchName) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(appliedSearchName.toLowerCase())
      );
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredDoctors(filtered);
    setCurrentPage(1); // reset to first page after filtering/searching
  }, [appliedSearchName, selectedSpecialty, doctors]);

  const handleSearch = () => {
    setAppliedSearchName(tempSearchName);
  };

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full ">
      <p className="font-medium text-sm mb-4 text">Search for doctor</p>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/2  bg-white dark:bg-zinc-900 rounded-lg dark:border-0  border border-gray-200 overflow-hidden">
          <div className="pl-3 secondary font-semibold">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Doctor name"
            value={tempSearchName}
            onChange={(e) => setTempSearchName(e.target.value)}
            className="flex-1 p-2 text-sm outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="bg-[#00A5B2]  text-white px-8 py-2 rounded-lg font-medium hover:bg-[#058089] cursor-pointer transition-colors"
          >
            Search
          </button>
        </div>

        {/* Specialty Dropdown */}
        <div className="relative w-full  md:w-1/2">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 rounded-md text-sm font-medium focus:outline-none focus:border-[#00a0a0] cursor-pointer dark:bg-zinc-900 dark:border-0 dark:text-gray-200"
          >
            <option value="" >Choose specialty</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="px-7">
        {currentDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white" >
            <Image src="/search.png" alt="search" width={150} height={150} className="mx-auto" />
            <p className="font-semibold mt-4">No search results</p>
            <p className="font-semibold text-sm mt-2">Please try searching with another keywords</p>
          </div>
        ) : (
          <div className=" flex flex-col gap-5 rounded-md ">
            {currentDoctors.map((doctor) => (
              <DoctorsList key={doctor.id} doctors={doctor} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />

      {/* Pagination */}
      {/* {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded ${
                number === currentPage
                  ? "bg-[#00a0a0] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )} */}

    </div>
  );
}
