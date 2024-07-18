import { ArgsType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { Role } from "./user";

@ArgsType()
export class CreateUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(1)
  username!: string;

  @Field({ nullable: true })
  @MinLength(12)
  password!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  image!: string;
}

@ArgsType()
export class UpdateUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(1)
  username!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  image!: string;
}

@ArgsType()
export class SignInUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}

@ArgsType()
export class ResetUser {
  @Field()
  @IsEmail()
  email!: string;
}

@ArgsType()
export class ResetPassword {
  @Field()
  @MinLength(12)
  newPassword!: string;
}
