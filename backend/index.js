// Import the required libraries
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// Import models
const models = require('./models');

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS options to allow requests from a specific origin
const corsoptions = {
    origin: "http://localhost:4200" // Allow requests from this origin
};

// Apply CORS middleware with the specified options
app.use(cors(corsoptions));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Function to insert a new document into a specified model
const insert = async (req, res) => {
    // Retrieve the model based on the modelName from the request body
    const Model = models[req.body.modelName];

    // Check if the model exists
    if (!Model) {
        return res.status(400).json({ message: "Invalid model name" });
    }

    try {
        // Extract modelName and other fields from the request body
        const { modelName, Title ,Author,...fields } = req.body;

        // Optionally log the fields to verify they are correct
        console.log('Fields to save:', fields);

        const existingDocument = await Model.findOne({ Title, Author });
        console.log(existingDocument)
        if (existingDocument) {
            return res.status(409).json({ data: "A record with the same title already exists for this author." });
        }

        // Create a new document using the specified model and save it
        const documentData = { Title, Author, ...fields }; 
        const document = new Model(documentData); 
        const saved = await document.save();
        console.log("Successfully Saved");

        // Respond with a success message and the saved document
        return res.status(201).json({ message: "Records successfully added!", records: saved });

    } catch (error) {
        // Log and respond with an error message if something goes wrong
        console.error("Error Encountered During Adding Records:", error);
        return res.status(500).json({ message: "Record Insertion Failed!" });
    }
};

// Function to find a document in a specified model
const find = async (req, res) => {
    try {
        // Extract modelName and search criteria from the request body
        const { modelName, ...query } = req.body;
        const Model = models[modelName];

        if (!Model) {
            return res.status(400).json({ message: "Invalid model name!" });
        }

        console.log("This function is working!", modelName);

        let details;

        // Check if there are query parameters to filter the results
        if (Object.keys(query).length > 0) {
            // Find one document based on the query
            details = await Model.findOne(query);
        } else {
            // If no query, find all documents
            details = await Model.find();
        }

        // Respond with the found document or an error message
        if (details === null || details.length === 0) {
            console.log("No Records!")
            return res.status(404).json({ message: "Record Not Found!" });

        }
        

        console.log("Details Found! :", details);
        return res.status(200).json({ message: "Record Found!", details, modelName });

    } catch (error) {
        // Log and respond with an error message if something goes wrong
        console.log("Details Not Found! : Error :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to delete a document by ID in a specified model
const deletebyid = async (req, res) => {
    try {
        // Extract modelName and document ID from the request body
        const { modelName, _id } = req.body;
        const Model = models[modelName];

        // Delete the document by ID
        const result = await Model.deleteOne({ _id });

        // Respond with success or an error message if no document was found
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No records found to delete." });
        }

        return res.status(200).json({ message: "Record deleted successfully" });

    } catch (error) {
        // Log and respond with an error message if something goes wrong
        console.log("Course Not Found! : Error :", error);
        return res.status(500).json({ message: "Record Deletion Failed!" });
    }
};

// Function to delete all documents in a specified model
const deleteAlldetails = async (req, res) => {
    try {
        // Extract modelName from the request body
        const { modelName } = req.body;
        const Model = models[modelName];
        console.log("Deleting All the records....",Model,req.body)
        // Delete all documents in the specified model
        const output = await Model.deleteMany({});

        // Respond with success or an error message if no documents were found
        if (output.deletedCount === 0) {
            return res.status(404).json({ message: "No records found to delete." });
        }

        return res.status(200).json({ message: "Records Deleted Successfully" });

    } catch (error) {
        // Log and respond with an error message if something goes wrong
        console.log("Details Not Found! : Error :", error);
        return res.status(500).json({ message: "Records Deletion Failed!" });
    }
};

// Function to update a document by ID in a specified model
const Updatebyid = async (req, res) => {
    try {
        // Extract modelName, document ID, and update details from the request body
        const { modelName, _id, ...details } = req.body;
        const Model = models[modelName];
        console.log(req.body);
        // Update the document by ID and return the updated document
        const updated = await Model.findByIdAndUpdate(_id, { $set: details }, { new: true });

        // Respond with the updated document or an error message if no document was found
        if (updated === null) {
            return res.status(404).json({ message: "Record Not Found!" });
        }

        return res.status(200).json({ message: "Record updated!", record: updated });

    } catch (error) {
        // Log and respond with an error message if something goes wrong
        console.log("Details Not Found! : Error :", error);
        return res.status(500).json({ message: "Record Not Updated!" });
    }
};

// Route to test server startup
app.get("/", (req, res) => {
    res.send("Hi, Node.js has started!!");
});

// Route to insert a new document
app.post("/api/insert", async (req, res) => {
    try {
        await insert(req, res);
    } catch (error) {
        console.error("Internal server Error :", error);
        return res.status(500).json({ message: "Internal server Error" });
    }
});

// Route to find a document
app.post("/api/find", async (req, res) => {
    try {
        await find(req, res);
    } catch (error) {
        console.error("Internal Server Error :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to update a document by ID
app.post("/api/update", async (req, res) => {
    try {
        await Updatebyid(req, res);
    } catch (error) {
        console.error("Internal Server Error :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to delete a document by ID
app.post("/api/delete", async (req, res) => {
    try {
        await deletebyid(req, res);
    } catch (error) {
        console.error("Internal Server Error :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to delete all documents in a model
app.post("/api/deleteall", async (req, res) => {
    try {
        await deleteAlldetails(req, res);
    } catch (error) {
        console.error("Internal Server Error :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Define the port and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Your Server is Running on port:", port);
});
