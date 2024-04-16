import { Arg, Args, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import CodeSnippet from "../entities/codeSnippet/codeSnippet";
import Project from "../entities/project/project";
import { CreateOrUpdateProjectArgs } from "../entities/project/project.args";
import User from "../entities/user/user";

@Resolver()
export class ProjectResolver {
  @Authorized()
  @Mutation(() => Project)
  createProject(@Args() args: CreateOrUpdateProjectArgs, @Ctx() { user }: Context) {
    return Project.createProject({ ...args, owner: user as User });
  }

  @Query(() => [Project])
  getProjects() {
    return Project.getProject();
  }

  @Query(() => Project)
  getProjectById(@Arg("id", () => ID) id: string) {
    return Project.getProjectById(id);
  }

  @Mutation(() => Project)
  async deleteProject(@Arg("id", () => ID) id: string) {
    return Project.deleteProject(id);
  }

  @Mutation(() => Project)
  updateProject(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateProjectArgs) {
    return Project.updateProject(id, args);
  }
}
