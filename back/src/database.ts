import { DataSource } from "typeorm";
import UserSession from "./entities/user/userSession";
import User from "./entities/user/user";
import CodeSnippet from "./entities/codeSnippet/codeSnippet";
import Project from "./entities/project/project";

let dataSource: DataSource;

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      url:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
      entities: [CodeSnippet, User, UserSession, Project],
      synchronize: true,
    });
    await dataSource.initialize();
  }
  return dataSource;
};
