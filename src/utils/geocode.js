const request = require("request")

const geocode = (address, callback) => {
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWVsYW1pdG8iLCJhIjoiY2t5c3ZnZmdqMDAzcDJ1cGdpdmNkaW40eCJ9.mhmWY0iUMbKuBsmJkqcK8g&limit=1"

    request({url , json: true}, (error, { body }) => {
        if (error){
            callback("No se puede conectar al servicio", undefined)
        }else if(body.features.length === 0){
            callback("No se encuentra la direccion",undefined)
        }else{
            const {center, place_name} = body.features[0]
            callback(undefined, {
                latitud: center[1],
                longitud: center[0],
                locacion: place_name
            })
        }
    })
}

module.exports = geocode