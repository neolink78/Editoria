import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { compare, hash } from "bcrypt";
import { CreateOrUpdateUser, ResetPassword, ResetUser, SignInUser } from "./user.args";
import CodeSnippet from "../codeSnippet/codeSnippet";
import UserSession from "./userSession";
import Project from "../project/project";
import UserResetSession from "./userResetSession";


export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }

  registerEnumType(Role, {
    name: "Role",
  });

@Entity("AppUser")
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  email!: string

  @Column({ unique: true })
  @Field()
  username!: string

  @Column({default: ""})
  @Field()
  description!: string;

  @Column()
  hashedPassword!: string;

  @Column({default: Role.USER})
  @Field(() => Role)
  role!: Role;

  @Column({ default: false })
  @Field()
  isPremium!: boolean;

  @OneToMany(() => Project, (project) => project.owner)
  projectsOwned!: Project[];
  
  @JoinTable({ name: "user_project" })
  @ManyToMany(() => Project, (code) => code.collaborators)
  @Field(() => [Project])
  projects!: Project[];
  
  @OneToMany(() => UserSession, (session) => session.user)
  sessions!: UserSession[];

  @OneToMany(() => UserResetSession, (sessionReset) => sessionReset.user)
  sessionsReset!: UserResetSession[];

  constructor(user?: CreateOrUpdateUser) {
    super();

    if (user) {
      this.email = user.email;
      this.username = user.username;
      this.hashedPassword = user.password;
      this.description = user.description || "";
    }
  }

  static async saveNewUser(userData: CreateOrUpdateUser): Promise<User> {
    userData.password = await hash(userData.password, 10);

    const newUser = new User(userData);
    // TODO: return user-friendly error message when email already used
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async getUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
    }
  
  static async getUserById(id: string): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
    }

  static async getUserByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email }});
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    return user;
  }

  static async updateUser(id: string, userData: CreateOrUpdateUser): Promise<User> {
    const user = await User.getUserById(id);
    
    if (userData.password && userData.password !== user.hashedPassword) {
        userData.password = await hash(userData.password, 10);
    }
    user.hashedPassword = userData.password;
    console.log(user);
    Object.assign(user, userData);


    await user.save();
    user.reload()
    return user;
    }

  static async deleteUser(id: string): Promise<User> {
    const user = await User.getUserById(id);
    await User.delete(id);
    return user;
    }

  static async getUserWithEmailAndPassword({
    email,
    password,
  }: SignInUser): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await compare(password, user.hashedPassword))) {
      throw new Error("INVALID_CREDENTIALS");
    }
    return user;
  }

  static async signIn({
    email,
    password,
  }: SignInUser): Promise<{ user: User; session: UserSession }> {
    const user = await this.getUserWithEmailAndPassword({ email, password });
    const session = await UserSession.saveNewSession(user);
    return { user, session };
  }

  static async resetUser({
    email
  }: ResetUser): Promise<{ user: User; session: UserSession }> {
    const user = await this.getUserByEmail(email);
    const session = await UserResetSession.saveNewSession(user);
    return { user, session };
  }

  static async getUserWithSessionId(sessionId: string): Promise<User | null> {
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });
    if (!session) {
      return null;
    }
    return session.user;
  }

  static async getUserResetWithSessionId(resetSessionId: string): Promise<User | null> {
    const resetSession = await UserResetSession.findOne({
      where: { id: resetSessionId },
      relations: { user: true },
    });
    if (!resetSession) {
      return null;
    }
    return resetSession.user;
  }

  static async updatePassword(userResetSessionId: string, userData: ResetPassword): Promise<User> {
    const user = await User.getUserResetWithSessionId(userResetSessionId);
    
    if (!user) {
      throw new Error("User not found for the given reset session ID");
  }

    if (userData.newPassword && userData.newPassword !== user.hashedPassword) {
        userData.newPassword = await hash(userData.newPassword, 10);
    }
    user.hashedPassword = userData.newPassword;
    console.log(user);

    await user.save();
    user.reload()
    return user;
    }
}

export default User;
