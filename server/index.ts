import express from "express";
import cors from "cors";
import { Todo } from "../types/Todo";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const todos: Todo[] = [
  {
    id: "1",
    text: "Give a workshop",
    completed: false,
  },
  {
    id: "2",
    text: "Do groceries",
    completed: false,
  },
  {
    id: "2",
    text: "Divide by 0",
    completed: true,
  },
];

const generateId = () => {
  // Find the last todo in the list of todos
  const lastTodo = todos.at(-1);

  // If there are no todos in the list, start the ID at 1
  if (!lastTodo) {
    return String(1);
  }

  // Otherwise, generate a new ID by incrementing the last todo's ID by 1
  return String(Number(lastTodo.id) + 1);
};

// GET
app.get("/todos", (_req, res) => {
  setTimeout(() => {
    res.json(todos);
  }, getRandomNumber(700, 1500));
});

// POST
app.post("/todos", (req: express.Request, res: express.Response) => {
  const todo = {
    id: generateId(),
    text: req.body.text,
    completed: false,
  };

  todos.push(todo);

  res.json(todo);
});

// PATCH /todos/:id
app.patch("/todos/:id", (req: express.Request, res: express.Response) => {
  const todo = todos.find((todo) => todo.id === req.params.id);

  if (todo) {
    todo.completed = !todo.completed;

    setTimeout(() => {
      res.json(todo);
    }, getRandomNumber(700, 1000));
  } else {
    res.sendStatus(404);
  }
});

// GET /todos/:id
app.get("/todos/:id", (req: express.Request, res: express.Response) => {
  const todo = todos.find((todo) => todo.id === req.params.id);

  if (todo) {
    setTimeout(() => {
      res.json(todo);
    }, getRandomNumber(1500, 2500));
  } else {
    res.sendStatus(404);
  }
});

// Start the server
app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
