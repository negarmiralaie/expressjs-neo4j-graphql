
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/
// THIS IS HOW WE TODOS TYPE -> IT SHOULD BE ENTERED IN APOLLO GRAPHQL PLAYGROUND OR SHOULD BE WRITTEN IN RESOLVERS
// The query fetches all todos and their title and completed fields. 

// query {
//     todos {
//       title
//       completed
//     }
// }

// THIS IS HOW WE ADDTODO MUTATION -> IT SHOULD BE ENTERED IN APOLLO GRAPHQL PLAYGROUND OR SHOULD BE WRITTEN IN RESOLVERS
// The mutation adds a new todo with the title "My first todo" and a completed status of false, and then fetches the title and completed fields of the new todo.

// mutation {
//     addTodo(title: "My first todo", completed: false) {
//       title
//       completed
//     }
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/

//************************************** */
//! args: An object with the arguments passed into the field in the query.
//! context: An object that gets passed through the resolver chain and typically used to share common resources like a database connection.
//! root: The result from the parent field's resolver function. This is not used in top-level resolvers.
// const resolvers = {
//     Query: {
//         todos: async (_parent, _args, context) => {
//             // The getTodos() function is a placeholder for where you would 
//             // call the actual logic interacting with the database
//             return context.dataSources.todoAPI.getTodos();
//         },
//     },
//     Mutation: {
//         createTodo: async (_parent, { title, completed }, context) => {
//             // The createTodo() function is a placeholder for where you would 
//             // call the actual logic interacting with the database
//             return context.dataSources.todoAPI.createTodo(title, completed);
//         }
//     }
// };

// const resolvers = {
//     Query: {
//         todos: async () => {
//             const session = driver.session();
//             const result = await session.run('MATCH (t:Todo) RETURN t');
//             await session.close();
            
//             return result.records.map(record => record.get('t').properties);
//         },
//     },
    
//     Mutation: {
//         addTodo: async (_, { title, completed }) => {
//             const session = driver.session();
//             const result = await session.run(
//                 'CREATE (t:Todo {title: $title, completed: $completed}) RETURN t',
//                 { title, completed }
//                 );
//             await session.close();
            
//             return result.records[0].get('t').properties;
//         },
//     },
// };

const getTodos = async () => {
    const session = driver.session();

    try {
        const result = await session.run(
            'MATCH (t:Todo) RETURN t'
        );

        return result.records.map(record => record.get('t').properties);
        } finally {
        await session.close();
    }
};

const createTodo = async (title, completed) => {
    const session = driver.session();

    try {
        const result = await session.run(
            'CREATE (t:Todo {title: $title, completed: $completed}) RETURN t',
            { title, completed }
        );

        return result.records[0].get('t').properties;
        } finally {
        await session.close();
        }
};

createTodo('My first todo', false).then(todo => {
    console.log('Created todo:', todo);
});

getTodos().then(todos => {
    console.log('All todos:', todos);
});

// ! INSTEAD OF THIS, WE HAVE  TODO QUERY 
// app.get("/todo/list", async (req, res) => {
//     try {
//         const query = gql`
//         {
//             Todo {
//                 id
//                 title
//                 completed
//             }
//         }
//         `;
        
//         // First arg is a qraphql query or mutation, and second is a context object.
//         const result = await neoSchema.execute({ document: query, context: {} });
//         res.json(result.data.Todo);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// ! AND INSTEAD OF THIS, WE HAVE CREATETODO MUTATION
// app.post("/todo", (req, res) => {
//     // const mutation = gql`
//     //     mutation($id: ID!, $title: String!, $completed: Boolean!) {
//     //         createTodo(input: { id: $id, title: $title, completed: $completed }) {
//     //             id
//     //             title
//     //             completed
//     //         }
//     //     }
//     // `;
//     // const variables = {
//     //     id: req.body.id,
//     //     title: req.body.title,
//     //     completed: req.body.completed
//     // };
//     // const result = await neoSchema.execute({ document: mutation, context: {}, variables });
//     res.json(result.data.createTodo);
// });



import { startStandaloneServer } from '@apollo/server/standalone';


const resolvers = {
    Query: {
        todos: async (_parent, _args, context) => {
            return getTodos();
        },
    },
    Mutation: {
        createTodo: async (_parent, { title, completed }, context) => {
            return createTodo(title, completed);
        }
    }
};