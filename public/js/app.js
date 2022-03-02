console.log("wenas wenaaaaaas")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)
        }else{
            messageOne.textContent = data.location
            console.log(data.location)
            messageTwo.textContent = 'Temperatura: '+data.forecastData.temperatura 
                + '\nSensacion: ' + data.forecastData.sensacion
                + '\n Descripcion: ' + data.forecastData.descripcion 
            console.log(data.forecastData)
        }
    })
})
})