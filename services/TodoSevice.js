import { driver, neoSchema } from './neo4j/Connection.js';

const getTodos = async () => {
    const Todo = neoSchema.ogm.model("Todo");
    return await Todo.findMany();
};

const createTodo = async (title, completed) => {
    const Todo = neoSchema.ogm.model("Todo");
    const newTodo = await Todo.create({ title, completed });
    return newTodo;
};

export { getTodos, createTodo };