//! resolvers: For handling GraphQL queries and mutations using the provided functions.
//! Resolver actually combines Queries and Mutations...
import { v4 as uuidv4} from 'uuid';
import { neoSchema } from '../neo4j/Connection.js';
import { generateAccessToken, validatePassword, hashPassword } from '../components/Auth.js';

const resolvers = {
    User: {
        // !Typically you do not need to write this bc it is automatically generated in neo4-graphql but in that way, If you query for users and their todos, if that user does not have any todo, it will throw an error bc nothing should be null in neo4j-graphql, so for returning null, empty array, you must create this on your own!
        todos: async (parent, args, context, info) => {
            const todos = await context.db.run(`MATCH (u:User {id: "${parent.id}"})-[:HAS_TODO]->(t:Todo) RETURN t`);
        
            // If todos or todos.records is null or not an array, return an empty array
            if (!todos || !Array.isArray(todos.records)) {
                return [];
            }
        
            // Otherwise, return the todos
            return todos.records.map(record => record.get('t').properties);
        },
    },
    Mutation: {
        // Create todo mutation
        addTodo: async (_, args, context, info) => {
            const session = neoSchema.driver.session();
            try {
            const query = `
                CREATE (t:Todo { id: randomUUID(), title: $title, completed: $completed })
                RETURN t
            `;
            const result = await session.run(query, args);
            return result.records[0].get('t').properties;
            } finally {
            session.close();
            }
        },

        updateTodo: async (parent, args, context, info) => {
            const { id, title } = args;

            const updateQuery = `SET t.title = "${title}"`;

            const query = `MATCH (t:Todo {id: "${id}"}) ${updateQuery} RETURN t`;
            const todo = await context.db.run(query);
            
            if (!todo.records || todo.records.length === 0) {
                throw new Error("Todo not found");
            }
            return todo.records[0].get('t').properties;
        },

        deleteTodo: async (parent, args, context, info) => {
            const { id } = args;

            // Assuming all todos are connected with an OWNER relationship
            const query = `
                MATCH (t:Todo {id: "${id}"})
                OPTIONAL MATCH (t)-[r]-()
                DELETE t, r
            `;
            try {
                await context.db.run(query);
                return `Todo with id ${id} deleted successfully`;
            } catch (error) {
                throw new Error(`Failed to delete Todo: ${error}`);
            }
        },

        signup: async (_, { name, password }, { driver }) => {
            const session = neoSchema.driver.session();
            const query = `
                MATCH (u:User { name: $name, password: $password })
                RETURN u
            `;

            const repeatedUserResult = await session.run(query, {name, password});
            if (repeatedUserResult.records.length !== 0) throw new Error('User already exists!!!');

            const id = uuidv4();
            const hashedPassword = await hashPassword(password);
            const result = await session.run(
                `CREATE (u:User {id: $id, name: $name, password: $hashedPassword}) RETURN u`,
                { id, name, hashedPassword }
            );

            session.close();
            const user = result.records[0].get('u').properties;
            const token = generateAccessToken(user);
            return { token, user };
        },

        login: async (_, args, context, info) => {
            const session = driver.session();
            try {
                const query = `
                    MATCH (u:User { name: $name, password: $password })
                    RETURN u
                `;

                const result = await session.run(query, args);
                if (result.records.length === 0) throw new Error('Invalid login credentials');

                const user = result.records[0].get('u').properties;
                console.log('user', user);
                const token = generateAccessToken(user);

                return { token, user };
            } finally {
                session.close();
            }
        },
    },
};

export default resolvers;