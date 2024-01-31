import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { CreateOrUpdateCodeSnippetArgs } from './codeSnippet.args';
// import { User } from './User';
// import { Comment } from './Comment';
// import { Like } from './Like';

export enum Language {
  JAVASCRIPT = 'JAVASCRIPT',
  TYPESCRIPT = 'TYPESCRIPT',
  PYTHON = 'PYTHON',
  JAVA = 'JAVA',
  C = 'C',
  CPP = 'C++',
  CSHARP = 'C#',
}

registerEnumType(Language, {
  name: "Language",
});

@Entity()
@ObjectType()
 class CodeSnippet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
    id!: string

  @Column()
  @Field()
  title!: string

  @Column({ default: "" })
  @Field()
  code!: string

  @Column({ default: true })
  @Field()
  is_public!: boolean

//   @ManyToOne(() => User, (user) => user.codeSnippets)
//   @Field(() => User)
//   user: User;

//   @OneToMany(() => Comment, (comment) => comment.snippet)
//   @Field(() => [Comment])
//   comments: Comment[];

//   @OneToMany(() => Like, (like) => like.snippet)
//   @Field(() => [Like])
//   likes: Like[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @CreateDateColumn()
  @Field()
  updatedAt!: Date;

  @Column({default: Language.JAVASCRIPT})
  @Field(type => Language)
  language!: Language;


  constructor(codeSnippet?: CreateOrUpdateCodeSnippetArgs) {
    super();

    if (codeSnippet) {
      this.title = codeSnippet.title;
      this.code = codeSnippet.code;
      this.is_public = codeSnippet.is_public;
      this.language = codeSnippet.language;
    }
  }

  static async createCodeSnippet(codeSnippet: CreateOrUpdateCodeSnippetArgs): Promise<CodeSnippet> {
    const newCodeSnippet = new CodeSnippet(codeSnippet);
    if (newCodeSnippet.code.length === 0 ) {
      throw new Error('Code snippet cannot be empty');
    }
    return await CodeSnippet.save(newCodeSnippet);
  }

  static async getCodeSnippet(): Promise<CodeSnippet[]> {
    return await CodeSnippet.find();
  }

  static async getCodeSnippetById(id: string): Promise<CodeSnippet> {
    const codeSnippet = await CodeSnippet.findOne({ where: { id } });
    if (!codeSnippet) {
      throw new Error('Code snippet not found');
    }
    return codeSnippet;
  }

  static async deleteCodeSnippet(id: string): Promise<CodeSnippet> {
    const codeSnippet = await CodeSnippet.getCodeSnippetById(id);
    await CodeSnippet.delete(id);
    return codeSnippet;
  }
  
  static async updateCodeSnippet(id: string, partialCodeSnippet: CreateOrUpdateCodeSnippetArgs): Promise<CodeSnippet> {
    const codeSnippet = await CodeSnippet.getCodeSnippetById(id);
    Object.assign(codeSnippet, partialCodeSnippet, { updatedAt: new Date() });
    await codeSnippet.save();
    codeSnippet.reload()
    return codeSnippet;
  }
}

export default CodeSnippet;
