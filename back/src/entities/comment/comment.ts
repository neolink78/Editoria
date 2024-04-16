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
  projectId: string;
  userId: string;
};

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  content!: string;

  @ManyToOne(() => Project, (project) => project.comments, { eager: true })
  @Field(() => Project)
  project!: Project;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @Field(() => User)
  user!: User;

  constructor(comment?: CommentArgs) {
    super();

    if (comment) {
      this.content = comment.content;
    }
  }

  static async createComment(comment: CommentArgs): Promise<Comment> {
    const project = await Project.findOne({ where: { id: comment.projectId } });
    const user = await User.findOne({ where: { id: comment.userId } });

    if (!project || !user) {
      throw new Error("Project or User not found.");
    }
    const newComment = new Comment(comment);
    return await Comment.save(newComment);
  }

  static async getCommentByProjectId(projectId: string): Promise<Comment[]> {
    return await Comment.find({
      where: { project: { id: projectId } },
    });
  }
}

export default Comment;
