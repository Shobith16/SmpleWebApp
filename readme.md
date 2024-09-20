Express Application with Mongoose Operations

const express = require("express");
// Import the Express framework

// const cors = require("cors");
// Import the CORS middleware if needed for handling cross-origin requests

const app = express();
// Initialize an Express application

// const db = require("./db.config.js");
// Import your database configuration (uncomment and set up if needed)

// Import the Tutorial model, which represents the schema for your data
const Tutorial = require("./model/Tutorial");

// Function to add a new record to the database
const course = async () => {
try {
// Create a new instance of the Tutorial model with initial data
const course = new Tutorial({
Title: "Nodejs Tutorials", // Title of the course
Desc: "We Good For Beginners!", // Description of the course
Author: "Dr.Amogh Kumar Shetty", // Author of the course
Cost: 1 // Cost of the course
});

    // Save the new course to the database
    const saved = await course.save();
    console.log("Successfully Saved"); // Log a success message

} catch (error) {
// Catch and log any errors that occur during saving
console.error("Error Encountered During adding Course :", error);
}
};

// Function to find a course by author's name
const find = async () => {
try {
const name = "Dr.Amogh Kumar Shetty"; // Name to search for
// Find a course in the database where the author matches the given name
const course = await Tutorial.findOne({ Author: name });

    if (!course) {
      // If no course is found, log this message
      console.log("The Course is not present!");
    } else {
      // If a course is found, log the course details
      console.log("Course Found! :", course);
    }

} catch (error) {
// Catch and log any errors that occur during the search
console.log("Course Not Found! : Error :", error);
}
};

// Function to delete a course by author's name
const deletebyName = async () => {
try {
const name = "Dr.Amogh Kumar Shetty"; // Name of the author to search for
// Delete the first course found where the author matches the given name
const course = await Tutorial.deleteOne({ Author: name });

    if (!course.deletedCount) {
      // If no course is deleted, log this message
      console.log("The Course is not present!");
    } else {
      // If a course is deleted, log the deletion result
      console.log("Course Deleted! :", course);
    }

} catch (error) {
// Catch and log any errors that occur during deletion
console.log("Error occurred during deletion: ", error);
}
};

// Function to delete all courses from the database
const deleteAll = async () => {
try {
// Delete all courses in the database
const result = await Tutorial.deleteMany();

    if (result.deletedCount === 0) {
      // If no courses are deleted, log this message
      console.log("No Courses were deleted.");
    } else {
      // If courses are deleted, log the deletion result
      console.log("All Courses Deleted! :", result);
    }

} catch (error) {
// Catch and log any errors that occur during deletion
console.log("Error occurred during deletion: ", error);
}
};

// Function to update a course by its ID
const Updatebyid = async () => {
try {
const id = "66b9f8a2099932375a84b612"; // ID of the course to update
// Find a course by ID and update its Author field
const course = await Tutorial.findByIdAndUpdate(
id, // ID of the document to update
{ $set: { Author: "Mr. Shobith" } }, // Update object
{ new: true } // Option to return the updated document
);

    if (!course) {
      // If no course is found, log this message
      console.log("The Course is not present!");
    } else {
      // If a course is updated, log the updated course details
      console.log("Course Updated! :", course);
    }

} catch (error) {
// Catch and log any errors that occur during the update
console.log("Error occurred during update: ", error);
}
};

// Route handler for the root path ("/")
app.get("/", (req, res) => {
res.send("Hi, Node.js has Started!!"); // Send a response to the client
Updatebyid().catch(err => {
// Call the Updatebyid function and handle any potential errors
console.error("Error in Updatebyid function: ", err);
});
});

// Start the server and listen on a specified port
const port = process.env.PORT || 8000; // Use the environment port or default to 8000
app.listen(port, () => {
console.log("Your Server is Running on port :", port); // Log a message when the server starts
});

Defining the Mongoose Model as "Tutorial"

const mongoose = require('../db.config'); // Import the Mongoose library, ensure the path to your database configuration is correct

// Define the schema for the Tutorial collection
const tutorialSchema = new mongoose.Schema({
Title: {
type: String, // Define the type of this field as a string
required: true // This field is required
},
Desc: {
type: String, // Define the type of this field as a string
required: true // This field is required
},
Author: {
type: String, // Define the type of this field as a string
required: true // This field is required
},
Cost: {
type: Number, // Define the type of this field as a number
required: true // This field is required
}
}, { timestamps: true }); // Add timestamps (createdAt and updatedAt fields) to the schema

// Create a Mongoose model based on the tutorialSchema
const Tutorial = mongoose.model('Tutorial', tutorialSchema);

// Export the Tutorial model so it can be used in other parts of the application
module.exports = Tutorial;

Connecting to MongoDB with Mongoose

const mongoose = require("mongoose");
// Import the Mongoose library to interact with MongoDB

require('dotenv').config();
// Load environment variables from a .env file into process.env

// Connect to the MongoDB database using Mongoose
mongoose.connect(process.env.url, { // Use the database URL from environment variables
useNewUrlParser: true, // Use the new URL parser to handle MongoDB connection strings
useUnifiedTopology: true // Use the new server discovery and monitoring engine
})
.then(() => console.log('MongoDB connected')) // Log a success message when connected
.catch(err => console.error('MongoDB connection error:', err)); // Log an error message if the connection fails

module.exports = mongoose; // Export the Mongoose instance for use in other parts of the application
