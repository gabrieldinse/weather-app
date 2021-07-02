const request = require('postman-request')

const forecast = (latitude, longitude, location, callback) =>
{
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude
        + '&lon=' + longitude + '&appid=6ae6c6e365c40cf31749bc1d104bc379&units=metric'
    request({url: url, json: true}, (error, {body}) =>
    {
        if (error)
        {
            callback('Unable to connect to service.', null)
        }
        else if (body.error)
        {
            callback('Unable to find specified location.', null)
        }
        else
        {
            callback(null, {
                forecast: 'Temperature: ' + body.current.temp + '°C (feels like '
                + body.current.temp + '°C), Humidity: ' + body.current.humidity + '%',
                location: location
            })
        }
    })
}

module.exports = forecast