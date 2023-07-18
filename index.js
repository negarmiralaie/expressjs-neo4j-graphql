import express from 'express';
import { ApolloServer } from '@apollo/server'; // gql helps us with writing graphql queries and mutations
// import { gql } from 'apollo-server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import pkg from '@neo4j/graphql-plugin-auth';
const { Neo4jGraphQLAuthJWTPlugin } = pkg;

// import { Neo4jGraphQL } from "@neo4j/graphql";
// import neo4j from "neo4j-driver";
import 'dotenv/config';
// ********************************************* END OF PACKAGE IMPORTS **********************************
import { driver, neoSchema } from './neo4j/Connection.js';
// ********************************************* END OF FILE IMPORTS *************************************
// driver.close();
const session = driver.session();
//************************************** */
const todoList = [];

const app = express();
app.use(express.urlencoded({extended: true}));

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
});

//! This function applies any necessary middleware to the Express app to route HTTP requests to the Apollo Server.
server.applyMiddleware({ app });

const { url } = await startStandaloneServer(server, {
    // context: async ({ req }) => ({ req }),
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);