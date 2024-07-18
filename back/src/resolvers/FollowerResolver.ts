import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/user/user";
import Follower from "../entities/follower/follower";
import { Context } from "..";

@Resolver()
class FollowerResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async followUser(
    @Ctx() { user }: Context,
    @Arg("followingId") followingId: string,
  ): Promise<boolean> {
    if (!user) throw new Error("authentication required");
    return await Follower.toggleFollow(user, followingId);
  }

  @Query(() => [Follower])
  async getFollowers(
    @Ctx() { user }: Context,
    @Arg("followingId") followingId: string,
  ) {
    if (!user) throw new Error("Authentication required");
    return await Follower.getFollowers(followingId);
  }
}

export default FollowerResolver;
