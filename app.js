const express = require('express')
const app = express()
const port = process.env.PORT || 8000




const server = app.listen(port, ()=>{
  const { port, address } = server.address()
  console.log(`Node server started on ${address}:${port}.`)
})