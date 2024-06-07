import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
const router = express.Router();

router.get("/", getTodos);
router.post("/create", createTodo);
router.get("/:id", getTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
