// Import the Mongoose module to interact with MongoDB
const mongoose = require("../db.config");

// Define the schema for the 'Authors' collection
const authordetail = new mongoose.Schema(
    {
        // Field to store the author's name, required and of type String
        Authorname: { type: String, required: true },

        // Field to store the author's email address, required and of type String
        Email: { type: String, required: true },
    },
    { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Create a model named 'Authors' based on the schema defined above
const Authors = mongoose.model("Authors", authordetail);

// Export the 'Authors' model to be used in other parts of the application
module.exports = Authors;
