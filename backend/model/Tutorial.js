
// Import the Mongoose module. Ensure that the path to your Mongoose configuration is correct.
const mongoose = require('../db.config');

// Define the schema for the 'Tutorial' collection
const tutorialSchema = new mongoose.Schema({
  // Field to store the title of the tutorial, required and of type String
  Title: { type: String, required: true },
  
  // Field to store the description of the tutorial, required and of type String
  Desc: { type: String, required: true },
  
  // Field to store the author's name or identifier, required and of type String
  Author: { type: String, required: true },
  
  // Field to store the cost of the tutorial, required and of type Number
  Cost: { type: Number, required: true }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create a model named 'Tutorial' based on the schema defined above
const Tutorial = mongoose.model('Tutorial', tutorialSchema);

// Export the 'Tutorial' model to be used in other parts of the application
module.exports = Tutorial;


