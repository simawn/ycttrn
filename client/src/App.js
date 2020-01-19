import React from "react";
import Map from "./components/Map";
import "./App.css";
import logoSmall from "./assets/ycttrn-logo-400-crop.png";
function App() {
  return (
    <div className="App">
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
