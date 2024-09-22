// Load environment variables from a .env file into process.env
require("dotenv").config();

const express = require('express');

const cors = require('cors');

// Create an instance of an Express application
const app = express();

// allowing the server to handle requests from different origins
app.use(cors());

// parse incoming JSON requests
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define a route for the root URL ("/") 
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});