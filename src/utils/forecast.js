const request = require('request')

const forecast = (lati, long, callback) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect geolocation service',undefined)
        }else if(response.body.error){
            callback('Unable to find geolocation',undefined)
        }else{
            callback(undefined,`It is currently ${response.body.current_weather.temperature} degrees out.`)
        }
    })
}


module.exports = forecast;

