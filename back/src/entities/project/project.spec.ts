import { getDataSource } from "../../database";
import Project from "./project";
import User from "../user/user";
import { DataSource } from "typeorm";

describe("Project", () => {
  let database: DataSource;
  let testUser: User;

  beforeAll(async () => {
    database = await getDataSource();
    testUser = await database.getRepository(User).save({
      email: `testuser_${Date.now()}@example.com`,
      password: "securepassword123",
      username: `testuser_${Date.now()}`,
      hashedPassword: "somehashedpassword",
    });
  });

  afterAll(async () => {
    await database.destroy();
  });

  describe("createProject", () => {
    it("should create a new project successfully", async () => {
      const projectData = {
        title: "JAVASCRIPT LOADER",
        is_public: true,
        description:
          "This is a great loader, I want to display my skills and this is the right way to do it, LETS GO",
        owner: testUser,
        collaboratorIds: [],
      };

      const project = await Project.createProject(projectData);
      expect(project).toBeDefined();
      expect(project.title).toBe(projectData.title);
      expect(project.is_public).toBe(projectData.is_public);
      expect(project.description).toBe(projectData.description);
      expect(project.owner).toBeDefined();
      expect(project.owner.id).toBe(testUser.id);
    });

    it("should retrieve all projects successfully", async () => {
      const projects = await Project.getProject();
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);
    });
  });
});
