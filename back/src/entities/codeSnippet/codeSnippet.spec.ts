import User from "../user/user";
import CodeSnippet from "./codeSnippet";
import { getDataSource } from "../../database";

describe("CodeSnippet", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("", () => {
    it("", async () => {});
  });
});
