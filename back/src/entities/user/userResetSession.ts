import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { randomBytes } from "crypto";

import User from "./user";

@Entity()
class UserResetSession extends BaseEntity {
  @PrimaryColumn({ length: 32 })
  id!: string;

  @ManyToOne(() => User, (user) => user.sessionsReset)
  user!: User;

  constructor(user?: User) {
    super();

    if (user) {
      this.id = randomBytes(16).toString("hex");
      this.user = user;
    }
  }

  static async saveNewSession(user: User): Promise<UserResetSession> {
    const newSession = new UserResetSession(user);
    const savedSession = await newSession.save();
    return savedSession;
  }

  static async deleteResetSession(userResetSessionId: string): Promise<void> {
    await UserResetSession.delete({ id: userResetSessionId });
  }
}

export default UserResetSession;
