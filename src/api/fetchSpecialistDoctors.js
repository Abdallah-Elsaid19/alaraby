import axios from "axios";

export async function fetchSpecialistDoctors(){
  try {
    const res = await axios.get("https://6987b0ca780e8375a686d2d4.mockapi.io/elarabyClinic/sprcialistDoctors",{cache:"no-store"});
    console.log(res.data);
    return res.data;
  } catch (error){
    console.error("Error fetching specialist doctors:", error);
    throw error;
  }
}