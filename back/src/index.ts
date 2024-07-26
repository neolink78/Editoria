import "reflect-metadata";
import { Response } from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AuthChecker, buildSchema } from "type-graphql";
import { CodeSnippetResolver } from "./resolvers/CodeSnippetResolver";
import User from "./entities/user/user";
import { UserResolver } from "./resolvers/UserResolver";
import {
  getUserResetSessionIdFromCookie,
  getUserSessionIdFromCookie,
} from "./utils/cookie";
import { getDataSource } from "./database";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { LikeResolver } from "./resolvers/LikeResolver";
import "dotenv/config";
import CommentResolver from "./resolvers/CommentResolver";
import { getCache } from "./cache";
import FollowerResolver from "./resolvers/FollowerResolver";

export type Context = {
  res: Response;
  user: User | null;
  userSessionId: string | undefined;
};

export type ContextReset = {
  res: Response;
  userResetSessionId?: string | undefined;
};

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [
      CodeSnippetResolver,
      UserResolver,
      ProjectResolver,
      LikeResolver,
      CommentResolver,
      FollowerResolver,
    ],
    validate: true,
    authChecker,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }): Promise<Context | ContextReset> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const userResetSessionId = getUserResetSessionIdFromCookie(req);

      let user = null;
      let sessionId: string | undefined;

      if (userSessionId) {
        user = await User.getUserWithSessionId(userSessionId);
        sessionId = userSessionId;
        return { res: res as Response, user, userSessionId };
      } else if (userResetSessionId) {
        sessionId = userResetSessionId;
        return { res: res as Response, userResetSessionId };
      }

      return { res: res as Response };
    },
  });

  await getDataSource();
  await getCache();
  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
