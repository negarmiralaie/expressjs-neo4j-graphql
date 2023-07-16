import express from 'express';
// gql helps us with writing graphql queries and mutations
import { ApolloServer } from '@apollo/server';
import { gql } from 'apollo-server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import 'dotenv/config';

const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "12345678")
);

const typeDefs = `#graphql
    type Todo {
        id: ID!
        title: String!
        completed: Boolean!
    }
`;

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const todoList = [];

const app = express();
app.use(express.urlencoded({extended: true}));

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
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

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);