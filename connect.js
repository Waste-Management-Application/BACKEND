const dotenv = require('dotenv');


const mongoose = require('mongoose');



const app = require("./app");




dotenv.config({path:"./config.env"});

// const connectionString = 'mongodb+srv://danielquavohunchojnr:MrQpJB7H8Yu0LNjn@binbuddy.vzmhest.mongodb.net/';
 
const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
  
})
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    // Your further code goes here, e.g., defining models and routes.
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });


const port = process.env.PORT;

const connect = app.listen(port, () =>{
	console.log(`listening on ${port}`)
})




// process.on('unhandledRejection', err=>{
// 	console.log(err.name, err.message)
// 	server.close(()=>{
// 		process.exit(1)
// 	})	
// })

