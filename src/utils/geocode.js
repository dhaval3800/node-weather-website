const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGhhdmwzODAwIiwiYSI6ImNsZGs0Y3ZncTAydXIzb3Bocjd6enI2M3IifQ.xYpslQfnPBPfITMlk8u7zw&limit=1`;

    request({url:url, json: true}, (error,response)=>{
        if(error){
            callback('unable to connect with server',undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find geolocation',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
 
        }
    })
}


module.exports = geocode;