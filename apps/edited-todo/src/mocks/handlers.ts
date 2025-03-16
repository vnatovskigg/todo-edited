import { http, HttpResponse } from 'msw';

let todos = [
  { id: 1, text: 'Submit your Todo App to EDITED :)', completed: true },
];

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json(todos);
  }),

  http.post('/api/todos', async ({ request }) => {
    const { text } = (await request.json()) as { text: string };
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  http.patch('/api/todos/:todoId', ({ params }) => {
    const todoId = Number(params.todoId);
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) {
        return new HttpResponse(null, { status: 404 });
    }
    todo.completed = !todo.completed;
    return HttpResponse.json(todo);
  }),

  http.delete('/api/todos/:todoId', ({ params }) => {
    const todoId = Number(params.todoId);
    todos = todos.filter((t) => t.id !== todoId);
    return new HttpResponse(null, { status: 200 });
  }),
];
