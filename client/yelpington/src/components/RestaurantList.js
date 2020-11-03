import { Map, Marker, TileLayer } from "react-leaflet";
import React, { useState, useEffect } from "react";
import Restaurant from './Restaurant'
import '../App.css';

// set API location in global
const hostLocation = 'http://localhost:8000/'

// set default lat, long and zoom
const mapLat = '43.6106'
const mapLong = '-72.9726'
const mapZoom = '13'

function RestaurantList(props) {

    // state vars
    const [restaurantList, setRestaurantList] = useState(null)
    const [restId, setRestId] = useState(null)
    const [mapMarkers, setMapMarkers] = useState(null)
   
    // read list of restaurant names to display
    // then call function to setup array so markers can be placed on map
    useEffect(() => {

        // Fetch the list of restaurants to display
        if (!restaurantList) {
            fetch(hostLocation + 'api')
                .then((res) => res.json())
                .then((data) => getLatLong(data))
        }
        else {
            return
        }
    })

    // Get list of restaurants and their respective lat/long
    // setup an array so we can create map markers for each
    async function getLatLong(data) {
    
        // array to hold lat/long data for map pins
        let  markerArray = []

        // set state variable with list of restaurants
        setRestaurantList(data)

        // Read each restaurant's Json file and obtain lat/long
        for (const element of data) {

            const fetchURL = hostLocation + 'restaurant-id/' + element

            // Read individual Json file and load up Marker array with each restaurant
            await fetch(fetchURL)
                .then(res => res.json())
                .then(restaurant => {
                    markerArray.push(
                        <Marker
                            url={'/restaurant-id/'+restaurant['id']}
                            onClick={() => showRestaurantDetails(restaurant['id'])}
                            position={[
                                restaurant['latitude'],
                                restaurant['longitude']
                            ]}
                    />
                )

        })
    }
    // Update State with array of Marker info
    setMapMarkers(markerArray)
}

// Helper function so that if a user clicks on map marker, we show restaurant detail page
function showRestaurantDetails(restaurantId) {
    setRestId(restaurantId)
    console.log('RestID = ', restId)
}

// If restaurant link is clicked, set restaurant ID
// This allows resturant details to be rendered when link is clicked
function showRestaurant(id, evt) {
    evt.preventDefault()
    setRestId(id)
}

// Render restaurant list as links
// And map with restaurant markers
return (
    <div>
        <div id="restaurant-list">
            {restaurantList ? (
                restaurantList.map((id) => (
                    <div id="restaurant-links">
                        <a id="restaurant-link" href={id} onClick={(evt) => showRestaurant(id, evt)}>{id.replaceAll('-', ' ')}</a>
                    </div>
                ))
            ) : (
                    <p>...Loading</p>
                )}
            {restId &&
                <Restaurant restaurantKey={restId}></Restaurant>}
        </div>

        <div id="map-container">
            <Map id="map" center={[mapLat, mapLong]} zoom={mapZoom} >

                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    mapMarkers
                }

            </Map>
        </div>
    </div>

);
};

export default RestaurantList