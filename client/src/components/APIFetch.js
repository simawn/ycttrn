import { BACKEND_IP } from "./APISettings";

export let getNearbyPoints = async (lat, lon, radius) => {
  try {
    let path = "https://randomuser.me/api/?gender=female";
    let response = await (await fetch(path)).json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
