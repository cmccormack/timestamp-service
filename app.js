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

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://mackville.net']
    var origin = req.headers.origin || '*'
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin)
         res.setHeader('Access-Control-Allow-Origin', origin)
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    }
    next()
  })
}

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

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})


const server = app.listen(port, ()=>{
  const { port, address } = server.address()
  console.log(`Server started on ${address}:${port}.`)
})