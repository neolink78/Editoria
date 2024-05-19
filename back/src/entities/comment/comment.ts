import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateOrUpdateCommentArgs } from "./comment.args";
import Project from "../project/project";
import User from "../user/user";

export type CommentArgs = CreateOrUpdateCommentArgs & {
  project: Project;
  owner: User;
};

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  content!: string;

  @ManyToOne(() => Project, (project) => project.comments, { eager: true })
  @Field(() => Project)
  project!: Project;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @Field(() => User)
  owner!: User;

  constructor(comment?: CommentArgs) {
    super();

    if (comment) {
      this.content = comment.content;
      this.owner = comment.owner;
      this.project = comment.project;
    }
  }

  static async createComment(comment: CommentArgs): Promise<Comment> {
    const project = await Project.findOne({
      where: { id: comment?.project?.id },
    });
    const user = await User.findOne({ where: { id: comment?.owner.id } });

    if (!project || !user) {
      throw new Error("Project or User not found.");
    }
    const newComment = new Comment({
      ...comment,
      project,
      owner: user,
    });
    return await Comment.save(newComment);
  }

  static async getCommentByProjectId(projectId: string): Promise<Comment[]> {
    return await Comment.find({
      where: { project: { id: projectId } },
    });
  }

  static async getCommentByUserId(userId: string): Promise<Comment[]> {
    return await Comment.find({
      where: { owner: { id: userId } },
    });
  }
}

export default Comment;
