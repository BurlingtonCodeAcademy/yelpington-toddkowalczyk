import React, { useState } from "react";
import './App.css';
import RestaurantList from './components/RestaurantList'
import Restaurant from './components/Restaurant'

// Makes adding CSS needed for leaflet much easier
import { Helmet } from 'react-helmet'

function App() {

  const [restaurantId, setRestaurantId] = useState(null)

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
          <RestaurantList setRestaurantId={setRestaurantId}></RestaurantList>
          :
          <Restaurant restaurantKey={restaurantId}></Restaurant>}
      </div>

    </div>
  );
}

export default App;
