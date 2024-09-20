// Import the Mongoose models
const Tutorial = require("./model/Tutorial"); // Import the Tutorial model from the specified path
const Authors = require("./model/Authors");   // Import the Authors model from the specified path

// Create an object to hold all models
const models = {
  Tutorial: Tutorial, // Add the Tutorial model to the models object
  Authors: Authors   // Add the Authors model to the models object
};

// Export the models object so it can be used in other parts of the application
module.exports = models;

