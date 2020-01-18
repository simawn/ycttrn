import { BACKEND_IP } from "./APISettings";

export let getNearbyPoints = async (lat, lon, radius) => {
  try {
    let path = "http://127.0.0.1:4000/coords?lat=45.5017&lon=73.5673&r=100";
    let response = await fetch(path, {
        headers: { "Content-Type": "application/json", },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
