import { Map, Marker, TileLayer } from "react-leaflet";
import React from "react";
import '../App.css';

function AppMap(props) {

    // Render restaurant list as links
    // And map with the markers in the mapMarkers array

    console.log(props.mapLat, props.mapLong, props.mapZoom, props.markers)
    return (
        <div id="map-container">
            <Map id="map" center={[props.mapLat, props.mapLong]} zoom={props.mapZoom} >

                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    props.markers
                }
            </Map>
        </div>
    );
};

export default AppMap