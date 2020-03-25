const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 9898
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

// Define path to express config
const publicDirectoryPath = path.join(__dirname, '../public')
// const aboutHTMLPath = path.join(__dirname, '../public/about.html')
// const helpHTMLPath = path.join(__dirname, '../public/help.html')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static page, app.use is customize server
app.use(express.static(publicDirectoryPath))  // 使用靜態頁面
// app.use('/help', express.static(helpHTMLPath))
// app.use('/about', express.static(aboutHTMLPath))

// use handlerbar to setting route
app.set('view engine', 'hbs') // app.set 第一個參數是有固定 value 的，請參照 express 官網
app.set('views', viewsPath) // setup views location
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    tab_title: 'Weather',
    title: 'Weather',
    name: 'Big D Shuu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    tab_title: 'About',
    title: 'About me?',
    name: 'Big D Shuu'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    tab_title: 'Help',
    title: 'Need Some Help?',
    name: 'Big D Shuu'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({ erorr: "you must provide the address!" })

  geocode(req.query.address, (error, { lat = 0, lon = 0, location = "No location" } = {}) => {
    if (error) return res.send({ error })

    forecast(lat, lon, (error, forecastData) => {
      if (error) return console.log(error)
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
      console.log('data_loca:', location)
      console.log('Data:', forecastData)
    })
  })
  // getGeocode(address, getWeather)
})

app.get('/help/*', (req, res) => {
  res.render('404pages', {
    tab_title: '404 - help path',
    title: '404 Not Found',
    errorMessage: 'Help article not found',
    name: 'Shuu'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) return res.send({ error: 'you must provide search condition' })


  res.send(req.query.search ? {
    products: []
  } : {
      error: "you must provide search condition!"
    })
})

app.get('*', (req, res) => {
  res.render('404pages', {
    tab_title: '404',
    title: '404 Not Found',
    errorMessage: 'Page not found',
    name: 'Shuu'
  })
})

app.listen(port, () => {
  console.log("Server is up port: " + port)
})