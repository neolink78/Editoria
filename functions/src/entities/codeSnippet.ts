import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
// import { User } from './User';
// import { Comment } from './Comment';
// import { Like } from './Like';

@Entity()
@ObjectType()
 class CodeSnippet extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
	  id: number;

  @Column()
  @Field()
  title: string;

  @Column('text')
  @Field()
  code: string;

  @Column({ default: false })
  @Field()
  is_public: boolean;

//   @ManyToOne(() => User, (user) => user.codeSnippets)
//   @Field(() => User)
//   user: User;

//   @OneToMany(() => Comment, (comment) => comment.snippet)
//   @Field(() => [Comment])
//   comments: Comment[];

//   @OneToMany(() => Like, (like) => like.snippet)
//   @Field(() => [Like])
//   likes: Like[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Field()
  updated_at: Date;
}

export default CodeSnippet;
