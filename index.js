import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import pkg from '@neo4j/graphql-plugin-auth';
const { Neo4jGraphQLAuthJWTPlugin } = pkg;
import { Neo4jGraphQL } from "@neo4j/graphql";
import 'dotenv/config';
// ********************************************* END OF PACKAGE IMPORTS **********************************
import { driver, neoSchema } from './neo4j/Connection.js';
// ********************************************* END OF FILE IMPORTS *************************************

const startApolloServer = async () => {
    const session = driver.session();

    const app = express();
    app.use(express.urlencoded({extended: true}));

    const server = new ApolloServer({
        schema: await neoSchema.getSchema(),
        context: {
            db: neoSchema.driver.session(),
        }
    });

    await server.start();
    app.use(server.getMiddleware());
    app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000`));
};

startApolloServer();