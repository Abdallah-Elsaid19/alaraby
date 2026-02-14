"use client";
import { useEffect, useState } from "react";
import DoctorSelection from "./DoctorSelection";
import AppointmentSchedule from "./AppointmentSchedule";
import PatientForm from "./PatientForm";
import Stepper from "./Stepper";
import { fetchSpecialty } from "@/api/fetchSpecialty";
import { fetchOurDoctors } from "@/api/fetchOurDoctors";
import { createBooking } from "@/api/bookingApi";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import  toast  from "react-hot-toast";

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [appointmentData, setAppointmentData] = useState({});
  const [patientData, setPatientData] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const patientFormRef = useRef();


  useEffect(() => {
    fetchOurDoctors().then((data) => {
      setDoctors(data);
    });
  }, []);

  useEffect(() => {
    fetchSpecialty().then((data) => {
      setSpecialties(data);
    });
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (patientDataOverride = null) => {
    const finalPatientData = patientDataOverride || patientData;

    if (!selectedDoctor || !appointmentData.date || !appointmentData.time || !finalPatientData.firstName || !finalPatientData.lastName) {
      toast.error("Please fill in all required fields")
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create Date object using local time
      const [year, month, day] = appointmentData.date.split("-").map(Number);
      const [hours, minutes] = appointmentData.time.split(":").map(Number);

      const visitDateTime = new Date(year, month - 1, day, hours, minutes, 0);

      // Helper to format date as ISO string with local timezone offset
      const toLocalISOString = (date) => {
        const pad = (num) => String(num).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        const offset = -date.getTimezoneOffset();
        const offsetSign = offset >= 0 ? '+' : '-';
        const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
        const offsetMinutes = pad(Math.abs(offset) % 60);

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000${offsetSign}${offsetHours}:${offsetMinutes}`;
      };

      const bookingData = {
        doctor: {
          id: selectedDoctor.id,
          name: selectedDoctor.name,
          specialty: selectedDoctor.specialty,
          avatar: selectedDoctor.avatar,
        },
        patient: {
          firstName: finalPatientData.firstName,
          lastName: finalPatientData.lastName,
          email: finalPatientData.email || "",
          phone: finalPatientData.phone || "",
          ReasonForVisit: finalPatientData.reasonForVisit || "",
        },
        visitTime: toLocalISOString(visitDateTime),
        createdAt: toLocalISOString(new Date()),
      };
      const result = await createBooking(bookingData);
      setSubmitSuccess(true);
      toast.success("Appointment booked successfully",{
         iconTheme: {
           primary: "#00A5B2",   
           secondary: "#ffffff", 
         },
      });

      // Reset form after successful submission
      setTimeout(() => {
        setCurrentStep(1);
        setSelectedDoctor(null);
        setAppointmentData({});
        setPatientData({});
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating booking:", error);
      setSubmitError("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row p-5 ">
      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {/* Steps */}
      <div className=" mt-5 border border-gray-200 p-5 rounded shadow-sm flex flex-col  gap-5 items-center justify-center">


        {selectedDoctor && (
          <div className="bg-white border border-gray-200 w-full rounded shadow-sm  px-5 md:px-10 lg:px-20 py-5 dark:bg-zinc-900 ">
            <div className="flex  gap-5">
              <Image src={selectedDoctor.avatar || 'https://i.ibb.co/4Rhxdspc/image.png'} alt={selectedDoctor.name} width={100} height={100} />
              <div>
                <h3 className="font-semibold text-lg dark:text-gray-200">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-1 mt-3">
                  <MapPinIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{selectedDoctor.clinicHours[0].clinic}</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {currentStep === 1 && (
          <DoctorSelection
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            specialties={specialties}
            doctors={doctors}
          />
        )}
        {currentStep === 2 && (
          <AppointmentSchedule
            selectedDoctor={selectedDoctor}
            appointmentData={appointmentData}
            setAppointmentData={setAppointmentData}
          />
        )}
        {currentStep === 3 && (
          <PatientForm
            ref={patientFormRef}
            defaultValues={patientData} onSubmit={(data) => {
              setPatientData(data);
              handleSubmit(data);
            }} />
        )}
      </div>

      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200 text-center font-medium">
            Booking created successfully! Redirecting...
          </p>
        </div>
      )}

      {submitError && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-center font-medium">
            {submitError}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer disabled:opacity-50"
          disabled={currentStep === 1 || isSubmitting}
        >
          Back
        </button>

        <button
          onClick={() => {
            if (currentStep === 3) {
              patientFormRef.current?.submit();
            } else {
              nextStep();
            }
          }}
          className="px-4 py-2 bg-secondary cursor-pointer text-white rounded disabled:opacity-50"
          disabled={
            isSubmitting ||
            (currentStep === 1 && !selectedDoctor) ||
            (currentStep === 2 && (!appointmentData.date || !appointmentData.time))
          }
        >
          <p className="">
            {isSubmitting
              ? "Submitting..."
              : currentStep === 3
                ? "Submit"
                : "Next"}
          </p>
        </button>
      </div>
    </div>
  );
}
