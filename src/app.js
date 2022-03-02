const express = require("express")
const path = require("path")
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname,"../public"))) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gabriela Castro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gaby Castro'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Pagina de ayuda',
        name: 'Gaby Castro'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'Debes entregar una direccion'
        })
    }
    const ciudad = req.query.address
    geocode(ciudad, (error, {longitud,latitud, locacion} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
    
        forecast(latitud, longitud, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
        
            console.log(locacion)
            console.log(forecastData)
            return res.send({
                location: locacion,
                forecastData :forecastData,
                address: ciudad
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help',
        name: 'Gaby Castro',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Gaby Castro',
        msg: 'Page not found'
    })
}) 

app.listen(port, () => {
    console.log("Server is up on port " + port)
})