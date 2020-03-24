const request = require('request')

const getWeather = (err, data) => {
  if (err) {
    return console.log("its error: ", err)
  }

  const { lat, lon, location } = data
  const url = `https://api.darksky.net/forecast/6f5af419b407f63d32603c92ec138f98/${lat},${lon}?units=si`

  request({ url, json: true }, (err, {body}) => {
    if (err || body.error) {
      console.log(err ? 'Unconnected' : 'Didnt find location')
    } else {
      const { temperature, precipProbability } = body.currently
      console.log(`${location} currently ${temperature} degrees out. There is a ${precipProbability * 100}% chance of rain.`)
    }
  })
}

const forecast = (lat, lon, callback) => {
  const url = `https://api.darksky.net/forecast/6f5af419b407f63d32603c92ec138f98/${lat},${lon}?units=si`

  request({ url, json: true }, (err, res) => {
    if (err || res.body.error) {
      callback(err ? 'Unconnected' : 'Didnt find location', undefined)
    } else {
      const { temperature, precipProbability } = res.body.currently
      callback(undefined, `Currently ${temperature} degrees out. There is a ${precipProbability*100}% chance of rain.`)
      // console.log(`${location} currently ${temperature} degrees out. There is a ${precipProbability*100}% chance of rain.`)  
    }
  })

}



module.exports = {
  getWeather,
  forecast
}