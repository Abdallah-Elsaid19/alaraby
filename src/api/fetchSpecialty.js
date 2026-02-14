import axios from "axios";

export async function fetchSpecialty(){
  try {
    const res = await axios.get("https://695b39211d8041d5eeb62629.mockapi.io/myContacts/specialty",{cache:"no-store"});
    console.log(res.data);
    return res.data;
  } catch (error){
    console.error("Error fetching specialty:", error);
    throw error;
  }
}