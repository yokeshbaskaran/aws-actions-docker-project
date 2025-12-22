require("dotenv").config({ quiet: true });

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// // dummy data
// const todos = [];
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("DB connection failed!");
  });

// creating TODO schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log("GET TODO failed!");
  }
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  //   const newTodo = {
  //     id: todos.length + 1,
  //     title: title,
  //   };
  try {
    const newTodo = new Todo({ title });
    await newTodo.save();

    console.log(newTodo);
    res.status(201).json({ newTodo, message: "Todo created" });
  } catch (error) {
    console.log("POST Todo failed!");
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleTodo = await Todo.findById(id);
    res.status(200).json(singleTodo);
  } catch (error) {
    console.log("GET SINGLE Todo failed!");
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { title } = req.body;
    const id = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log("DELETE Todo failed!");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: `Todo deleted!!!` });
  } catch (error) {
    console.log("DELETE Todo failed!");
  }
});

//server on port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
