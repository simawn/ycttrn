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
import { noAuto } from "@fortawesome/fontawesome-svg-core";

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
          transform: "translate(-200px)",
          color: "white"
        }}
      >
        <p
          style={{
            bottom: -36,
            left: "50%",
            transform: "translate(-50%)",
            margin: "auto",
            position: "absolute",
            backgroundColor: "#333333",
            padding: 5,
            borderRadius: 5,
            opacity: 0.5
          }}
        >
          Double click the map to add a pin. Scroll to zoom.
        </p>
      </div>
      <Map />
    </div>
  );
}

export default App;
