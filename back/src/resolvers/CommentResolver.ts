import {
  Mutation,
  Resolver,
  Ctx,
  Authorized,
  Args,
  Query,
  Arg,
} from "type-graphql";
import { Context } from "..";
import Comment, { CommentArgs } from "../entities/comment/comment";
import { CreateOrUpdateCommentArgs } from "../entities/comment/comment.args";
import User from "../entities/user/user";

@Resolver()
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Args(() => CreateOrUpdateCommentArgs) args: CommentArgs,
    @Ctx() { user }: Context
  ): Promise<Comment> {
    if (!user) {
      throw new Error("Authentication required");
    }

    return Comment.createComment({ ...args, userId: user.id});
  }

  @Query(() => [Comment])
  async getCommentsbyProjectId(
    @Arg("projectId", () => String) projectId: string
  ): Promise<Comment[]> {
    return Comment.getCommentByProjectId(projectId);
  }

  // Optional: Fetch comments by user
  //   @Query(() => [Comment])
  //   async getCommentsByUser(@Arg("userId") userId: string): Promise<Comment[]> {
  //     const user = await User.findOne(userId, { relations: ["comments"] });

  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     return user.comments;
  //   }
}

export default CommentResolver;
