import React, { Component } from "react";
import ReactMap, { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faMapPin,
  faShoppingBasket,
  faSubway,
  faSchool,
  faMedkit,
  faBus
} from "@fortawesome/free-solid-svg-icons";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { getNearbyPoints } from "./APIFetch";
import RangeSlider from "./RangeSlider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
        zoom: 13
      },
      radius: 500, //In meters
      selectedPoint: null,
      nearbyPoints: []
    };
  }

  selectedPoint = e => {
    this.setState(
      {
        selectedPoint: e.lngLat
      },
      () => this.fetchNearbyPoints()
    );
  };

  fetchNearbyPoints = async () => {
    let _nearbyPoints = await getNearbyPoints(
      this.state.selectedPoint[1],
      this.state.selectedPoint[0],
      this.state.radius
    );
    this.setState({
      nearbyPoints: _nearbyPoints
    });
  };

  generateIcon = type => {
    switch (type) {
      case "grocery":
        return <FontAwesomeIcon icon={faShoppingBasket} />;
      case "subway":
        return <FontAwesomeIcon icon={faSubway} />;
      case "school":
        return <FontAwesomeIcon icon={faSchool} />;
      case "health":
        return <FontAwesomeIcon icon={faMedkit} />;
      case "bus_stop":
        return <FontAwesomeIcon icon={faBus} />;
      default:
        return <FontAwesomeIcon icon={faMapMarker} />;
    }
  };

  setRadius = _radius => {
    this.setState({
      radius: _radius
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
    this.setState(
      {
        selectedPoint: coords
      },
      () => this.fetchNearbyPoints()
    );
  };

  mapRef = React.createRef();

  render() {
    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <RangeSlider setRadius={this.setRadius} style={{margin: 10}}/>
          <Button variant="contained" color="primary" style={{margin: 10}} onClick={() => {
            if(this.state.selectedPoint === null){
              alert("Select a point");
            } else {
              this.fetchNearbyPoints();
            }
          }}>
            Find
          </Button>
        </Grid>

        <ReactMap
          ref={this.mapRef}
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this.handleViewportChange}
          onDblClick={this.selectedPoint}
          doubleClickZoom={false} //For double click pin
        >
          {/* Search bar */}
          <Geocoder
            mapRef={this.mapRef}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
            onResult={this.geocoderResult}
            countries="ca"
          />
          {/* Selection Marker*/}
          {this.state.selectedPoint !== null && (
            <Marker
              key="selection"
              latitude={this.state.selectedPoint[1]}
              longitude={this.state.selectedPoint[0]}
            >
              <FontAwesomeIcon icon={faMapPin} />
            </Marker>
          )}
          {/* Result markers */}
          {this.state.nearbyPoints.map(point => (
            <Marker
              key={point.id}
              latitude={point.latitude}
              longitude={point.longitude}
            >
              {this.generateIcon(point.type)}
            </Marker>
          ))}
        </ReactMap>
      </div>
    );
  }
}
