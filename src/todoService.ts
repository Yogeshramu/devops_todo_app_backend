import prisma from './prisma';

export const getTodos = async () => {
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const addTodo = async (title: string) => {
  return await prisma.todo.create({
    data: { title }
  });
};

export const toggleTodo = async (id: number) => {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) return null;
  
  return await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed }
  });
};