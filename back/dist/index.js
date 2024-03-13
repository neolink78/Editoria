"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const type_graphql_1 = require("type-graphql");
const CodeSnippetResolver_1 = require("./resolvers/CodeSnippetResolver");
const user_1 = __importDefault(require("./entities/user/user"));
const UserResolver_1 = require("./resolvers/UserResolver");
const cookie_1 = require("./utils/cookie");
const database_1 = require("./database");
const authChecker = ({ context }) => {
    return Boolean(context.user);
};
const PORT = 4000;
const startApolloServer = async () => {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [CodeSnippetResolver_1.CodeSnippetResolver, UserResolver_1.UserResolver],
        validate: true,
        authChecker,
    });
    const server = new server_1.ApolloServer({ schema });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: PORT },
        context: async ({ req, res }) => {
            const userSessionId = (0, cookie_1.getUserSessionIdFromCookie)(req);
            const user = userSessionId
                ? await user_1.default.getUserWithSessionId(userSessionId)
                : null;
            return { res: res, user, userSessionId };
        },
    });
    await (0, database_1.getDataSource)();
    console.log(`🚀  Server ready at: ${url}`);
};
startApolloServer();
