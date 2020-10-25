import React, { useEffect, useState } from "react";

function Restaurant(props) {
    const [restaurantName, setRestaurantName] = useState(null);
    const [restaurantAddress, setRestaurantAddress] = useState(null);
    const [restaurantPhone, setRestaurantPhone] = useState(null);
    const [restaurantHours, setRestaurantHours] = useState(null);

    // Retrieve the Restaurant based on the key selected
    useEffect(() => {
        const fetchURL = 'http://localhost:8000/restaurant-id/' + props.url
        fetch(fetchURL)
            .then(res => res.json())
            .then(restaurant => {
                setRestaurantName(restaurant['name'])
                setRestaurantAddress(restaurant['address'])
                setRestaurantPhone(restaurant['phone number'])
                setRestaurantHours(restaurant['hours'])
            })
    }
    )

    // Return Restaurant Details so they render in App
    return (
        <div id="restaurant">
            <h1>{restaurantName}</h1>
            <p>{restaurantAddress}</p>
            <p>{restaurantPhone}</p>
            <p>{restaurantHours}</p>
        </div>
    );
}

export default Restaurant