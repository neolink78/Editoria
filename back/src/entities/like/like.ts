import {
  BaseEntity,
  Entity,


  ManyToOne, PrimaryGeneratedColumn, CreateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import User from "../user/user";
import Project from "../project/project";

@Entity()
@ObjectType()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() =>     ID)
  id!: string;

  @ManyToOne(() =>     User, (user) => user.
  likes, {
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Project, (project) => project.
  
  likes, {
    onDelete:       "CASCADE",
  })
  @Field(() => Project)
  project!: Project;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  static async toggleLike(user:User, projectId: string): Promise<boolean> {
    const projectEntity = await Project.findOne({ where: { id: projectId } });

    if (!projectEntity) {
      throw new Error("User or Project not found");
    }

    const like = await Like.findOne({
      where: {
        user: { id: user.id },
        project: { id: projectId },
      },
    });

    if (like) {
      await Like.remove(like);
      return false;
    } else {
      const newLike = Like.create({ user: user, project: projectEntity });
      await newLike.save();
      return true;
    }
  }

  static async likedProjects(userId: string): Promise<Project[]> {
    const likes = await Like.find({
      where: { user: { id: userId } },
      relations: ["project"],
    });

    return likes.map((like) => like.project);
  }

  static async projectLikes(projectId: string): Promise<User[]> {
    const likes = await Like.find({
      where: { project: { id: projectId } },
      relations: ["user"],
    });

    return likes.map((like) => like.user);
  }
}

export default Like;
