import { Field, ArgsType } from "type-graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateCommentArgs {
  @Field()
  @MinLength(2)
  content!: string;

  @Field()
  projectId!: string;
}
