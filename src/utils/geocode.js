const request = require('request')


const getGeocode = (address, callback) => {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h1dSIsImEiOiJjanZsemkwZ2ExN3dtNDd0M2FqdXludjMwIn0.SF7KZwjlMWE5Bx8tVNz8UQ&limit=1`
  
  request({url: locationUrl, json: true}, (err, {body}) => {
    if(err || !body.features.length){
      callback(err ? 'Unconnected' : 'no matching datas', undefined)
    } else {
      const [lon, lat] = body.features[0].center
      callback(undefined, {lon: lon, lat: lat, location: body.features[0].place_name})
    }
  })
}

const geocode = (address, callback) => {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h1dSIsImEiOiJjanZsemkwZ2ExN3dtNDd0M2FqdXludjMwIn0.SF7KZwjlMWE5Bx8tVNz8UQ&limit=1`
  
  request({url: locationUrl, json: true}, (err, { body }) => {
    if(err || !body.features.length){
      callback(err ? 'Unconnected' : 'Unable To find, Try to use another address', undefined)
    } else {
      const [lon, lat] = body.features[0].center
      callback(undefined, {lon, lat, location: body.features[0].place_name})
    }
  })
}

module.exports = {
  getGeocode: getGeocode,
  geocode: geocode
}