import React, { useEffect, useState } from "react";
import AppMap from './RestaurantMap'
import { Map, Marker, TileLayer } from "react-leaflet";
import { getDefaultNormalizer } from "@testing-library/react";

function Restaurant(props) {

    // State variables for restaurant details
    const [restaurantId, setRestaurantId] = useState(null)
    const [restaurantName, setRestaurantName] = useState(null);
    const [restaurantAddress, setRestaurantAddress] = useState(null);
    const [restaurantPhone, setRestaurantPhone] = useState(null);
    const [restaurantHours, setRestaurantHours] = useState(null);
    const [restaurantNotes, setRestaurantNotes] = useState([]);
    const [restaurantLatitude, setRestaurantLatitude] = useState(null)
    const [restaurantLongitude, setRestaurantLongitude] = useState(null)
    const [restaurantMarker, setRestaurantMarker] = useState(null)
    const [priorId, setPriorId] = useState(null)

    // Retrieve restaurant details for a specific restaurant
    useEffect(() => {

        const fetchURL = 'http://localhost:8000/restaurant-id/' + props.restaurantKey

        if (restaurantId === null) {
            fetch(fetchURL)
                .then(res => res.json())
                .then(restaurant => {
                    console.log('in fetch', restaurant['name'])
                    setRestaurantId(restaurant['id'])
                    setRestaurantName(restaurant['name'])
                    setRestaurantAddress(restaurant['address'])
                    setRestaurantPhone(restaurant['phone number'])
                    setRestaurantHours(restaurant['hours'])
                    setRestaurantNotes(restaurant['notes'])
                    setRestaurantLatitude(restaurant['latitude'])
                    setRestaurantLongitude(restaurant['longitude'])
                })
        }
    }
    )

    // Return restaurant details so it can be rendered in App
    return (

        //
        <div id="restaurant-detail">
            <div id="restaurant-info">
                <h1>{restaurantName}</h1>
                <p>{restaurantAddress}</p>
                <p>{restaurantPhone}</p>
                <p>{restaurantHours}</p>
                <p>{restaurantNotes}</p>
            </div>

            {restaurantLatitude !== null ?
                <Map id="app-map" center={[restaurantLatitude, restaurantLongitude]} zoom={13} >

                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker key={123124} position={[restaurantLatitude, restaurantLongitude]}></Marker>

                </Map>
                : null
            }
        </div>
    );
}

export default Restaurant