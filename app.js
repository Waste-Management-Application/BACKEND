const express = require('express')
const path = require('path')

const app = express()
const port= 4000

app.get('/',(req, res) => {
    res.send('hello world')
})

app. listen(port, () =>{
    console.log(`listening on ${port}`)
})