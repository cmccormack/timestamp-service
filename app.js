const express = require('express')
const engines = require('consolidate')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

app.engine('html', engines.nunjucks)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('examples', 
  {
    title:'Timestamp Microservice',
    url: 'https://timestampserver.glitch.me/'
  })
})

app.get('/:date', (req, res) => {
  let output = {unix: null, natural: null}

  let dateparam = req.params.date
  if (Number(dateparam)) {
    dateparam = Number(dateparam) * 1000
  }
  const date = new Date(dateparam)
  if (date.toDateString() !== "Invalid Date") {
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getUTCDate()
    output.unix = date.getTime() / 1000
    output.natural = `${month} ${day}, ${year}`
  }
  res.type('json')
  res.send(JSON.stringify(output))
  
})


const server = app.listen(port, ()=>{
  const { port, address } = server.address()
  console.log(`Server started on ${address}:${port}.`)
})