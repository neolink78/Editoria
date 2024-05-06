import User from "../user/user";
import CodeSnippet, { Language } from "./codeSnippet";
import { getDataSource } from "../../database";
import { DataSource } from "typeorm";
import { v4 as uuidv4 } from "uuid"; // Import the UUID generation function from the 'uuid' package
import Project from "../project/project";

describe("CodeSnippet", () => {
  let database: DataSource;
  let testProjectId: string;

  beforeAll(async () => {
    try {
      database = await getDataSource();
      const uniqueEmail = `testuser_${Date.now()}@example.com`;
      const uniqueUsername = `testuser_${Date.now()}`;
      const testUser = await database.getRepository(User).save({
        email: uniqueEmail,
        password: "securepassword123",
        username: uniqueUsername,
        hashedPassword: "somehashedpassword",
      });

      const testProject = await database.getRepository(Project).save({
        title: "Test Project",
        is_public: true,
        owner: testUser,
      });
      testProjectId = testProject.id;
    } catch (error) {
      console.error("Error creating test project:", error);
    }
  });

  beforeEach(async () => {
    // const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      if (entity.name !== "Project" && entity.name !== "User") {
        const repository = database.getRepository(entity.name);
        await repository.query(
          `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
        );
      }
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("saveNewCodeSnippet", () => {
    it("should create a new code snippet and retrieve it from the database", async () => {
      const newSnippetDetails: {
        title: string;
        code: string;
        language: Language;
        projectId: string;
        owner: User;
      } = {
        title: "Introduction to Jest",
        code: "test('adds 1 + 2 to equal 3', () => { expect(1 + 2).toBe(3); });",
        language: Language.JAVASCRIPT,
        projectId: testProjectId,
        owner: new User(),
      };

      const savedSnippet = await CodeSnippet.createCodeSnippet(
        newSnippetDetails
      );

      expect(savedSnippet).toBeDefined();
      expect(savedSnippet.title).toBe(newSnippetDetails.title);
      expect(savedSnippet.code).toBe(newSnippetDetails.code);
      expect(savedSnippet.language).toBe(newSnippetDetails.language);

      const fetchedSnippet = await database.getRepository(CodeSnippet).findOne({
        relations: ["project"],
        where: { project: { id: newSnippetDetails.projectId } },
      });

      expect(fetchedSnippet).toBeDefined();
      if (fetchedSnippet) {
        expect(fetchedSnippet!.code).toBe(newSnippetDetails.code);
        expect(fetchedSnippet!.language).toBe(newSnippetDetails.language);
        expect(fetchedSnippet!.project.id).toBe(newSnippetDetails.projectId);
      }
    });

    it("should fail when the code snippet code is empty", async () => {
      const newSnippetDetails = {
        title: "Test Snippet",
        code: "",
        language: Language.JAVASCRIPT,
        projectId: "valid-project-id",
        owner: new User(),
      };

      await expect(
        CodeSnippet.createCodeSnippet(newSnippetDetails)
      ).rejects.toThrow("Code snippet cannot be empty");
    });
  });
});
