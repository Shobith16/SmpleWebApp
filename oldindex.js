const express = require("express");
const cors=require("cors");
const app=express();
const mongoose = require("mongoose");
// const db=require("./db.config.js");

const models = require('./models');
app.use(express.json());

var corsoptions = {
    origin:"http://localhost:3000/"
}

app.use(cors(corsoptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const insert = async (res, req) => {
 
  const Model = models[req.body.modelName];

  if (!Model) {
    return res.status(400).json({ message: "Invalid model name" });
  }

  

  try {
    // Create and save multiple documents
   
    const { modelName, ...fields } = req.body;

    // Optionally, you might want to log the fields to verify they are correct
    console.log('Fields to save:', fields);
   
    const course= new Model( fields);
    const saved=await course.save();
    console.log("Successfully Saved");
    return res.status(201).json({ message: "Records successfully added!", records: saved });

  } catch (error) {
    console.error("Error Encountered During Adding Records:", error);
    return res.status(500).json({ message: "Record Insertion Failed!" });
  }
};

  

const find = async (req,res) =>{
  try {
    const {modelName,...name}=req.body;
    const Model =models[modelName]
    // console.log(req.body.Authorname)
  
    const details = await (Model).findOne({  ...name });
    // console.log("res:",details)
    if(details===null){
      res.status(401).json({ message: "Record Not Found!" });
      return

    }
    console.log("Details Found! :",details)
    return res.status(201).json({ message: "Record Found!"  });
  } catch (error) {
    console.log("Details Not Found! : Error :",error)
    return res.status(500).json({ message: "Record Not Found!" });
  }
};

const deletebyid = async (req,res) =>{
  try {
    const {modelName,_id}=req.body;
    const Model= models[modelName]
    const result = await Model.deleteOne({ _id});
    console.log(result)
    if(result.deletedCount===0){
      return res.status(404).json({ message: "No records found to delete." });
    }
      

    return res.status(200).json({message:"Record deleted successfully"});
    
  } catch (error) {
    console.log("Course Not Found! : Error :",error)
  }
};

const deleteAlldetails = async (req,res) =>{
  try {
    const {modelName}=req.body;
    const Model=models[modelName];
    
    
    const output= await Model.deleteMany({});

   
      if (output.deletedCount === 0) {
      // console.log("No records found to delete.");
      return res.status(404).json({ message: "No records found to delete." });
    

      }
    return res.status(200).json({message:"Records Deleted Succesfully"})
  } catch (error) {
    console.log("details Not Found! : Error :",error)
  }
};
const Updatebyid = async (req,res) =>{
  try {
    const {modelName,_id,...details}=req.body;
    const Model=models[modelName]
    // console.log(modelName)
    // console.log("id :",_id,"details :",details)
    const saved= await Model.findByIdAndUpdate(_id, { $set: details }, { new: true });
    console.log(saved)
    if(saved===null){
      return res.status(401).json({ message: "Record Not Found!"  });

    }
    
    // console.log("Details Updated! :",saved);
    return res.status(201).json({ message: "Record updated!"  });
  } catch (error) {
    console.log("Details Not Found! : Error :",error)
    return res.status(500).json({ message: "Record Not Updated!" });
  }
};

// app.get("/fetch",(req,res) => {
 
// const d=  find()

// res.status(201).json({ message: "Record successfully added!", record: d });
//   // Updatebyid();
//   //course();

// })

app.get("/",(req,res) => {
    // res.json({message:"welcome to my channel"});
    res.send("Hi , Node js has Started !!")

    


});

app.post("/api/insert",async(req,res)=>{
  try {
    // const modelName = "Tutorial"; 
    await insert(res,req);
    // console.log(res);
  } catch (error) {
    console.error("Internal server Error :",error)
  }
 

});

app.get("/api/find",async(req,res) => {
 try {
  await find(req,res)

 } catch (error) {
    console.error("Internal Server Error :",error)
 }
 
});

app.put("/api/update",async(req,res)=>{
  try {
    await Updatebyid(req,res)
  } catch (error) {
    console.error("Internal Server Error :",error)
    
  }
});
app.delete("/api/delete",async(req,res)=>{
  try{
    await deletebyid(req,res)

  }catch(error){
    console.error("Internal Server Error :",error)
  }
});

app.delete("/api/deleteall",async(req,res)=>{
  try{
  await deleteAlldetails(req,res)
}catch(error){
  console.error("Internal Server Error :",error)

}
});




const port=process.env.PORT || 8000;
app.listen(port,()=>{
  console.log("Your Server is Running in the port :",port)
});

