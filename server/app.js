const express = require('express');
const turf = require('@turf/turf');
const app = express();
const cors = require('cors')

const data = require('./db.json');

filterByRadius = (lat, lon, r) => {
    let filteredData = [];
    data.forEach(obj => {
        const from = turf.point([lon, lat]);
        const to = turf.point([obj.longitude, obj.latitude])
        const distance = turf.distance(from, to) * 1000;
        if (distance <= r){
            filteredData.push(obj);
        }
    });
    return filteredData;
}

app.use(cors());

app.get('/coords', cors(), (req, res) => {
    const queryParam = req.query;
    const latitude = queryParam.lat;
    const longitude = queryParam.lon;
    const radius = queryParam.r;
    res.header("Content-Type",'application/json');
    filteredData = filterByRadius(latitude, longitude, radius);
    res.send(filteredData);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));