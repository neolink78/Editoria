import {
  Mutation,
  Resolver,
  Ctx,
  Authorized,
  Args,
  Query,
  Arg,
  createMethodDecorator,
  ID,
} from "type-graphql";
import { Context } from "..";
import Comment from "../entities/comment/comment";
import { CreateOrUpdateCommentArgs } from "../entities/comment/comment.args";

export function CommentOwner() {
  return createMethodDecorator(async ({ args, context }, next) => {
    if (await (context as Context).user?.isCommentOwner(args.id)) {
      return next();
    }
    throw new Error("You must own the ad to perform this action.");
  });
}

@Resolver()
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Args(() => CreateOrUpdateCommentArgs) args: CreateOrUpdateCommentArgs,
    @Ctx() { user }: Context
  ): Promise<Comment> {
    if (!user) {
      throw new Error("Authentication required");
    }

    return Comment.createComment(args);
  }

  @Authorized()
  @Query(() => [Comment])
  async getCommentsbyProjectId(
    @Arg("projectId") projectId: string
  ): Promise<Comment[]> {
    return await Comment.getCommentByProjectId(projectId);
  }

  @Authorized()
  @Query(() => [Comment])
  async getCommentsByUserId(
    @Arg("userId", () => ID) userId: string
  ): Promise<Comment[]> {
    return await Comment.getCommentByUserId(userId);
  }

  @Authorized()
  @CommentOwner()
  @Mutation(() => Comment)
  async updateComment(
    @Arg("id", () => ID) id: string,
    @Arg("content") content: string
  ): Promise<Comment> {
    return Comment.updateComment(id, content);
  }

  @Authorized()
  @Query(() => Comment)
  async getCommentById(@Arg("id", () => ID) id: string): Promise<Comment> {
    return Comment.getCommentById(id);
  }

  @Authorized()
  @CommentOwner()
  @Mutation(() => Comment)
  async deleteComment(@Arg("id", () => ID) id: string): Promise<Comment> {
    return Comment.deleteComment(id);
  }
}

export default CommentResolver;
