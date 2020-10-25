import React, { useState, useEffect } from "react";
import Restaurant from './Restaurant'

// set API location in global
const hostLocation = 'http://localhost:8000/'

function RestaurantList(props) {

    // state vars
    const [restaurantList, setRestaurantList] = useState(null)
    const [restId, setRestId] = useState(null)

    // read list of restaurant names to display
    useEffect(() => {

        console.log(hostLocation)
        // Fetch the list of restaurants to display
        if (!restaurantList) {
            fetch(hostLocation + 'api')
                .then((res) => res.json())
                .then((data) => {
                    setRestaurantList(data)
                });
        }
        else {
            console.log('not fetching')
            return
        }
    })

    // If restaurant link is clicked, set restaurant ID
    // This allows resturant details to be rendered on click of link
    function showRestaurant(id, evt) {
        evt.preventDefault()
        setRestId(id)
    }

    // Helper function that obtains the lat and long for each restaurant.
    function getGISCoords(restaurantKey) {
        for (const element of restaurantList) {
            const fetchURL = hostLocation + 'restaurant-id/' + restaurantKey
            fetch(fetchURL)
                .then(res => res.json())
                .then(restaurant => {
                    console.log(restaurant['lattitude'] + restaurant['longitude'])
                })
        }
    }

// Render restaurant list and a link is clicked render restaurant component as well
// includes an on-click handler to toggle the rendering of restaurant details
return (
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

);
};

export default RestaurantList