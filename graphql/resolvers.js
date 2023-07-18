//! resolvers: For handling GraphQL queries and mutations using the provided functions.
//! Resolver actually combines Queries and Mutations...
const resolvers = {
    Query: {
        todos: async (_, __, context) => {
            const todos = await context.neo4jgraphql.readAll('Todo');
            return todos;
        },
        users: async (_, __, context) => {
            const users = await context.neo4jgraphql.readAll('User');
            return users;
        },
    },
    Mutation: {
        async signup(_, { name, password }, context) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await context.neo4jgraphql.create({ name, password: hashedPassword });
            const token = generateAccessToken({ userId: user.id });
            return {
                token,
                user,
            };
        },
        async login(_, { name, password }, context) {
        const user = await context.neo4jgraphql.read({ name });
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid password');
        }
        const token = generateAccessToken({ userId: user.id });
        return {
            token,
            user,
        };
        },
    },
};