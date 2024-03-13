import { Field, Float, Int, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";
import { Language } from "./codeSnippet";

@ArgsType()
export class CreateOrUpdateCodeSnippetArgs {
  @Field()
  @MinLength(2)
  title!: string;

  @Field()
  @MinLength(2)
  code!: string;
  
  @Field(() => Language)
  language!: Language

  @Field()
  projectId!: string
}
