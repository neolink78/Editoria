import { getDataSource } from "../../database";
import Project, { ProjectArgs } from "./project";
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
    let projectId: string;

    let fetchProjectId: string;
    let projectData: ProjectArgs;
    beforeEach(async () => {
      projectData = {
        title: "JAVASCRIPT NAVBAR",
        is_public: true,
        description: "This is a great navbar",
        owner: testUser,
        codeSnippetsOwned: [codesnippet],
        collaboratorIds: [],
      };
    });

    it("should create a new project successfully", async () => {
      const project = await Project.createProject(projectData);
      projectId = project.id;

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
        .findOne({ where: { title: "JAVASCRIPT NAVBAR" } });
      fetchProjectId = fetchedProject!.id;

      expect(fetchedProject).toBeDefined();
      expect(fetchedProject!.id).toBeDefined();
      expect(fetchedProject!.description).toBe("This is a great navbar");
    });

    it("should'nt be able to save a project without a title", async () => {
      await expect(
        Project.createProject({
          title: "",
          is_public: true,
          description: "This is a great loader",
          owner: testUser,
          collaboratorIds: [],
          codeSnippetsOwned: [codesnippet],
        }),
      ).rejects.toThrow("Title is required");
    });
  });

  describe("updateProject", () => {
    let updateProjectId: string;
    beforeEach(async () => {
      if (!updateProjectId) {
        const project = await Project.createProject({
          title: "Temporary Project",
          is_public: true,
          description: "Temp project for update tests",
          owner: testUser,
          collaboratorIds: [],
          codeSnippetsOwned: [codesnippet],
        });
        updateProjectId = project.id;
      }
    });

    it("should update a project successfully", async () => {
      const updatedProject = await Project.updateProject(updateProjectId, {
        title: "HTML LOADER",
        is_public: true,
        description: "This is a bad loader, don't look please",
        collaboratorIds: [],
      });

      expect(updatedProject).toBeDefined();
      expect(updatedProject.owner).toBeDefined();
      expect(updatedProject.owner.id).toBe(testUser.id);
      expect(updatedProject.title).toBe("HTML LOADER");
    });

    it("should retrieve the updated project from database with correct properties", async () => {
      const fetchedProject = await database
        .getRepository(Project)
        .findOne({ where: { id: updateProjectId } });

      expect(fetchedProject).toBeDefined();
      expect(fetchedProject!.id).toBeDefined();
      expect(fetchedProject!.description).toBe(
        "This is a bad loader, don't look please",
      );
      expect(fetchedProject!.title).toBe("HTML LOADER");
    });

    it("should not be able to update a project with a wrong id format", async () => {
      await expect(
        Project.updateProject("123", {
          title: "JAVASCRIPT LOADER",
          is_public: true,
          description:
            "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO",
          collaboratorIds: [],
        })
      ).rejects.toThrow('invalid input syntax for type uuid: "123"');
    });

    it("should not be able to update a project with a wrong id", async () => {
      await expect(
        Project.updateProject("123e4567-e89b-12d3-a456-426614174000", {
          title: "JAVASCRIPT LOADER",
          is_public: true,
          description:
            "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO",
          collaboratorIds: [],
        })
      ).rejects.toThrow("Project not found");
    });

    it("should not be able to update a project with an empty title", async () => {
      await expect(
        Project.updateProject(updateProjectId, {
          title: "",
          is_public: true,
          description:
            "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO",
          collaboratorIds: [],
        })
      ).rejects.toThrow("Title cannot be empty");
    });
  });

  describe("deleteProject", () => {
    let deleteProjectId: string;
    beforeEach(async () => {
      if (!deleteProjectId) {
        const project = await Project.createProject({
          title: "Temporary Project",
          is_public: true,
          description: "Temp project for delete tests",
          owner: testUser,
          collaboratorIds: [],
          codeSnippetsOwned: [codesnippet],
        });
        deleteProjectId = project.id;
      }
    });

    it("should delete a project successfully", async () => {
      const deletedProject = await Project.deleteProject(deleteProjectId);

      expect(deletedProject).toBeDefined();
      expect(deletedProject.id).toBe(deleteProjectId);
    });

    it("should not be able to delete a project with a wrong id format", async () => {
      await expect(Project.deleteProject("123")).rejects.toThrow(
        'invalid input syntax for type uuid: "123"',
      );
    });

    it("should not be able to delete a project with a wrong id", async () => {
      await expect(
        Project.deleteProject("123e4567-e89b-12d3-a456-426614174000"),
      ).rejects.toThrow("Project not found");
    });
  });
});
