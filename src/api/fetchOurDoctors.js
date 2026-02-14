import axios from "axios";

export async function fetchOurDoctors(){
  try {
    const res = await axios.get("https://6987b0ca780e8375a686d2d4.mockapi.io/elarabyClinic/ourDoctors",{cache:"no-store"});
    console.log(res.data);
    return res.data;
  } catch (error){
    console.error("Error fetching our doctors:", error);
    throw error;
  }
}