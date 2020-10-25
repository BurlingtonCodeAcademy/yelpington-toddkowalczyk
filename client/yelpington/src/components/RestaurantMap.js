import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


function RestaurantMap(props) {

    // set default lat, long and zoom
    const [lat, setLat] = useState('43.6106')
    const [long, setLong] = useState('-72.9726')
    const [zoom, setZoom] = useState('13')

    return (
        <Map center={[lat, long]} zoom={zoom} >

            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </Map>

    );
}

export default RestaurantMap