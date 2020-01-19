import { BACKEND_IP } from "./APISettings";

export let getNearbyPoints = async (lat, lon, radius) => {
  try {
    let path = "http://127.0.0.1:4000/coords?lat=" + lat + "&lon=" + lon + "&r=" + radius;
    console.log(path);
    let response = await(await fetch(path)).json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
