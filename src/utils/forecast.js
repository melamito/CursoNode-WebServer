const request= require("request")

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=16b8e2c62d49934a8eb1936f84bde65d&query='+lat+','+long+'&units=m'

    request({ url, json : true }, (error, { body }) => {
        if (error){
            callback("No se pudo conectar", undefined)
        }else if(body.error){
            callback("No se encuentra la ubicacion",undefined)
        }else{
            const {temperature, feelslike, weather_descriptions}= body.current
            callback(undefined, {
                temperatura : temperature,
                sensacion : feelslike,
                descripcion: weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast