import express from 'express';
import { ApolloServer } from '@apollo/server';
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


app.get("/todo/list", (req, res) => {
    res.json(todoList);
});

app.post("/todo", (req, res) => {
    todoList.push(req.body);
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);