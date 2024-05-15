import { ArgsType, Field } from "type-graphql";
import { IsUUID } from "class-validator";

@ArgsType()
export class ToggleLikeArgs {
  @Field()
  @IsUUID(4)
  userId!: string;

  @Field()
  @IsUUID(4)
  projectId!: string;
}
