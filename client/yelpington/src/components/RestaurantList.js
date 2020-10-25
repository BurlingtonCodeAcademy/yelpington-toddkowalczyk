import { Map, Marker, TileLayer } from "react-leaflet";
import React, { useState, useEffect } from "react";
import Restaurant from './Restaurant'

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
    const [latLong, setLatLong] = useState(null)

    let mapPins = []

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
    // setup array so we can create map markers for each
    async function getLatLong(data) {

        // array to hold data for map pins
        let compArray = []

        let markerCollection = []
        let marker = {
            key: null,
            lat: null,
            long: null
        }

        // set state variable with 
        setRestaurantList(data)

        // Read each restaurant Json file to obtain lat/long
        for (const element of data) {

            const fetchURL = hostLocation + 'restaurant-id/' + element

            await fetch(fetchURL)
                .then(res => res.json())
                .then(restaurant => {
                    marker.key = restaurant['name']
                    marker.lat = restaurant['latitude']
                    marker.long = restaurant['longitude']
                    console.log('Marker.key is: ' + marker.key)
                    console.log('Marker.lat is: ' + marker.lat)
                    console.log('Marker.long is: ' + marker.long)

                    compArray.push(
                        <Marker
                            key={marker.key}
                            position={[
                                marker.lat,
                                marker.long
                            ]}
                        />
                    )


                })

               

        }

        console.log('compArray: ')
        console.log(compArray)
        setLatLong(compArray)
        return
    }

    // If restaurant link is clicked, set restaurant ID
    // This allows resturant details to be rendered on click of link
    function showRestaurant(id, evt) {
        evt.preventDefault()
        setRestId(id)
    }

    // Render restaurant list and a link is clicked render restaurant component as well
    // on-click handler is defined to toggle the rendering of restaurant details
    return (
        <div>
            <div>
                {restaurantList ? (
                    restaurantList.map((id) => (
                        <div>
                            <a href={id} onClick={(evt) => showRestaurant(id, evt)}>{id}</a>
                        </div>
                    ))
                ) : (
                        <p>...Loading</p>
                    )}
                {restId &&
                    <Restaurant url={restId}></Restaurant>}
            </div>

            <div>
                <Map center={[mapLat, mapLong]} zoom={mapZoom} >

                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        latLong
                    }

                </Map>



            </div>
        </div>

    );
};

export default RestaurantList