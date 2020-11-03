import React, { useEffect, useState } from "react";
import RestaurantMap from './RestaurantMap'

function Restaurant(props) {
    const [restaurantId, setRestaurantId] = useState(null)
    const [restaurantName, setRestaurantName] = useState(null);
    const [restaurantAddress, setRestaurantAddress] = useState(null);
    const [restaurantPhone, setRestaurantPhone] = useState(null);
    const [restaurantHours, setRestaurantHours] = useState(null);
    const [restaurantNotes, setRestaurantNotes] = useState([]);
    const [priorId, setPriorId] = useState(null)

    // Retrieve the Restaurant based on the key selected
    useEffect(() => {
        const fetchURL = 'http://localhost:8000/restaurant-id/' + props.restaurantKey

        // Fetch Details about restaurant that was selected
        if (props.restaurantKey !== priorId) {
            fetch(fetchURL)
                .then(res => res.json())
                .then(restaurant => {
                    setRestaurantId(restaurant['id'])
                    setRestaurantName(restaurant['name'])
                    setRestaurantAddress(restaurant['address'])
                    setRestaurantPhone(restaurant['phone number'])
                    setRestaurantHours(restaurant['hours'])
                    setRestaurantNotes(restaurant['notes'])
                })
            setPriorId(props.restaurantKey)
        }
    }
    )

    // Return Restaurant Details so it can be rendered in App
    return (
        <div>
            <div id="restaurant-container">
                <h1>{restaurantName}</h1>
                <p>{restaurantAddress}</p>
                <p>{restaurantPhone}</p>
                <p>{restaurantHours}</p>
                <p>{restaurantNotes}</p>
            </div>
            <div id="restaurant-map">
                The map goes here
            </div>
        </div>
    );
}

export default Restaurant