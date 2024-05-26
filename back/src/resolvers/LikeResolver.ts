import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "..";
import Project from "../entities/project/project";
import User from "../entities/user/user";
import Like from "../entities/like/like";
import { ToggleLikeArgs } from "../entities/like/like.args";

@Resolver()
export class LikeResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async toggleLike(
    @Args() args: ToggleLikeArgs,
    @Ctx() { user }: Context
  ): Promise<boolean> {
    if (!user) {
      throw new Error("Authentication required");
    }
    return Like.toggleLike(args.userId, args.projectId);
  }

  @Query(() => [Project])
  async likedProjects(@Ctx() { user }: Context): Promise<Project[]> {
    if (!user) {
      throw new Error("Authentication required");
    }

    const likes = await Like.find({
      where: { user: { id: user.id } },
      relations: ["project"],
    });

    return likes.map((like) => like.project);
  }

  @Query(() => [User])
  async projectLikes(
    @Arg("projectId", () => ID) projectId: string
  ): Promise<User[]> {
    const likes = await Like.find({
      where: { project: { id: projectId } },
      relations: ["user"],
    });

    return likes.map((like) => like.user);
  }
}
