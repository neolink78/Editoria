"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
// import { Response } from "express";
const codeSnippet_1 = __importDefault(require("./entities/codeSnippet/codeSnippet"));
// import { CreateCodeSnippetInput, UpdateCodeSnippetInput } from './codeSnippetInputs';
// import { CodeSnippetService } from './codeSnippetService';
// import { MyContext } from '../types';
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const type_graphql_1 = require("type-graphql");
const CodeSnippetResolver_1 = require("./resolvers/CodeSnippetResolver");
// import { AdResolver } from "./resolvers/AdResolver";
// import { TagResolver } from "./resolvers/TagResolver";
// import { UserResolver } from "./resolvers/UserResolver";
// import { getUserSessionIdFromCookie } from "./utils/cookie";
// export type Context = { res: Response; user: User | null };
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: 'http://localhost:4000',
    entities: [codeSnippet_1.default],
    synchronize: true,
});
// const authChecker: AuthChecker<Context> = ({ context }) => {
//   return Boolean(context.user);
// };
const PORT = 4000;
const startApolloServer = async () => {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [CodeSnippetResolver_1.CodeSnippetResolver],
        // validate: true,
        // authChecker,
    });
    const server = new server_1.ApolloServer({ schema });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: PORT },
        // context: async ({ req, res }): Promise<Context> => {
        //   const userSessionId = getUserSessionIdFromCookie(req);
        //   const user = userSessionId
        //     ? await User.getUserWithSessionId(userSessionId)
        //     : null;
        //   return { res: res as Response, user };
        // },
    });
    await dataSource.initialize();
    //   await Category.initializeCategories();
    console.log(`🚀  Server ready at: ${url}`);
};
startApolloServer();
