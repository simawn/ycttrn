import React from "react";
import Map from "./components/Map";
import "./App.css";
import logoSmall from "./assets/ycttrn-logo-400-crop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faMapPin,
  faShoppingBasket,
  faSubway,
  faSchool,
  faMedkit,
  faBus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      {/* Logo */}
      <div
        style={{
          backgroundImage: `url(${logoSmall})`,
          position: "absolute",
          zIndex: 1,
          height: 180,
          width: 400,
          backgroundRepeat: "no-repeat",
          left: "50%",
          transform: "translate(-200px)"
        }}
      ></div>
      <Map />
    </div>
  );
}

export default App;
