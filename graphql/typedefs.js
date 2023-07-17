//! In GraphQL, type definitions (often referred to as "typeDefs") are used to describe the shape of your data and the operations that can be performed on that data. They form the contract between the client and the server, specifying what data can be fetched and how it can be manipulated.
const typeDefs = `#graphql
    type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        user: User! @relationship(type: "HAS_TODO", direction: OUT)
    }

    type User {
        id: ID!
        name: String!
        todos: [Todo!]! @relationship(type: "HAS_TODO", direction: IN)
    }

    type Query {
        todos: [Todo]
        users: [User]
    }

    type Mutation {
        addTodo(title: String!, completed: Boolean!): Todo
    }
`;

export default typeDefs;

//! type Todo {     //This is a custom type that represents a todo item. It has three fields: id, title, and completed. The ID! type means that id is a unique identifier and cannot be null. The String! type means that title is a string and cannot be null. The Boolean! type means that completed is a boolean and cannot be null.
//! type Query {    //This is a special type that represents all of the read operations that can be performed. Any data that you fetch from your server is done through a query.
//! todos: [Todo]   // It means that there's a todos query that returns an array of Todo objects. The Todo type would be defined elsewhere in your schema.
//! type Mutation { //This is a special type that represents all of the write operations that can be performed. Any data that you send to your server to create, update, or delete is done through a mutation.
//!  addTodo(title: String!, completed: Boolean!): Todo     //It means that there's an addTodo mutation that takes a title argument of type String and a completed argument of type Boolean, and returns a Todo object. The ! after String and Boolean means that these arguments are required.

//! BY USING NEO4J-GRAPHQL, WE DEFINE ONLY ONE SCHEMA, ACTUALLY A TYPE DEFINITION FOR GRAPHQL ->  
//! Neo4j-GraphQL uses a single GraphQL schema to interact with the Neo4j database. This is part of the power and convenience of using Neo4j-GraphQL. You may find it surprising, but it comes down to the clever way that Neo4j-GraphQL auto-generates queries.
//! Setting Up the Schema: In a Neo4j-GraphQL project, you define your data model using GraphQL type definitions. These definitions serve as the single source of truth for your data and form the GraphQL schema. This schema not only details the shape of data your API accepts and returns but also describes relationships and connections between different entities.

//! When a client sends a GraphQL request (query/mutation) to the server, Neo4j-GraphQL translates that request into an efficient Cypher query based on your GraphQL schema and runs it against your Neo4j instance. 

//* To show how this works, let's say you request a list of todos (title, completed status, and owner's name) for a specific user, using a GraphQL query like this:

// query {
//     User(where: { id: "123" }) {
//       name
//       todos {
//         title
//         completed
//         user {
//           name
//         }
//       }
//     }
//   }  

//* Neo4j-GraphQL will translate the above GraphQL request into an equivalent Cypher query, execute it against the Neo4j database, and return the result in the shape dictated by the initial GraphQL request.

//* Similarly, if you send a mutation to add a Todo item, Neo4j-GraphQL translates that into a Cypher query to create a new Todo node in the database, and then connects it to the User node as specified in the mutation.

//* In conclusion, you only need to maintain a single schema - the GraphQL schema. Neo4j-GraphQL handles the conversion to and from Cypher queries. It abstracts the need to write detailed Cypher queries yourself, allowing you to focus on constructing your front-end queries and mutations. It should be noted that the queries generated by Neo4j-GraphQL are optimized to return only the data requested in the query, adhering to one of the primary benefits of using GraphQL. 