import { Arg, Args, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import User from "../entities/user/user";
import { CreateOrUpdateUser, ResetUser, SignInUser } from "../entities/user/user.args";
import UserSession from "../entities/user/userSession";
import { clearUserSessionIdInCookie, setUserResetSessionIdInCookie, setUserSessionIdInCookie } from "../utils/cookie";
import sendPasswordResetEmail from "../utils/sendPasswordResetEmail";

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

  @Query(() => User)
  getUserByEmail(@Arg("email") email: string) {
      return User.getUserByEmail(email);
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

  @Mutation(() => User)
  async ResetUser(
    @Args() args: ResetUser,
    @Ctx() context: Context
  ): Promise<User> {
    const { user, session } = await User.resetUser(args);
    setUserResetSessionIdInCookie(context.res, session);

    try {
      await sendPasswordResetEmail(user.email, session.id);
      console.log('E-mail de réinitialisation de mot de passe envoyé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation de mot de passe :', error);
      throw error;
    }
  
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
