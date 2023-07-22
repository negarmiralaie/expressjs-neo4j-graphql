import neo4j from 'neo4j-driver';
// import { Neo4jGraphQL } from '@neo4j/graphql';
import { Neo4jGraphQL } from "@neo4j/graphql";
import pkg from '@neo4j/graphql-plugin-auth';
const { Neo4jGraphQLAuthJWTPlugin } = pkg;
// import { Neo4jGraphQLAuthJWTPlugin } from '@neo4j/graphql-plugin-auth';
import 'dotenv/config';
import typeDefs from '../graphql/typedefs.js';
import resolvers from '../graphql/resolvers.js';

const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

//! neoSchema : An instance of the Neo4jGraphQL class, created with our typeDefs
const neoSchema = new Neo4jGraphQL({ 
    typeDefs,
    resolvers,
    driver,
    plugins: {
        auth: new Neo4jGraphQLAuthJWTPlugin({
            secret: process.env.ACCESS_TOKEN_SECRET,
        }),
    },
    //! The context function is a part of the Apollo Server configuration that allows each of your resolvers to share common information. This function is called with an object argument, which includes the HTTP request (req) among other things.
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try { //! The try block attempts to verify the JWT token using the secret key. If the token is valid, it will decode the payload of the token, which includes the userId. This userId is then assigned to the userId variable declared earlier.
            const user = jwt.verify(token, process.env.TOKEN_SECRET); //! This line retrieves the JWT token from the Authorization header of the HTTP request. If no token is provided, it defaults to an empty string.
            return { user }; //! This line declares a variable userId that will hold the ID of the authenticated user.
        } catch (e) {
            console.log('Failed to authenticate'); //! return { userId }; Finally, the context function returns an object that includes the userId. This object is passed to every resolver as the context argument, so they can access the authenticated user's ID
        }
    },
});

export {driver, neoSchema};