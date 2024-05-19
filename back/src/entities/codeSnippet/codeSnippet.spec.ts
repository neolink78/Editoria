import User from "../user/user";
import CodeSnippet, { Language } from "./codeSnippet";
import { getDataSource } from "../../database";
import { DataSource } from "typeorm";
import Project from "../project/project";

describe("CodeSnippet", () => {
  let database: DataSource;
  let testProjectId: string;

  beforeAll(async () => {
    database = await getDataSource();

    const testUser = await database.getRepository(User).save({
      email: `testuser_${Date.now()}@example.com`,
      password: "securepassword123",
      username: `testuser_${Date.now()}`,
      hashedPassword: "somehashedpassword",
    });

    const testProject = await database.getRepository(Project).save({
      title: "Test Project",
      is_public: true,
      owner: testUser,
    });
    testProjectId = testProject.id;
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
    let newSnippetDetails: {
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

    it("should create a new code snippet with correct properties", async () => {
      const savedSnippet = await CodeSnippet.createCodeSnippet(
        newSnippetDetails
      );

      expect(savedSnippet).toBeDefined();
      expect(savedSnippet.title).toBe(newSnippetDetails.title);
      expect(savedSnippet.code).toBe(newSnippetDetails.code);
      expect(savedSnippet.language).toBe(newSnippetDetails.language);
    });

    it("should retrieve the created code snippet from the database with correct properties", async () => {
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

  describe("updateCodeSnippet", () => {
    let savedSnippetId: string;

    beforeEach(async () => {
      const newSnippetDetails = {
        title: "Introduction to Jest",
        code: "test('adds 1 + 2 to equal 3', () => { expect(1 + 2).toBe(3); });",
        language: Language.JAVASCRIPT,
        projectId: testProjectId,
        owner: new User(),
      };

      const savedSnippet = await CodeSnippet.createCodeSnippet(
        newSnippetDetails
      );
      savedSnippetId = savedSnippet.id;
    });

    it("should update the code snippet with the new details", async () => {
      const updatedSnippetDetails = {
        title: "Introduction to Jest - Updated",
        code: "test('expects 3 to be 3', () => { expect(3).toBe(3); });",
        language: Language.C,
        projectId: testProjectId,
      };

      const updatedSnippet = await CodeSnippet.updateCodeSnippet(
        savedSnippetId,
        updatedSnippetDetails
      );

      expect(updatedSnippet).toBeDefined();
      expect(updatedSnippet.title).toBe(updatedSnippetDetails.title);
      expect(updatedSnippet.code).toBe(updatedSnippetDetails.code);
      expect(updatedSnippet.language).toBe(updatedSnippetDetails.language);
    });
    it("should retrieve the updated code snippet from the database with correct properties", async () => {
      const fetchedSnippet = await database.getRepository(CodeSnippet).findOne({
        where: { project: { id: savedSnippetId } },
      });

      expect(fetchedSnippet).toBeDefined();
      if (fetchedSnippet) {
        expect(fetchedSnippet!.title).toBe("Introduction to Jest - Updated");
        expect(fetchedSnippet!.code).toBe(
          "test('expects 3 to be 3', () => { expect(3).toBe(3); });"
        );
        expect(fetchedSnippet!.language).toBe(Language.JAVASCRIPT);
      }
    });

    it("should fail when the code snippet code is empty", async () => {
      const updatedSnippetDetails = {
        title: "Introduction to Jest - Updated",
        code: "",
        language: Language.JAVASCRIPT,
        projectId: testProjectId,
      };

      await expect(
        CodeSnippet.updateCodeSnippet(savedSnippetId, updatedSnippetDetails)
      ).rejects.toThrow("Code snippet cannot be empty");
    });
  });

  describe("deleteCodeSnippet", () => {
    let savedSnippetId: string;

    beforeEach(async () => {
      const newSnippetDetails = {
        title: "Introduction to Jest",
        code: "test('adds 1 + 2 to equal 3', () => { expect(1 + 2).toBe(3); });",
        language: Language.JAVASCRIPT,
        projectId: testProjectId,
        owner: new User(),
      };

      const savedSnippet = await CodeSnippet.createCodeSnippet(
        newSnippetDetails
      );
      savedSnippetId = savedSnippet.id;
    });

    it("should delete the code snippet from the database", async () => {
      const deletedSnippet = await CodeSnippet.deleteCodeSnippet(
        savedSnippetId
      );

      expect(deletedSnippet).toBeDefined();
      expect(deletedSnippet.id).toBe(savedSnippetId);
    });

    it("should fail when the ID format is invalid", async () => {
      await expect(CodeSnippet.deleteCodeSnippet("invalid-id")).rejects.toThrow(
        "Invalid UUID"
      );
    });

    it("should fail when the code snippet does not exist", async () => {
      const nonExistentUUID = "123e4567-e89b-12d3-a456-426614174000";
      await expect(
        CodeSnippet.deleteCodeSnippet(nonExistentUUID)
      ).rejects.toThrow("Code snippet not found");
    });
  });
});
