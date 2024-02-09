import { Arg, Args, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import User from "../entities/user/user";
import { CreateOrUpdateUser, SignInUser } from "../entities/user/user.args";
import UserSession from "../entities/user/userSession";
import { clearUserSessionIdInCookie, setUserSessionIdInCookie } from "../utils/cookie";
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

  @Mutation(() => User)
  async signIn(
    @Args() args: SignInUser,
    @Ctx() context: Context
  ): Promise<User> {
    const { user, session } = await User.signIn(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async signOut(@Ctx() context: Context): Promise<boolean> {
    const userSessionId = context.userSessionId as string;
    await UserSession.deleteSession(userSessionId);
    clearUserSessionIdInCookie(context.res);
    return true
  }
  
  @Authorized()
  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return user as User;
  }
}
