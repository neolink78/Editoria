import { Arg, Args, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/user/user";
import { CreateOrUpdateUser } from "../entities/user/user.args";
// import { Context } from "..";
// import { setUserSessionIdInCookie } from "../utils/cookie";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateOrUpdateUser) {
    return User.saveNewUser(args);
  }

  @Query(() => [User])
  getUsers() {
    return User.getUsers();
    }

  @Mutation(() => User)
  updateUser(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateUser) {
    return User.updateUser(id, args);
    }

  @Mutation(() => User)
  deleteUser(@Arg("id", () => ID) id: string) {
    return User.deleteUser(id);
    }

    @Query(() => User)
    getUser(@Arg("id", () => ID) id: string) {
        return User.getUserById(id);
    }

//   @Mutation(() => User)
//   async signIn(
//     @Args() args: SignInUser,
//     @Ctx() context: Context
//   ): Promise<User> {
//     const { user, session } = await User.signIn(args);
//     setUserSessionIdInCookie(context.res, session);
//     return user;
//   }

//   @Authorized()
//   @Query(() => User)
//   async myProfile(@Ctx() { user }: Context): Promise<User> {
//     return user as User;
//   }
}
