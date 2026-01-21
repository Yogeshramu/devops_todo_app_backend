export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

export const getTodos = (): Todo[] => {
  return todos;
};

export const addTodo = (title: string): Todo => {
  const newTodo: Todo = {
    id: nextId++,
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const toggleTodo = (id: number): Todo | undefined => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return todo;
};

//todo.ts ends here