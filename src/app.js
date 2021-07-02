const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { brotliDecompressSync } = require('zlib')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// res.render refers to a .hbs file, in templates/ directory
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dinse'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Your must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        console.log(req.query)
        forecast(latitude, longitude, location, (error, forecast_data) => {
            if (error) {
                return res.send({error})
            }
            console.log('Forecast: ', forecast_data)
            res.send(forecast_data)
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dinse'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This will the help page some day, maybe.',
        name: 'Dinse'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Dinse'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Dinse'
    })
})

// Port 3000. Listens in localhost:3000
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})