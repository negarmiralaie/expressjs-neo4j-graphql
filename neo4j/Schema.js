// const Schema = {
//     type User {
//         id: ID!
//         name: String!
//         todos: [Todo!]! @relationship(type: "HAS_TODO", direction: OUT)    //The @relationship directive specifies that a User HAS_TODO. The direction: OUT means the relationship goes from User to Todo
//     }
    
//     type Todo {
//         id: ID!
//         title: String!
//         completed: Boolean!
//     }
    
// };

//! Neo4j is schema-optional, meaning that it's not necessary to create indexes and constraints. You can create data—nodes, relationships and properties—without defining a schema up front. Indexes and constraints can be introduced when desired, in order to gain performance or modeling benefits