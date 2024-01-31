import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import CodeSnippet from "../entities/codeSnippet/codeSnippet";
import { CreateOrUpdateCodeSnippetArgs } from "../entities/codeSnippet/codeSnippet.args";
// import { CreateCodeSnippetInput, UpdateCodeSnippetInput } from './codeSnippetInputs';
// import { CodeSnippetService } from './codeSnippetService';
// import { MyContext } from '../types';

@Resolver()
export class CodeSnippetResolver {
  @Mutation(() => CodeSnippet)
  createCodeSnippet(@Args() args: CreateOrUpdateCodeSnippetArgs) {
    return CodeSnippet.createCodeSnippet(args);
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
