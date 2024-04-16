import { Field, Float, Int, ArgsType, ID } from "type-graphql";
import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateCommentArgs {
  @Field()
  @MinLength(2)
  content!: string;

  @Field(() => ID, { nullable: true })
  projectId!: string;

  @Field(() => ID, { nullable: true })
  userId!: string;
}
