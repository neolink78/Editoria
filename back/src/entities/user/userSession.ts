import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { randomBytes } from "crypto";

import User from "./user";

@Entity()
class UserSession extends BaseEntity {
  @PrimaryColumn({ length: 32 })
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;

  constructor(user?: User) {
    super();

    if (user) {
      this.id = randomBytes(16).toString("hex");
      this.user = user;
    }
  }

  static async saveNewSession(user: User): Promise<UserSession> {
    const newSession = new UserSession(user);
    const savedSession = await newSession.save();
    return savedSession;
  }

  static async deleteSession(userSessionId: string): Promise<void> {
    await UserSession.delete({ id: userSessionId });
  }
}

export default UserSession;
