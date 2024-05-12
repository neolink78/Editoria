import { getDataSource } from "../../database";
import Project from "./project";
import User from "../user/user";
import { DataSource } from "typeorm";
import CodeSnippet from "../codeSnippet/codeSnippet";

describe("Project", () => {
  let database: DataSource;
  let testUser: User;
  let codesnippet: CodeSnippet;

  beforeAll(async () => {
    database = await getDataSource();
    testUser = await database.getRepository(User).save({
      email: `testuser_${Date.now()}@example.com`,
      password: "securepassword123",
      username: `testuser_${Date.now()}`,
      hashedPassword: "somehashedpassword",
    });

    codesnippet = await database.getRepository(CodeSnippet).save({
      title: "JAVASCRIPT LOADER",
      code: "console.log('Hello World')",
      owner: testUser,
    });
    // let codeSnippetId = codesnippet.id;
  });

  afterAll(async () => {
    await database.destroy();
  });

  describe("createProject", () => {
    let fetchProjectId: string;

    it("should create a new project successfully", async () => {
      let projectData = {
        title: "JAVASCRIPT LOADER",
        is_public: true,
        description:
          "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO",
        owner: testUser,
        collaboratorIds: [],
        codeSnippetsOwned: [codesnippet],
      };

      const project = await Project.createProject(projectData);

      expect(project).toBeDefined();
      expect(project.title).toBe(projectData.title);
      expect(project.is_public).toBe(projectData.is_public);
      expect(project.description).toBe(projectData.description);
      expect(project.owner).toBeDefined();
      expect(project.owner.id).toBe(testUser.id);
    });

    it("should retrieve projectData from db successfully", async () => {
      const fetchedProject = await database
        .getRepository(Project)
        .findOne({ where: { title: "JAVASCRIPT LOADER" } });
      fetchProjectId = fetchedProject!.id;

      expect(fetchedProject).toBeDefined();
      expect(fetchedProject!.id).toBeDefined();
      expect(fetchedProject!.description).toBe(
        "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO"
      );
    });

    it("should delete projectData from db successfully", async () => {
      const fetchProject = await database
        .getRepository(Project)
        .findOne({ where: { id: fetchProjectId } });

      const deletedProject = await Project.deleteProject(fetchProject!.id);

      expect(deletedProject).toBeDefined();
      expect(deletedProject.id).toBe(fetchProject!.id);
    });

    it("should'nt be able to save a project without a codesnippet", async () => {
      await expect(
        Project.createProject({
          title: "JAVASCRIPT LOADER",
          is_public: true,
          description:
            "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO",
          owner: testUser,
          collaboratorIds: [],
          codeSnippetsOwned: [],
        })
      ).rejects.toThrow("CodeSnippet not found");
    });
  });
});
