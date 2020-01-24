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
  faBus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import logoSmall from "../assets/ycttrn-logo-400-crop.png";
import RangeSlider from "./RangeSlider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import data from "../data/db.json";
import * as turf from "@turf/turf";

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
    let _nearbyPoints = this.filterByRadius(
      this.state.selectedPoint[1],
      this.state.selectedPoint[0],
      this.state.radius
    );
    this.setState({
      nearbyPoints: _nearbyPoints
    });
  };

  filterByRadius = (lat, lon, r) => {
    let filteredData = [];
    data.forEach(obj => {
      const from = turf.point([lon, lat]);
      const to = turf.point([obj.longitude, obj.latitude]);
      const distance = turf.distance(from, to) * 1000;
      if (distance <= r) {
        filteredData.push(obj);
      }
    });
    return filteredData;
  };

  generateIcon = type => {
    switch (type) {
      case "grocery":
        return <FontAwesomeIcon icon={faShoppingBasket} color="#74ba5d" />;
      case "subway":
        return <FontAwesomeIcon icon={faSubway} color="#8b32bf" />;
      case "school":
        return <FontAwesomeIcon icon={faSchool} color="#5d87ba" />;
      case "health":
        return <FontAwesomeIcon icon={faMedkit} color="#d9a64e" />;
      case "bus_stop":
        return (
          <FontAwesomeIcon
            icon={faBus}
            color="#32bf9c"
            style={{ fontSize: 3, opacity: 0.5 }}
          />
        );
      case "hospital":
        return <FontAwesomeIcon icon={faPlus} color="#ff1100" />;
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
        {/* Radius bar */}
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            right: 0,
            margin: 10,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
          }}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <RangeSlider setRadius={this.setRadius} style={{ margin: 10 }} />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 10 }}
              onClick={() => {
                if (this.state.selectedPoint === null) {
                  alert("Select a point");
                } else {
                  this.fetchNearbyPoints();
                }
              }}
            >
              Find
            </Button>
          </Grid>
        </div>

        <ReactMap
          ref={this.mapRef}
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this.handleViewportChange}
          onDblClick={this.selectedPoint}
          doubleClickZoom={false} //For double click pin
          mapStyle={"mapbox://styles/mapbox/dark-v10"}
        >
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
          {/* Instructions */}
          <div
            style={{
              backgroundColor: "#333333",
              color: "white",
              position: "absolute",
              zIndex: 1,
              bottom: 0,
              opacity: 0.7,
              padding: 10,
              margin: 10,
              borderRadius: 5,
              textAlign: "left"
            }}
          >
            <p>
              <FontAwesomeIcon icon={faShoppingBasket} color="#74ba5d" />
              &nbsp;Grocery store
            </p>
            <p>
              <FontAwesomeIcon icon={faSubway} color="#8b32bf" />
              &nbsp;Metro station
            </p>
            <p>
              <FontAwesomeIcon icon={faSchool} color="#5d87ba" />
              &nbsp;School
            </p>
            <p>
              <FontAwesomeIcon icon={faMedkit} color="#d9a64e" />
              &nbsp;Medical clinic
            </p>
            <p>
              <FontAwesomeIcon icon={faBus} color="#32bf9c" />
              &nbsp;Bus stop
            </p>
            <p>
              <FontAwesomeIcon icon={faPlus} color="#ff1100" />
              &nbsp;Hospital
            </p>
          </div>
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
              <FontAwesomeIcon
                icon={faMapPin}
                color="#bf3232"
                style={{ fontSize: 24 }}
              />
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
