import {
  Arg,
  Args,
  Authorized,
  createMethodDecorator,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "..";
import Project, {
  ProjectPaginationResponse,
} from "../entities/project/project";
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

  @Query(() => ProjectPaginationResponse)
  async getProjects(
    @Arg("limit", () => Int, { defaultValue: 10, nullable: true })
    limit: number,
    @Arg("offset", () => Int, { defaultValue: 0, nullable: true })
    offset: number,
    @Arg("sortBy", () => String, { defaultValue: "createdAt", nullable: true })
    sortBy: string,
  ): Promise<ProjectPaginationResponse> {
    const [projects, totalCount] = await Project.getProjects(
      limit,
      offset,
      sortBy,
    );
    return {
      projects,
      totalCount,
    };
  }

  @Query(() => ProjectPaginationResponse)
  async getProjectsByUserId(
    @Arg("userId", () => ID) userId: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int) offset: number,
  ): Promise<ProjectPaginationResponse> {
    const [projects, totalCount] = await Project.getProjectsByUserId(
      userId,
      limit,
      offset,
    );
    return {
      projects,
      totalCount,
    };
  }

  @Query(() => Project)
  getProjectById(@Arg("id", () => ID) id: string) {
    return Project.getProjectById(id);
  }

  @Query(() => [Project])
  searchProjects(@Arg("query") query: string) {
    return Project.searchProjects(query);
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
  ) {
    return Project.updateProject(id, {
      ...args,
    });
  }

  @Authorized()
  @Query(() => ProjectPaginationResponse)
  async getOwnProject(
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int) offset: number,
    @Ctx() { user }: Context,
  ): Promise<ProjectPaginationResponse> {
    if (!user) {
      throw new Error("User not found");
    }
    const [projects, totalCount] = await Project.getProjectsByUserId(
      user.id,
      limit,
      offset,
    );
    return {
      projects,
      totalCount,
    };
  }
}
