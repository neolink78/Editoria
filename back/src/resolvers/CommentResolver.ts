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
