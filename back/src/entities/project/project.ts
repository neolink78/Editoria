import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CodeSnippet from "../codeSnippet/codeSnippet";
import User from "../user/user";
import { CreateOrUpdateProjectArgs } from "./project.args";

type ProjectArgs = CreateOrUpdateProjectArgs & {
  owner: User;
};

@Entity()
@ObjectType()
 class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string

  @Column()
  @Field()
  title!: string

  @Column({ default: true })
  @Field()
  is_public!: boolean

  @CreateDateColumn()
  @Field()
  createdAt!: Date;
  
  @CreateDateColumn()
  @Field()
  updatedAt!: Date;

  @OneToMany(() => CodeSnippet, (codeSnippet) => codeSnippet.project)
  codeSnippetsOwned!: CodeSnippet[]

  @ManyToOne(() => User, (user) => user.projectsOwned, { eager: true })
  @Field()
  owner!: User;
  
  @ManyToMany(() => User, (collaborators) => collaborators.projects)
  collaborators!: User[];

  constructor(project?: ProjectArgs) {
    super();

    if (project) {
      this.title = project.title;
      this.is_public = project.is_public;
      this.owner = project.owner;
    }
  }

  static async createProject(project: ProjectArgs): Promise<Project> {
    const newProject = new Project(project);
    
    return await Project.save(newProject);
  }

  static async getProject(): Promise<Project[]> {
    return await Project.find();
  }

  static async getProjectById(id: string): Promise<Project> {
    const project = await Project.findOne({ where: { id } });
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  static async deleteProject(id: string): Promise<Project> {
    const project = await Project.getProjectById(id);
    await Project.delete(id);
    return project;
  }
  
  static async updateProject(id: string, partialProject: CreateOrUpdateProjectArgs): Promise<Project> {
    const project = await Project.getProjectById(id);
    Object.assign(project, partialProject, { updatedAt: new Date() });
    
    if (partialProject.collaboratorIds) {
      project.collaborators = await Promise.all(partialProject.collaboratorIds.map(User.getUserById));
    }

    await project.save();
    project.reload()
    return project;
  }

 }

 export default Project;
