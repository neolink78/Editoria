import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import User from "../user/user";
@Entity()
@ObjectType()
class Follower extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.followings)
  @Field(() => User)
  follower!: User;

  @ManyToOne(() => User, (user) => user.followers)
  @Field(() => User)
  following!: User;

  static async toggleFollow(follower: User, followingId: string) {
    const following = await User.findOne({
      where: { id: followingId },
    });
    if (follower.id === followingId)
      throw new Error("You can't follow yourself");
    if (!following) throw new Error("following user not found");
    const follow = await Follower.findOne({
      where: {
        follower: { id: follower.id },
        following: { id: followingId },
      },
    });
    if (follow) {
      await Follower.remove(follow);
      return false;
    } else {
      const onFollow = await Follower.create({
        follower: follower,
        following: following,
      });
      await onFollow.save();
      return true;
    }
  }

  static async getFollowers(followingId: string) {
    const followers = await Follower.find({
      where: { following: { id: followingId } },
      relations: ["following", "follower"],
    });
    return followers;
  }

  static async getFollowings(follower: User) {
    const followings = await Follower.find({
      where: {
        follower: { id: follower.id },
      },
      relations: [
        "following",
        "follower",
        "following.likes",
        "following.likes.project",
        "following.comments",
        "following.comments.project",
      ],
    });
    console.log(followings)
    return followings;
  }
}

export default Follower;
