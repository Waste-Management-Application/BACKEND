const express = require('express')
const morgan = require("morgan");
const app = express()
const path = require('path')

const UsersRouter = require("./routes/routes");
const DustbinRouter = require("./controllers/dustbinController")
const taskRouter = require("./controllers/taskController")
const vehicleRouter = require("./controllers/vehicleController")
const feedbackRouter = require("./controllers/feedbackController")


//const cors = require('cors')



app.use(express.json())
app.use(morgan("dev"));


app.use("/api/BinBuddy",[ UsersRouter, DustbinRouter,taskRouter,vehicleRouter,feedbackRouter]);
// app.
// app.get('/',(req, res) => {
//     res.render('login ')
// })

// app.get('/signup',(req, res) => {
//     res.render('signup')
// })

// app.post("/signup",async (req,res)=>{
    
//     const data={
//         name:req.body.name,
//         password:req.body.password
//     }

// })

module.exports = app;

