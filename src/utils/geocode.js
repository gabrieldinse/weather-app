const request = require('postman-request')

const geocode = (address, callback) =>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ2FicmllbGRpbnNlIiwiYSI6ImNrcWJucjR2MzAwajcyd252dXNnOTlxcTkifQ.Gz3wp3L947GHxRx2E8q-pw&limit=1" 
    // body is destructuring the response variable. We are getting response.body
    // using {body} syntax
    request({url, json: true}, (error, {body}) =>
    {
        console.log(body)
        if (error)
        {
            callback('Unable to connect to service.', undefined)
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find specified location.', undefined)
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode