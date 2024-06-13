import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateOrUpdateCommentArgs } from "./comment.args";
import Project from "../project/project";
import User from "../user/user";

export type CommentArgs = CreateOrUpdateCommentArgs & {
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

  //TODO: Add createdAt field
  // @Column()
  // @Field()
  // createdAt!: Date;

  @ManyToOne(() => Project, (project) => project.comments)
  @Field(() => Project)
  project!: Project;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User)
  owner!: User;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @CreateDateColumn()
  @Field()
  updatedAt!: Date;

  constructor(comment?: CommentArgs) {
    super();

    if (comment) {
      this.content = comment.content;
      this.owner = comment.owner;
    }
  }

  static async createComment(
    commentArgs: CommentArgs
  ): Promise<Comment> {
    const project = await Project.findOne({
      where: { id: commentArgs.projectId },
    });

    if (!project) {
      throw new Error("Project or User not found.");
    }
    const newComment = new Comment(commentArgs);
    newComment.project = project;

    return await Comment.save(newComment);
  }

  static async updateComment(
    commentId: string,
    content: string
  ): Promise<Comment> {
    const comment = await Comment.getCommentById(commentId);

    comment.content = content;
    comment.updatedAt = new Date();
    return await Comment.save(comment);
  }

  static async getCommentByProjectId(projectId: string): Promise<Comment[]> {
    return await Comment.find({
      where: { project: { id: projectId } },
      relations: ["owner", "project"],
    });
  }

  static async getCommentByUserId(userId: string): Promise<Comment[]> {
    return await Comment.find({
      where: { owner: { id: userId } },
      relations: ["owner", "project"],
    });
  }

  static async getCommentById(commentId: string): Promise<Comment> {
    const comment = await Comment.findOne({
      where: { id: commentId },
      relations: ["owner", "project"],
    });
    if (!comment) {
      throw new Error("Comment not found.");
    }
    return comment;
  }

  static async deleteComment(commentId: string): Promise<Comment> {
    const comment = await Comment.getCommentById(commentId);
    await Comment.delete(commentId);
    return comment;
  }
}

export default Comment;
