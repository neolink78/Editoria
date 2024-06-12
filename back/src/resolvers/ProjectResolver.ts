import {
  Arg,
  Args,
  Authorized,
  createMethodDecorator,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "..";
import Project from "../entities/project/project";
import { CreateOrUpdateProjectArgs } from "../entities/project/project.args";
import User from "../entities/user/user";

export function ProjectOwner() {
  return createMethodDecorator(async ({ args, context }, next) => {
    if (await (context as Context).user?.isProjectOwner(args.id)) {
      return next();
    }
    throw new Error("You must own the project to perform this action.");
  });
}

@Resolver()
export class ProjectResolver {
  @Authorized()
  @Mutation(() => Project)
  createProject(
    @Args() args: CreateOrUpdateProjectArgs,
    @Ctx() { user }: Context,
  ) {
    return Project.createProject({
      ...args,
      owner: user as User,
      codeSnippetsOwned: [],
    });
  }

  @Query(() => [Project])
  getProjects() {
    return Project.getProject();
  }

  @Query(() => Project)
  getProjectById(@Arg("id", () => ID) id: string) {
    return Project.getProjectById(id);
  }

  @Authorized()
  @ProjectOwner()
  @Mutation(() => Project)
  async deleteProject(@Arg("id", () => ID) id: string) {
    return Project.deleteProject(id);
  }

  @Authorized()
  @ProjectOwner()
  @Mutation(() => Project)
  async updateProject(
    @Arg("id", () => ID) id: string,
    @Args() args: CreateOrUpdateProjectArgs,
    @Ctx() { user }: Context,
  ) {
    return Project.updateProject(id, {
      ...args,
      owner: user as User,
      codeSnippetsOwned: [],
    });
  }

  @Authorized()
  @Query(() => [Project])
  async getOwnProject(@Ctx() { user }: Context) {
    if (!user) {
      throw new Error("User not found");
    }
    const projects = await Project.getProjectsByUserId(user.id);
    return projects;
  }
}
