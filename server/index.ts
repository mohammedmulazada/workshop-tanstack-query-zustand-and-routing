import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

const todos:  Todo[] = [
  {
    id: 1,
    text: 'Learn about RESTful API design',
    completed: false
  },
  {
    id: 2,
    text: 'Take a break',
    completed: true
  }
];

const generateId = () => {
  // Find the last todo in the list of todos
  const lastTodo = todos.at(-1);

  // If there are no todos in the list, start the ID at 1
  if (!lastTodo) {
    return 1;
  }

  // Otherwise, generate a new ID by incrementing the last todo's ID by 1
  return lastTodo.id + 1;
};

// GET
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST
app.post('/todos', (req, res) => {
  const todo = {
    id: generateId(),
    text: req.body.text,
    completed: false
  };

  todos.push(todo);

  res.json(todos);
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === Number(req.params.id));

  if (todo) {
    todo.completed = !todo.completed;

    res.json(todos);
  } else {
    res.sendStatus(404);
  }
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === Number(req.params.id));

  if (todo) {
    res.json(todo);
  } else {
    res.sendStatus(404);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
