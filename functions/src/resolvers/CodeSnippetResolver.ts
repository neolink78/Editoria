import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { CodeSnippet } from '../entities/codeSnippet';
import { CreateCodeSnippetInput, UpdateCodeSnippetInput } from './codeSnippetInputs';
// import { CodeSnippetService } from './codeSnippetService';
// import { MyContext } from '../types';

@Resolver(CodeSnippet)
export class CodeSnippetResolver {
  constructor(
    // private readonly codeSnippetService: CodeSnippetService
    ) {}

  @Mutation(() => CodeSnippet)
  @Authorized() // You can add authorization logic here
  async createCodeSnippet(@Arg('data') data: CreateCodeSnippetInput): Promise<CodeSnippet> {
    return this.codeSnippetService.createCodeSnippet(data);
  }

  @Mutation(() => CodeSnippet)
  @Authorized() // You can add authorization logic here
  async updateCodeSnippet(@Arg('id') id: number, @Arg('data') data: UpdateCodeSnippetInput): Promise<CodeSnippet | null> {
    return this.codeSnippetService.updateCodeSnippet(id, data);
  }

  @Query(() => CodeSnippet)
  async getCodeSnippet(@Arg('id') id: number): Promise<CodeSnippet | null> {
    return this.codeSnippetService.getCodeSnippet(id);
  }

  // Add more queries and mutations as needed
}