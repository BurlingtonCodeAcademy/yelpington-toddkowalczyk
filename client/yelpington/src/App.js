import React from "react";
import './App.css';
import RestaurantMap from './components/RestaurantMap'
import RestaurantList from './components/RestaurantList'

// Makes adding CSS needed for leaflet much easier
import { Helmet } from 'react-helmet'

function App() {

  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Helmet>

      <div>
        <RestaurantList></RestaurantList>
      </div>
  
      <div id='city-map'>
        <RestaurantMap></RestaurantMap>
      </div>

    </div>
  );
}

export default App;
