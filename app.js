const express = require('express')
const morgan = require("morgan");


const app = express();

const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/apperror')
//const path = require('path')

const UsersRouter = require("./routes/routes");
const DustbinRouter = require("./controllers/dustbinController")
const taskRouter = require("./controllers/taskController")
const vehicleRouter = require("./controllers/vehicleController")
const feedbackRouter = require("./controllers/feedbackController")
const adminRoutes = require('./routes/adminRoutes')


const cors = require('cors')


//Middlawares
app.use(express.json())
app.use(morgan("dev"));
app.use(cors({origin: '*'}))

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});



// specified routes for admin and normal Users
app.use("/api/BinBuddy",[ UsersRouter, DustbinRouter,taskRouter,vehicleRouter,feedbackRouter]);
app.use("/api/BinBuddyAdmin", [adminRoutes]);

// handling unhandled routes
app.all("*", (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

//handling global errors

app.use(globalErrorHandler)




module.exports = app;










