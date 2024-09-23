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

app.delete('/badges/:id', async (req, res) => {
  try {

    // Extract id parameter from the request object
    const { id } = req.params; 
    const badge = await pool.query(
      `delete from badges_list where id =$1`, [id]);
    res.json(badge.rows[0]);
  }catch (err) {
    res.status(500).send('Internal error:'+ err); 
  }
});

app.put('/badges/:id', async (req, res) => {
  try {

    // Extract id parameter from the request object
      const { id } = req.params; 

      // Extract the new title, and description submitted from the form.
      const { title, description} = req.body; 
    const badge = await pool.query(
      `update badges_list set title=$2, description=$3 where id =$1`, [id, title, description]);
    res.json(badge.rows[0]);
  }catch (err) {
  res.status(500).send('Internal error:'+ err); 
  }
});

app.post('/badges', async (req, res) => {
  try {
    const { title, description } = req.body;  

    const newBadge = await pool.query(
      `INSERT INTO badges_list (title, description) VALUES($1, $2) RETURNING *`,
      [title, description]
    );
    res.json(newBadge.rows[0]);

  } catch (err) {
  res.status(500).send('Internal error:'+ err); 
  }
});