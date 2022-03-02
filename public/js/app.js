const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

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
            messageTwo.textContent = 
                'La temperatura actual es '+ data.forecastData.temperatura +
                ' grados, que se sienten como ' + data.forecastData.sensacion +
                ' grados, el dia estará ' + data.forecastData.descripcion +
                ' y la humedad en el ambiente es %' + data.forecastData.humedad
            console.log(data.forecastData)
        }
    })
})
})