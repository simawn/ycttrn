const express = require('express');
const turf = require('@turf/turf');
const app = express();

const data = require('./db.json');

filterByRadius = (lat, lon, r) => {
    data.forEach(element => {
        const from = turf.point([lat, lon]);
        const to = turf.point([])
        console.log(element.latitude);
    });
}

app.get('/coords', (req, res) => {
    const queryParam = req.query;
    const latitude = queryParam.lat;
    const longitude = queryParam.lon;
    const radius = queryParam.r;
    res.header("Content-Type",'application/json');
    //filterByRadius(latitude, longitude, radius);
    res.send(JSON.stringify(data));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));