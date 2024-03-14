import { Field, Float, Int, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateProjectArgs {
  @Field()
  @MinLength(2)
  title!: string;

  @Field()
  is_public!: boolean;

  @Field(() => [String], { nullable: true })
  collaboratorIds!: string[];
}
