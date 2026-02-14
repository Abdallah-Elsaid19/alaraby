"use client";
import { useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "@/schemas/patientSchema";

const PatientForm = forwardRef(({ onSubmit, defaultValues }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  return (
    <form className="bg-white dark:bg-zinc-900 dark:border dark:border-gray-200 p-5 rounded shadow w-full">
      <h2 className="font-semibold mb-2 text-lg">
        Patient Information
      </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-3">
        <div>
          <p className="text-xs font-semibold mb-1">First Name</p>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="border border-[#00a0a0] focus:outline-0 px-3 py-2 text-xs rounded w-full mb-1"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mb-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
      
        <div >
          <p className="text-xs font-semibold mb-1">Last Name</p>
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="border border-[#00a0a0] focus:outline-0 px-3 py-2 text-xs rounded w-full mb-1"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mb-2">
              {errors.lastName.message}
            </p>
          )}
        </div>
    </div>
       
      <div className="mb-3">
        <p className="text-xs font-semibold mb-1">Email Address</p> 
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border border-[#00a0a0] focus:outline-0 px-3 py-2 text-xs rounded w-full mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {errors.email.message}
          </p>
        )}
      </div>
      
      <div className="mb-3">
        <p className="text-xs font-semibold mb-1">Phone Number</p>
        <input
          type="tel"
          placeholder="Phone"
          {...register("phone")}
          className="border border-[#00a0a0] focus:outline-0 px-3 py-2 text-xs rounded w-full mb-1"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mb-2">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold mb-1">Reason for Visit</p>
        <textarea
          placeholder="Reason for visit"
          {...register("reasonForVisit")}
          className="border border-[#00a0a0] focus:outline-0 px-3 py-4 text-xs rounded w-full mb-3"
        />
        {errors.reasonForVisit && (
          <p className="text-red-500 text-sm mb-2">
            {errors.reasonForVisit.message}
          </p>
        )}
      </div>

    </form>
  );
});

PatientForm.displayName = "PatientForm";
export default PatientForm;