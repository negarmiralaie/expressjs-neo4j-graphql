const {Neo4jGraphQL} = require('@neo4j/graphql');
const {ApolloServer, gql} = require('apollo-server');
const neo4j = require('neo4j-driver');
require ('dotenv/config');

// Tells us everything about the data in our graphql api
const typeDefs = gql`
    type Movie {
        title: String
    }
`;

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({typeDefs});

const server = new ApolloServer({
    schema: neoSchema.schema
});

server.listen().then(({url}) => {
    console.log(`GraphQl server is ready at ${url}`);
});

// const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD));

// const serverInfo = driver.getServerInfo();

// const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

// const server = new ApolloServer({
//   schema: neoSchema.getSchema(),
// });

// const { url } = startStandaloneServer(server, {
//   context: async ({ req }) => ({ req }),
//   listen: { port: 4000 },
// });