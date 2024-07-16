import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import User from "../user/user";
@Entity()
@ObjectType()
class Follower {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @ManyToOne(() => User, (user) => user.following)
  @Field(() => User)
  follower!: User;

  @ManyToOne(() => User, (user) => user.followers)
  @Field(() => User)
  following!: User;
}

export default Follower;
