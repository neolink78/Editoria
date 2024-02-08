import { ArgsType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { Role } from "./user";

@ArgsType()
export class CreateOrUpdateUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(1)
  username!: string;

  @Field()
  @MinLength(12)
  password!: string;

  @Field()
  description!: string;
  
}

@ArgsType()
export class SignInUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}
