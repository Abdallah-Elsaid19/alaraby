const CLINIC_NAME = "ELARABY Clinic Salah Salem Branch";

const doctors = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1,
  name: "",
  avatar: "",
  jobTitle: "",
  specialty: "",
  clinicHours: [
    {
      clinic: CLINIC_NAME,
      day: "",
      from: "",
      to: ""
    }
  ]
}));

console.log(JSON.stringify(doctors, null, 2));
