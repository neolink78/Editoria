import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import User from "../user/user";
import Project from "../project/project";

@Entity()
@ObjectType()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @ManyToOne(() => User, user => user.likedProjects)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Project, project => project.likedBy, { onDelete: "CASCADE" })
  @Field(() => Project)
  project!: Project;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;
}

export default Like;
