//Import the libraries - express - mongoose -cors
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

//Create express server
const app=express();
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect("mongodb+srv://thehushedrain_db_user:tH6K4Lw1qVGyEG6G@cluster0.3zodmi1.mongodb.net/?appName=Cluster0")
 .then(()=> console.log("Connected to MongoDB"))
 .catch(err=>console.error(err))

//Create a Model
const Person = mongoose.model("Person", {name: String,age: Number},"person");

//Read all the peoples
app.get("/",async(req,res)=>{
    const people= await Person.find();
    res.json(people);
});

//Add new People 
app.post("/add",async(req,res)=>{
    const newPerson=await Person.create(req.body);
    res.json(newPerson);    
})

//Update people
app.put("/:id",async(req,res)=>{
    const updated=await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.json(updated);
})

//Delete People
app.delete("/:id",async(req,res)=>{
    await Person.findByIdAndDelete(req.params.id);
    res.json({meassage:"Person deleted"})
})
//Connection
app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000");
})