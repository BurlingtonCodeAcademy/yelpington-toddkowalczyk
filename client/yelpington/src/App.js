import React, { useState, useEffect } from "react";
import './App.css';
import RestaurantList from './components/RestaurantList'
import Restaurant from './components/Restaurant'

// Makes adding CSS needed for leaflet much easier
import { Helmet } from 'react-helmet'

function App() {

  const [restaurantId, setRestaurantId] = useState(null)
  const [markers, setMarkers] = useState()

  useEffect(() => {
    // check URL for # to see if user entered a URL with a # <restaurant> where <restaurant>
    // is the name of a specific restaurant json file.  If they did, show the restaurant page.
    let url = window.location.href
    let hashLocation = url.lastIndexOf('#')
    let restaurantPage = url.substring(hashLocation + 1)

    // If URL has #restaurant then set the ID to value after # in URL
    if (hashLocation !== -1 && restaurantId === null) {
      setRestaurantId(restaurantPage)
    }
  }
  )

  // Render the App
  return (
    <div id="main-wrapper">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Helmet>
      <h1 id="title">Yelpington</h1>
      <div id="restaurant-list">
        {restaurantId === null ?
          <RestaurantList setRestaurantId={setRestaurantId} setMarkers={setMarkers}></RestaurantList>
          :
          <Restaurant restaurantKey={restaurantId} markers={markers}></Restaurant>}
      </div>

    </div>
  );
}

export default App;
