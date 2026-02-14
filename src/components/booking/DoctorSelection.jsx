export default function DoctorSelection({ selectedDoctor, setSelectedDoctor, selectedSpecialty, setSelectedSpecialty, specialties, doctors }) {
  return (
    <div className="bg-white border border-gray-200 w-full rounded  px-20 py-10 dark:bg-zinc-900 ">
      <h2 className="font-semibold mb-1 text-sm dark:text-gray-200">Specialty</h2>
      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        className="border p-2 rounded w-full mb-4 text-xs  focus:outline-none focus:border-[#00a0a0] cursor-pointer dark:bg-zinc-900 dark:border dark:text-gray-200"
      >
        <option value="">Select Specialty</option>
        {specialties.map((specialty) => (
          <option key={specialty.id} value={specialty.name}>
            {specialty.name}
          </option>
        ))}
      </select>


      <h2 className="font-semibold mb-1 text-sm dark:text-gray-200">Select Doctor</h2>
      <select
        value={selectedDoctor?.name || ""}
        onChange={(e) => {
           const doctor = doctors.find(doc => doc.name === e.target.value);
           setSelectedDoctor(doctor);
        }}

        className="border p-2 rounded w-full dark:bg-zinc-900 dark:border dark:text-gray-200 text-xs focus:outline-none focus:border-[#00a0a0] cursor-pointer"
      >
        <option value="">Select Doctor</option>
        {selectedSpecialty && (
          <>
            {doctors
              .filter((doc) => doc.specialty === selectedSpecialty)
              .map((doc) => ( 
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
          </>
        )}
      </select>
    </div>
  );
}
