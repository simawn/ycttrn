import React, { Component } from "react";
import ReactMap, { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import {getNearbyPoints} from './APIFetch';

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

  selectedPoint = (e) => {
    this.setState({
      selectedPoint: e.lngLat
    }, async () => {
      let res = await getNearbyPoints(this.state.selectedPoint[0], this.state.selectedPoint[1], 100);
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <ReactMap
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
          onClick={this.selectedPoint}
        >
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
