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
    id: "3",
    text: "Divide by 0",
    completed: true,
  },
  {
    id: "4",
    text: "Figure out why fridge light turns off",
    completed: false,
  },
  {
    id: "5",
    text: "Create a perpetual motion machine",
    completed: true,
  },
  {
    id: "6",
    text: "Prove cats are liquid",
    completed: false,
  },
  {
    id: "7",
    text: "Convince the dog it's not a cat",
    completed: true,
  },
  {
    id: "8",
    text: "Count all the rice grains in a bag",
    completed: false,
  },
  {
    id: "9",
    text: "Invent a new color",
    completed: true,
  },
  {
    id: "10",
    text: "Put together IKEA furniture without leftover parts",
    completed: false,
  },
  {
    id: "11",
    text: "Catch a unicorn",
    completed: false,
  },
  {
    id: "12",
    text: "Find out where socks disappear to in the laundry",
    completed: false,
  },
  {
    id: "13",
    text: "Have a chat with Siri about existentialism",
    completed: false,
  },
  {
    id: "14",
    text: "Teach a goldfish to bark",
    completed: false,
  },
  {
    id: "15",
    text: "Create an origami swan out of spaghetti",
    completed: false,
  },
  {
    id: "16",
    text: "Translate Shakespeare into emojis",
    completed: false,
  },
  {
    id: "17",
    text: "Find the end of the rainbow",
    completed: false,
  },
  {
    id: "18",
    text: "Learn to speak unicorn",
    completed: false,
  },
  {
    id: "19",
    text: "Invent silent fireworks",
    completed: false,
  },
  {
    id: "20",
    text: "Find a way to make Mondays illegal",
    completed: false,
  },
  {
    id: "21",
    text: "Try not to think about penguins",
    completed: false,
  },
  {
    id: "22",
    text: "Create a new pizza topping that no one's ever thought of",
    completed: false,
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
  }, getRandomNumber(700, 3500));
});

// GET
app.get("/todos/completed", (_req, res) => {
  setTimeout(() => {
    res.json(todos.filter((todo) => todo.completed));
  }, getRandomNumber(700, 1500));
});

// GET
app.get("/todos/uncompleted", (_req, res) => {
  setTimeout(() => {
    res.json(todos.filter((todo) => !todo.completed));
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
    }, getRandomNumber(1500, 3000));
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
