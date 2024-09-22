// Load environment variables from a .env file into process.env
require("dotenv").config();

const express = require('express');

const cors = require('cors');

// DB configuration
const pool = require('./dbconfig')

// Create an instance of an Express application
const app = express();

// allowing the server to handle requests from different origins
app.use(cors());

// parse incoming JSON requests
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});

/* ---------------------------------

API ROUTES

------------------------------------ */


// Define a route for the root URL ("/") 
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Add a new route to get all the badges from the database
app.get('/badges', async (req, res) => {
    try {

      //query the database to get all records from the table
      const list_badges = await pool.query('SELECT * FROM badges_list');

      // Send the rows (array of data) as a response and in JSON format.
      res.json(list_badges.rows);

    } catch (err) {
      res.status(500).send('Internal error:'+ err); 
    }
  });