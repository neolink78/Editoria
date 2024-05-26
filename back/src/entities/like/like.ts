import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import User from "../user/user";
import Project from "../project/project";

@Entity()
@ObjectType()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Project, (project) => project.likes, {
    onDelete: "CASCADE",
  })
  @Field(() => Project)
  project!: Project;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  static async toggleLike(userId: string, projectId: string): Promise<boolean> {
    const userEntity = await User.findOne({ where: { id: userId } });
    const projectEntity = await Project.findOne({ where: { id: projectId } });

    if (!userEntity || !projectEntity) {
      throw new Error("User or Project not found");
    }

    const like = await Like.findOne({
      where: {
        user: { id: userId },
        project: { id: projectId },
      },
    });

    if (like) {
      await Like.remove(like);
      return false;
    } else {
      const newLike = Like.create({ user: userEntity, project: projectEntity });
      await newLike.save();
      return true;
    }
  }
}

export default Like;
