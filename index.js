const express = require('express')
const app = express() 
var cors = require('cors')


// app.use(cors())
app.use(cors())
app.use(express.json())


// console.log(authRoute)

app.get('/',(req,res)=>{
  res.json({
    message :  "Hello from backend"
  })
})


app.use('/',require('./fetch.js'))

app.listen(8000,()=>{
  console.log('listening')
})