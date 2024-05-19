import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CodeSnippet from "../codeSnippet/codeSnippet";
import Comment from "../comment/comment";
import User from "../user/user";
import { CreateOrUpdateProjectArgs } from "./project.args";

export type ProjectArgs = CreateOrUpdateProjectArgs & {
  owner: User;
  codeSnippetsOwned: CodeSnippet[];
};

@Entity()
@ObjectType()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column({ default: "" })
  @Field()
  description!: string;

  @Column({ default: true })
  @Field()
  is_public!: boolean;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @CreateDateColumn()
  @Field()
  updatedAt!: Date;

  @OneToMany(() => CodeSnippet, (codeSnippet) => codeSnippet.project, {
    eager: true,
    onDelete: "CASCADE",
  })
  @Field((type) => [CodeSnippet])
  codeSnippetsOwned!: CodeSnippet[];

  @OneToMany(() => Comment, (comment) => comment.project, { eager: true })
  @Field(() => [Comment])
  comments!: Comment[];

  @ManyToOne(() => User, (user) => user.projectsOwned, { eager: true })
  @Field(() => User)
  owner!: User;

  @ManyToMany(() => User, (collaborators) => collaborators.projects)
  collaborators!: User[];

  @ManyToMany(() => User, (user) => user.likedProjects)
  @Field(() => [User])
  likedBy!: User[];

  constructor(project?: ProjectArgs) {
    super();

    if (project) {
      this.title = project.title;
      this.description = project.description;
      this.is_public = project.is_public;
      this.owner = project.owner;
      this.codeSnippetsOwned = [];
    }
  }

  static async createProject(project: ProjectArgs): Promise<Project> {
    const newProject = new Project(project);
    if (project.title === "") {
      throw new Error("Title is required");
    }

    return await Project.save(newProject);
  }

  static async getProject(): Promise<Project[]> {
    return await Project.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  static async getProjectById(id: string): Promise<Project> {
    const project = await Project.findOne({ where: { id } });
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  static async deleteProject(id: string): Promise<Project> {
    const project = await Project.getProjectById(id);
    await Project.delete(id);
    return project;
  }

  static async updateProject(
    id: string,
    partialProject: ProjectArgs
  ): Promise<Project> {
    const project = await Project.getProjectById(id);
    Object.assign(project, partialProject, { updatedAt: new Date() });

    if (partialProject.title === "") {
      throw new Error("Title cannot be empty");
    }
    if (partialProject.collaboratorIds) {
      project.collaborators = await Promise.all(
        partialProject.collaboratorIds.map(User.getUserById)
      );
    }

    await project.save();
    project.reload();
    return project;
  }
}

export default Project;
