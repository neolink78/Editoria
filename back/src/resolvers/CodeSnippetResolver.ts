import { Arg, Args, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import CodeSnippet from "../entities/codeSnippet/codeSnippet";
import { CreateOrUpdateCodeSnippetArgs } from "../entities/codeSnippet/codeSnippet.args";
import User from "../entities/user/user";

@Resolver()
export class CodeSnippetResolver {
  @Authorized()
  @Mutation(() => CodeSnippet)
  createCodeSnippet(@Args() args: CreateOrUpdateCodeSnippetArgs, @Ctx() { user }: Context) {
    return CodeSnippet.createCodeSnippet({ ...args, owner: user as User });
  }

  @Query(() => [CodeSnippet])
  codeSnippets() {
    return CodeSnippet.getCodeSnippet();
  }

  @Query(() => CodeSnippet)
  codeSnippet(@Arg("id", () => ID) id: string) {
    return CodeSnippet.getCodeSnippetById(id);
  }

  @Mutation(() => CodeSnippet)
  async deleteAd(@Arg("id", () => ID) id: string) {
    return CodeSnippet.deleteCodeSnippet(id);
  }

  @Mutation(() => CodeSnippet)
  updateAd(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateCodeSnippetArgs) {
    return CodeSnippet.updateCodeSnippet(id, args);
  }
}
