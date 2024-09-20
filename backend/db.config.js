// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Load environment variables from a .env file
require('dotenv').config();

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.url, {
    useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
})
    .then(() => console.log('MongoDB connected')) // Log a success message when connected
    .catch(err => console.error('MongoDB connection error:', err)); // Log an error message if connection fails

// Export the Mongoose instance for use in other parts of the application
module.exports = mongoose;
