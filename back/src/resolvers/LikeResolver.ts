import { Arg, Args, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import Project from "../entities/project/project";
import User from "../entities/user/user";
import Like from "../entities/like/like";
import { ToggleLikeArgs } from "../entities/like/like.args";

@Resolver()
export class LikeResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async toggleLike(@Args() args: ToggleLikeArgs, @Ctx() { user }: Context): Promise<boolean> {
    const { userId, projectId } = args;

    const userEntity = await User.findOne({ where: { id: userId } });
    const projectEntity = await Project.findOne({ where: { id: projectId } });

    if (!userEntity || !projectEntity) {
      return false;
    }

    const like = await Like.findOne({ where: { user: userEntity, project: projectEntity } });

    if (like) {
      await Like.remove(like);
      return false;
    } else {
      const newLike = Like.create({ user: userEntity, project: projectEntity });
      await newLike.save();
      return true;
    }
  }

  @Query(() => [Project])
  async likedProjects(@Ctx() { user }: Context): Promise<Project[]> {
    if (!user) {
        throw new Error("Authentication required");
      }
    const userEntity = await User.findOne({ where: { id: user.id }, relations: ["likedProjects"] });
    return userEntity ? userEntity.likedProjects : [];
  }

  @Query(() => [User])
  async projectLikes(@Arg("projectId", () => ID) projectId: string): Promise<User[]> {
    const project = await Project.findOne({ where: { id: projectId }, relations: ["likedBy"] });
    return project ? project.likedBy : [];
  }
}
