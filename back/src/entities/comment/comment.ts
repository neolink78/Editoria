import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { CreateOrUpdateCommentArgs } from './comment.args';
import Project from '../project/project';

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  content!: string;

  @ManyToOne(() => Project, (code) => code.comments)
  @Field(() => Project)
  project!: Project;

  constructor(comment?: CreateOrUpdateCommentArgs) {
    super();

    if (comment) {
        this.content = comment.content;
      }
  }
}

export default Comment;
