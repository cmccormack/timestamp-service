const express = require('express')
const app = express()
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.get('/:date', (req, res) => {
  res.send(req.params.date)
})


const server = app.listen(port, ()=>{
  const { port, address } = server.address()
  console.log(`Server started on ${address}:${port}.`)
})