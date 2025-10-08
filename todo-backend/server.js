//Using Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//create an instance of express
const app = express();
app.use(express.json());
app.use(cors());

//sample in-memory storage for todo items
//let todos =[];

//connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
})

//creating schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
});

//creating model
const todomodel= mongoose.model('Todo', todoSchema);

//create a new todo item
app.post('/todos',async(req,res)=>{
   const {title,description}= req.body;
  //  const newTodo = {
  //      id: todos.length + 1,
  //      title,
  //      description
  //  };
  //  todos.push(newTodo);
  //  console.log(todos);
try {
    const newTodo = new todomodel({title,description});
    await newTodo.save();
    res.status(201).json(newTodo);
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
}
});

//Get all items
app.get('/todos',async(req,res)=>{
    try {
        const todos = await todomodel.find();
        res.json(todos);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

//update a todo items
app.put('/todos/:id',async(req,res)=>{
    try {
        const {title,description} = req.body;
        const id = req.params.id;
        const updatedtodo = await todomodel.findByIdAndUpdate(
        id,
        {title,description},
        {new: true}
        );
        if(!updatedtodo){
        return res.status(404).json({message:"Todo item not found"});
        }
        res.json(updatedtodo);  
}   catch (error) {   
        console.log(error);
        res.status(500).json({message: error.message});
        
    }
})

//Delete a todo item
app.delete('/todos/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const deletedtodo = await todomodel.findByIdAndDelete(id);
        if(!deletedtodo){
            return res.status(404).json({message:"Todo item not found"});
        }
        res.json({message:"Todo item deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }
})

//Start the server
const port = 8000;
app.listen(port,()=>{
    console.log("Server is listening to port " + port);
})