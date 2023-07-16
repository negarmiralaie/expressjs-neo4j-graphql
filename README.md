# neo4js-guide
# Different type of databases: Their functionality and purpose and the way they store data is different.
1. Sql database: like postgres, mysql -> Store data in tables and have a very strict schema -> Best for storing sensitive data and making sure that schema is correct.
2. Document database: like mongodb, dynamodb -> Store data in documents and do not have schema.
3. Key-value pair database: like redis -> Store data in key-value pairs => they are faster in retrieval of data. -> Best fo caching.

4. Graph database: They are used when our application has a lot of relationships... Like Twitter... e.x: we have a relationship between a tweet and users who like that tweet, also a relationship between a tweet and its creator account. => So many relationship... We can also use sql dbs and document dbs but if relationships are so cumbersome, it's better to store them in a graph db since it's focus is on storing data and their relationships... 

## How data is stored inside a graph db? data is stored in nodes(a circle). -> a node can be a food, a laptop, a building, a person etc. -> we might have several nodes to store names of different players. ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/f0ce41de-1bed-4d6a-b32e-5a836e3ed661)
## We can also store other data.. below we have stored team names of above players: ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/905101e6-9e69-46ad-9680-9bf5aa490509)
## Now we can relate these nodes together... Notice that they have a one way relation (Russel playes for Lakers team): ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/26b0939e-8ab5-4ba7-92e8-a6d35442bc88)

## Here we added some other relationships... Lebron is a teammate to Russel and also Russel is a teammate to LeBron: ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/88c47ab9-d4fe-4821-b3c1-f2160a936a98)

## Each node has several properties: ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/a02d26c8-9599-48a9-9b03-664270ef5932)

## To distinguish nodes from each other, we give them a label: (name and player label): ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/c9d6e32c-c01f-44c9-8e47-7460dedcb3b9)

## Now we create the relationship... one good thing is that we can give properties to the relationship: (Lebron has 40M salary in Lakers team): ![image](https://github.com/negarmiralaie/neo4js-guide/assets/81822434/f3d54eb5-7aee-4fbd-b97d-cdac20daf43e)

-----------------------------------------

### In Neo4js, we can store 2 types of things:
1. node: entity... like a player or a team
2. relationship between nodes...

------------------------------------------

1. MATCH : The keyword to query for things. We always start with this keyword when we want to fetch data.

MATCH (n) => Take all of the nodes inside the application
RETURN n  => Return those nodes.
MATCH (n) RETURN n => Return all nodes

To get all players only
Match (n) RETURN 

-------------------------------------------
#### Each type in your GraphQL type definitions can be mapped to an entity in your Neo4j database.
##### The most basic mapping is of GraphQL types to Neo4j nodes, where the GraphQL type name maps to the Neo4j node label.



--------------------------------------------
1. Open neo4j desktop -> create a project
2. Click on +Add button to add a local DBMS
3. Set a password for the DBMS
4. Click on start btn to activate db.
5. Then click on Start -> To open neo4j browser.

------------------------------------------
##### Yes, you can definitely have multiple routes in a GraphQL project. It's just that with GraphQL, all requests (queries, mutations, and subscriptions) are usually sent to a single endpoint, often /graphql. This is different from REST APIs, where you have separate endpoints for different resources. However, this doesn't mean that you cannot have multiple endpoints in a GraphQL server. It's just not the common practice.

------------------------------------------
###### Instead of using Express routes (app.get and app.post) to handle GraphQL queries and mutations, you should be using GraphQL resolvers.
