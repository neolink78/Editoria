import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  FindManyOptions,
  ILike,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CodeSnippet from "../codeSnippet/codeSnippet";
import Comment from "../comment/comment";
import Like from "../like/like";
import User from "../user/user";
import { CreateOrUpdateProjectArgs } from "./project.args";
import { getCache } from "../../cache";

export type ProjectArgs = CreateOrUpdateProjectArgs & {
  owner: User;
  codeSnippetsOwned: CodeSnippet[];
};

@ObjectType()
export class ProjectPaginationResponse {
  @Field(() => [Project])
  projects!: Project[];

  @Field()
  totalCount!: number;
}

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

  @OneToMany(() => Comment, (comment) => comment.project, {
    eager: true,
    onDelete: "CASCADE",
  })
  @Field(() => [Comment])
  comments!: Comment[];

  @ManyToOne(() => User, (user) => user.projectsOwned, { eager: true })
  @Field(() => User)
  owner!: User;

  @ManyToMany(() => User, (collaborators) => collaborators.projects)
  collaborators!: User[];

  @OneToMany(() => Like, (like) => like.project, {
    eager: true,
  })
  @Field(() => [Like])
  likes!: Like[];

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

  static async getProjects(
    limit: number = 8,
    offset: number = 0,
    sortBy: string = "createdAt",
    search?: string,
  ): Promise<[Project[], number]> {
    const cache = await getCache();

    const cacheKey = `projects_${search || "all"}_${limit}_${offset}_${sortBy}`;

    const cachedResult = await cache.get(cacheKey);
    if (cachedResult) {
      console.log(`Cache hit for query: ${cacheKey}`);
      return JSON.parse(cachedResult);
    }

    console.log(`Cache miss for query: ${cacheKey}`);

    const options: FindManyOptions<Project> = {
      skip: offset,
      take: limit,
      order: {
        [sortBy === "likes" ? "createdAt" : sortBy]: "DESC",
      },
    };

    if (search) {
      options.where = [
        { title: ILike(`%${search}%`) },
        { description: ILike(`%${search}%`) },
      ];
    }

    const [projects, totalCount] = await this.findAndCount(options);

    if (sortBy === "likes") {
      projects.sort((a, b) => b.likes.length - a.likes.length);
    }

    cache.set(cacheKey, JSON.stringify([projects, totalCount]), { EX: 600 });

    return [projects, totalCount];
  }

  static async getProjectsByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<[Project[], number]> {
    const [projects, totalCount] = await Project.findAndCount({
      where: { owner: { id: userId } },
      take: limit,
      skip: offset,
      order: {
        createdAt: "DESC",
      },
      relations: { comments: true },
    });
    return [projects, totalCount];
  }

  static async getProjectById(id: string): Promise<Project> {
    const project = await Project.findOne({
      where: { id },
      relations: { owner: true, codeSnippetsOwned: true },
    });
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
    partialProject: CreateOrUpdateProjectArgs,
  ): Promise<Project> {
    const project = await Project.getProjectById(id);
    Object.assign(project, partialProject, { updatedAt: new Date() });
    if (partialProject.title === "") {
      throw new Error("Title cannot be empty");
    }
    if (partialProject.collaboratorIds) {
      project.collaborators = await Promise.all(
        partialProject.collaboratorIds.map(User.getUserById),
      );
    }
    await project.save();
    project.reload();
    return project;
  }

  static async searchProjects(query: string): Promise<Project[]> {
    const cache = await getCache();

    const cachedResult = await cache.get(query);
    if (cachedResult) {
      console.log(`Cache hit for query: ${query}`);
      return JSON.parse(cachedResult);
    }

    console.log(`Cache miss for query: ${query}`);
    const databaseResult = await Project.find({
      where: [
        { title: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
    });

    cache.set(query, JSON.stringify(databaseResult), { EX: 600 });

    return databaseResult;
  }
}

export default Project;
