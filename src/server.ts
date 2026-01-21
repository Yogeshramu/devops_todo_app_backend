import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

const getTodos = (): Todo[] => todos;
const addTodo = (title: string): Todo => {
  const newTodo: Todo = { id: nextId++, title, completed: false };
  todos.push(newTodo);
  return newTodo;
};
const toggleTodo = (id: number): Todo | undefined => {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
  return todo;
};
const updateTodo = (id: number, title: string): Todo | undefined => {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.title = title;
  return todo;
};
const deleteTodo = (id: number): boolean => {
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;
};

dotenv.config();

const app = express();
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "Backend running ✅" });
});

// Todo endpoints
app.get("/api/todos", (req: Request, res: Response) => {
  const todos = getTodos();
  res.json(todos);
});

app.post("/api/todos", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const newTodo = addTodo(title);
  res.json(newTodo);
});

app.patch("/api/todos/:id/toggle", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const updated = toggleTodo(id);
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  res.json(updated);
});

app.put("/api/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const updated = updateTodo(id, title);
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  res.json(updated);
});

app.delete("/api/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const deleted = deleteTodo(id);
  if (!deleted) return res.status(404).json({ error: "Todo not found" });
  res.status(204).send();
});

app.listen(typeof PORT === 'string' ? parseInt(PORT) : PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
