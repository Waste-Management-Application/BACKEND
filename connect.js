const dotenv = require('dotenv');


const mongoose = require('mongoose');



const app = require("./app");




dotenv.config({path:"./config.env"});

mongoose
 	.connect(process.env.DB, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false

	})
	.then(() =>console.log("Database connection successful!"));



const port = 4000;

const connect = app.listen(port, () =>{
	console.log(`listening on ${port}`)
})




// process.on('unhandledRejection', err=>{
// 	console.log(err.name, err.message)
// 	server.close(()=>{
// 		process.exit(1)
// 	})	
// })

