import React, { Component } from "react";
import ReactMap from "react-map-gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

console.log(MAPBOX_TOKEN);

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 45.5017,
        longitude: -73.5673,
        width: "100vw",
        height: "100vh",
        zoom: 10
      }
    };
  }
  render() {
    return (
      <div>
        <ReactMap
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
        ></ReactMap>
      </div>
    );
  }
}
