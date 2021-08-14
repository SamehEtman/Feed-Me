const NodeGeocoder = require('node-geocoder');


const options = {
    provider: process.env.GEOCODE_PROVIDER,
    httpAdapter : 'https',
    apiKey: process.env.GEOAPI, 
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports= geocoder;