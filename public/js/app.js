console.log('Client side javascript loaded!!')
const webForm = document.querySelector('form')
const locaMessage = document.querySelector('#message-1')
const forecastMessage = document.querySelector('#message-2')

webForm.addEventListener('submit', e => {
  e.preventDefault()
  e.stopPropagation()
  locaMessage.textContent = 'Loading...'
  forecastMessage.textContent = ''
  const search = document.querySelector('input')
  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(data => {
      if (data.error) return locaMessage.textContent = data.error
        locaMessage.textContent = data.location
        forecastMessage.textContent = data.forecast

    })
  })
})