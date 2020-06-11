# Web-Server Highlights

## HBS

Model engine for Node.js.

### Project Directory Structure

- Project
	- node_modules
	- src
	- public
		- js
		- css
		- images
	- templates
		- views
		- partials

HBS template will be put in `views` and `partials`

#### Views

It means whole view in html.

#### Partials

It means a part of view in html.


### How to use

#### Using in Express

##### import

```javascript
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
```

##### Define path to express config

```javascript
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
```

##### Setup static page

```javascript
app.use(express.static(publicDirectoryPath))
```

**app.use** is about customizing our server

##### Using handlerbar to setting route

```javascript
app.set('view engine', 'hbs')
app.set('views', viewsPath) // setup views location
hbs.registerPartials(partialsPath)
```

**Notice!!** app.set 第一個參數是有固定 value 的，請參照 express 官網

##### Setting route

```javascript
app.get('', (req, res) => {
  res.render('index', {
    tab_title: 'Weather',
    title: 'Weather',
    name: 'Big D Shuu'
  })
})
```

##### Using params

```html
  <title>{{tab_title}}</title>
```

##### Using partials

```html
<head>
  {{>head_content}}
</head>
```

## Fetch Data

```javascript
 fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(data => {
      if (data.error) return locaMessage.textContent = data.error
        locaMessage.textContent = data.location
        forecastMessage.textContent = data.forecast
    })
  })
```



