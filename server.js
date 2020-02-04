// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log('Server is running!');
  console.log(`running on localhost: ${port}`);
}

// GET ROUTE
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
}

// POST ROUTE
app.post('/addData', addData);

function addData(req, res) {
  // console.log(request.body)
  let data = req.body;

  // Create new entry for JS Object Endpoint
  projectData.temp = data.temp;
  projectData.date = data.date;
  projectData.feelings = data.feelings;

  // Send response to Endpoint
  console.log(projectData);
  res.send(projectData);
}
