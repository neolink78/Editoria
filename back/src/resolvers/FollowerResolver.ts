import {
  Arg,
  Authorized,
  Int,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import User from "../entities/user/user";
import Follower from "../entities/follower/follower";
import { Context } from "..";
import Comment from "../entities/comment/comment";
import Like from "../entities/like/like";

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

  @Query(() => [Follower])
  async getFollowings(
    @Ctx() { user }: Context,
    @Arg("limit", () => Int, {nullable: true}) limit?: number,
    @Arg("offset", () => Int, {nullable: true}) offset?: number,
  ) {
    if (!user) throw new Error("Authentication required");
    const followingsUserId: string[] = []
    const filteredData: any = []
    const followings = await Follower.getFollowings(user);
   followings.map( following => followingsUserId.push(following.following.id))
    //console.log(followingsUserId)
    await Promise.all(followingsUserId.map(async userId => {
      const comments = await Comment.getCommentByUserId(userId, limit, offset)
      return filteredData.push(comments)
    }))
    await Promise.all(followingsUserId.map(async userId => {
      const likes = await Like.likedProjects(userId, limit, offset)
      return filteredData.push(likes)
    }))

    console.log(filteredData.flat())
    return followings
  }
}

export default FollowerResolver;
