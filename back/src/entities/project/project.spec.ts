import { getDataSource } from "../../database";
import Project from "./project";
import User from "../user/user";
import { DataSource } from "typeorm";

describe("Project", () => {
  let database: DataSource;
  let testUserId: string;

  beforeAll(async () => {
    database = await getDataSource();
    const testUser = await database.getRepository(User).save({
      email: "user@example.com",
      username: "testuser",
      hashedPassword: "hashedpassword123",
    });
    testUserId = testUser.id;
  });

  afterAll(async () => {
    await database.destroy();
  });

  //   describe("createProject", () => {
  //     it("should create a new project successfully", async () => {
  //       const projectData: {title: string;
  //         is_public: boolean;
  //         owner: User | null;
  //         collaboratorsIds: string[];

  //     } = {
  //         title: "New Project",
  //         is_public: true,
  //         owner: await database.getRepository(User).findOneBy({ id: testUserId }),
  //         collaboratorIds: []
  //       };

  //       console.log(projectData);

  //       const project = await Project.createProject(projectData);
  //       expect(project).toBeDefined();
  //       expect(project.title).toBe(projectData.title);
  //       expect(project.is_public).toBe(projectData.is_public);
  //       expect(project.owner.id).toBe(testUserId);
  //     });
  //   });
});
