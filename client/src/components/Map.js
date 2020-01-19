import React, { Component } from "react";
import ReactMap, { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { getNearbyPoints } from "./APIFetch";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

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
      },
      selectedPoint: null
    };
  }

  selectedPoint = e => {
    this.setState({
      selectedPoint: e.lngLat
    }, () => {
      getNearbyPoints(this.state.selectedPoint[1], this.state.selectedPoint[0], 10000000);
    });
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  geocoderResult = e => {
    let coords = e.result.geometry.coordinates;
    this.setState({
      selectedPoint: coords
    });
  };

  mapRef = React.createRef();

  render() {
    return (
      <div>
        <ReactMap
          ref={this.mapRef}
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this.handleViewportChange}
          onClick={this.selectedPoint}
        >
          {/* Search bar */}
          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
            onResult={this.geocoderResult}
          />
          {/* Selection Marker*/}
          {this.state.selectedPoint !== null && (
            <Marker
              key="selection"
              latitude={this.state.selectedPoint[1]}
              longitude={this.state.selectedPoint[0]}
            >
              <FontAwesomeIcon icon={faMapMarker} />
            </Marker>
          )}
        </ReactMap>
      </div>
    );
  }
}
