import Todo from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "success", todos });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo) res.status(404).json({ message: "text field is missing" });
    const newTodo = new Todo({
      text: todo,
    });
    const savedTodo = await newTodo.save();
    res.status(200).json({ message: "success", savedTodo });
  } catch (error) {
    res.status(500).json({ message: "failed", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "TODO item not found" });
    res.status(200).json({ message: "TODO item deleted successfully" });
  } catch (error) {
    res.status(500).json("error", error);
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id });
    if (!todo) res.status(404).json({ message: "item not found" });
    res.status(200).json({ message: "success", todo });
  } catch (error) {
    res.status(500).json("error", error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const text = req.body.text;
    if (!text) return res.status(404).json({ message: "text field required" });
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        text: text,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "todo not found" });
    }
    return res
      .status(200)
      .json({ message: "updated successfully", updatedTodo: updatedTodo });
  } catch (error) {
    res.status(404).json({ message: "error", error: error.message });
  }
};
