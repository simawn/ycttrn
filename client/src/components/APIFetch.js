import { BACKEND_IP } from "./APISettings";

export let getNearbyPoints = async (lat, lon, radius) => {
  try {
    let path = "http://" + BACKEND_IP + "/coords?lat=" + lat + "&lon=" + lon + "&r=" + radius;
    let response = await(await fetch(path)).json();
    return response
  } catch (error) {
    console.error(error);
  }
};
