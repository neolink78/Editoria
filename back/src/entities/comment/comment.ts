import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
// import { User } from './User';
import CodeSnippet from '../codeSnippet/codeSnippet';
import { CreateOrUpdateCommentArgs } from './comment.args';
import { CreateOrUpdateCodeSnippetArgs } from '../codeSnippet/codeSnippet.args';

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  content!: string;

//   @ManyToOne(() => User, (user) => user.comments)
//   @Field(() => User)
//   user: User;

  @ManyToOne(() => CodeSnippet, (code) => code.comments)
  @Field(() => CodeSnippet)
  snippet!: CodeSnippet;


//   @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
//   @Field()
//   created_at: Date;

//   @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//   @Field()
//   updated_at: Date;

  constructor(comment?: Partial<CreateOrUpdateCommentArgs>) {
    super();

    if (comment) {
        this.content = comment.content;
        // // Initialize created_at and updated_at with default values or from comment if provided
        // this.created_at = comment.created_at ? new Date(comment.created_at) : new Date();
        // this.updated_at = comment.updated_at ? new Date(comment.updated_at) : new Date();
      }
  }
}

export default Comment;
