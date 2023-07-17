import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import 'dotenv/config';
import typeDefs from "../graphql/typedefs.js";

const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

//! neoSchema : An instance of the Neo4jGraphQL class, created with our typeDefs
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

export {driver, neoSchema};