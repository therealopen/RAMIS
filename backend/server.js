const express = require('express');
const server = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var routes = require('./routes/routes');
const cors = require('cors');

const getDataControllerFn = require('./src/user/dataController');
const getUsersDataControllerFn = require('./src/user/dataUsersController');


// Define the route to retrieve data
server.get('localhost:8089/api/student', getDataControllerFn);
server.get('localhost:8089/api/users', getUsersDataControllerFn);

// Other middleware and routes...


server.use(cors(
    {
      origin: "http://localhost:4200",
      
    }
   
  ));
  //server.use(cors());
  



//Assuming you have imported Mongoose library

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/college');
      console.log('Connected to MongoDB Successfully');
      console.log('Server running Successfully');
      // Additional logic after successful connection
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      // Handle connection error
    }
  }
  
 
  // Call the connectToDatabase function
  connectToDatabase(); 

server.listen(8089,function port(error)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log("Port  Connected! 8089")
    }
});

server.use(cors());
server.use(express.json());
server.use(routes);