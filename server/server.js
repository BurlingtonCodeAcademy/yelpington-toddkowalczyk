const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())

// Obtain port that server will run on from env var or set to 8000 if var not set
const port = process.env.PORT || 8000

// Define ruleset for Get Request
app.get("/", (req, res) => {
    res.status(200).send("this is the restaurant API")
})

// Send back list of restaurants
app.get("/api/", (req, res) => {
    res.status(200).sendFile(path.resolve(`api/restaurant-list.json`))
})

// Send back file based on restaurant that is selected
app.get("/restaurant-id/:restaurantKey", (req, res) => {
    let restaurantKey = req.params.restaurantKey
    res.status(200).sendFile(path.resolve(`api/${restaurantKey}.json`))
})

// Start server and console log out message that it is running
app.listen(port, () => {
    console.log('Server is running! ' + port)
})