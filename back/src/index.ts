import "reflect-metadata";
import { Response } from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { CodeSnippetResolver } from "./resolvers/CodeSnippetResolver";
import User from "./entities/user/user";
import { UserResolver } from "./resolvers/UserResolver";
import { getUserSessionIdFromCookie } from "./utils/cookie";
import { getDataSource } from "./database";
import { ProjectResolver } from "./resolvers/ProjectResolver";

export type Context = { res: Response; user: User | null, userSessionId: string | undefined};

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [CodeSnippetResolver, UserResolver, ProjectResolver],
    validate: true,
    authChecker,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { res: res as Response, user, userSessionId };
    },
  });

  await getDataSource();
  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
