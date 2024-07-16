import { Arg, Mutation, Resolver } from "type-graphql";
import User from "../entities/user/user";
import Follower from "../entities/follower/follower";

@Resolver()
class UserResolver {
  @Mutation(() => Boolean)
  async followUser(
    @Arg("followerId") followerId: string,
    @Arg("followingId") followingId: string,
  ): Promise<boolean> {
    try {
      const follower = await User.findOne({
        where: { id: followerId },
        relations: ["following"],
      });
      const following = await User.findOne({
        where: { id: followingId },
        relations: ["followers"],
      });

      if (!follower || !following) {
        throw new Error("User not found");
      }

      follower.following.push(following);
      await follower.save();

      following.followers.push(follower);
      await following.save();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default UserResolver;
